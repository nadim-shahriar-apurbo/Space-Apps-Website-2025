import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Zap, Activity, ChevronRight, Wheat, Fish, CheckCircle } from 'lucide-react';

interface SelectedCharacter {
  id: string;
  name: string;
  description: string;
  personality: string;
  color: string;
  emoji: string;
}

interface InteractiveDamageSimulatorProps {
  selectedCharacter?: SelectedCharacter | null;
  onNext?: () => void;
  onBack?: () => void;
  onLearnMore?: (character: {id: string, name: string, emoji: string}) => void;
}

interface Character {
  id: string;
  name: string;
  emoji: string;
  icon: React.ReactNode;
  baseHealth: number;
  vulnerability: number;
  color: string;
  description: string;
  impact: string;
  solutions: string[];
}

const InteractiveDamageSimulator: React.FC<InteractiveDamageSimulatorProps> = ({ selectedCharacter: propSelectedCharacter, onNext, onBack, onLearnMore }) => {
  const [solarIntensity, setSolarIntensity] = useState(50);
  const [showImpactDetails, setShowImpactDetails] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [internalSelectedCharacter, setInternalSelectedCharacter] = useState<Character | null>(null);
  const [showCharacterSelection, setShowCharacterSelection] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Loading animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Transition effect for character changes
  useEffect(() => {
    if (propSelectedCharacter || internalSelectedCharacter) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [propSelectedCharacter, internalSelectedCharacter]);

  const characters: Character[] = [
    {
      id: 'farmer',
      name: 'Farmer',
      emoji: '🌾',
      icon: <Activity className="w-6 h-6" />,
      baseHealth: 100,
      vulnerability: 0.6,
      color: 'from-green-500 to-emerald-600',
      description: 'Growing crops and feeding communities',
      impact: 'Solar storms can disrupt GPS systems used for precision farming, affecting crop monitoring, automated tractors, and irrigation systems. This can lead to reduced crop yields and food security issues.',
      solutions: [
        'Use backup navigation systems during solar storm warnings',
        'Monitor space weather forecasts before critical farming operations',
        'Implement manual override systems for automated equipment',
        'Diversify farming techniques to reduce GPS dependency'
      ]
    },
    {
      id: 'fisherman',
      name: 'Fisherman',
      emoji: '🎣',
      icon: <Shield className="w-6 h-6" />,
      baseHealth: 100,
      vulnerability: 0.8,
      color: 'from-blue-500 to-cyan-600',
      description: 'Navigating the vast oceans to catch fish',
      impact: 'GPS navigation failures during geomagnetic storms can leave fishermen lost at sea, unable to find their way back to shore or locate fishing grounds. This puts lives at risk and affects livelihoods.',
      solutions: [
        'Carry traditional compass and paper charts as backup',
        'Learn celestial navigation techniques',
        'Stay informed about space weather conditions',
        'Use multiple navigation systems for redundancy'
      ]
    },
    {
      id: 'grid-operator',
      name: 'Grid Operator',
      emoji: '⚡',
      icon: <Zap className="w-6 h-6" />,
      baseHealth: 100,
      vulnerability: 0.9,
      color: 'from-yellow-500 to-orange-600',
      description: 'Managing electrical power systems',
      impact: 'Geomagnetic storms can induce currents in power lines, causing transformer damage, blackouts, and cascading failures across the electrical grid, affecting millions of people.',
      solutions: [
        'Monitor space weather alerts and forecasts',
        'Implement protective relay systems',
        'Have backup power generation ready',
        'Coordinate with other grid operators during storms'
      ]
    },
    {
      id: 'astronaut',
      name: 'Astronaut',
      emoji: '🚀',
      icon: <AlertTriangle className="w-6 h-6" />,
      baseHealth: 100,
      vulnerability: 1.0,
      color: 'from-purple-500 to-pink-600',
      description: 'Exploring space and conducting research',
      impact: 'Direct exposure to solar radiation and particles during space missions can cause serious health issues, equipment failures, and mission abort scenarios.',
      solutions: [
        'Monitor space weather forecasts before EVAs',
        'Use radiation shielding in spacecraft',
        'Have emergency protocols for solar storms',
        'Coordinate with ground control for safety updates'
      ]
    }
  ];

  // Use prop character if provided, otherwise use internal state
  const selectedCharacter = propSelectedCharacter ? 
    characters.find(c => c.id === propSelectedCharacter.id) || null : 
    internalSelectedCharacter;

  const handleCharacterSelect = (character: Character) => {
    setInternalSelectedCharacter(character);
    setShowCharacterSelection(false);
    setShowImpactDetails(false);
    setShowQuiz(false);
    setQuizAnswer(null);
  };

  const handleBackToSelection = () => {
    setInternalSelectedCharacter(null);
    setShowCharacterSelection(false);
    setShowImpactDetails(false);
    setShowQuiz(false);
    setQuizAnswer(null);
  };

  const handleShowCharacterSelection = () => {
    setShowCharacterSelection(true);
  };

  const quizQuestions = [
    // Farmer Questions
    {
      character: 'farmer',
      question: "A solar storm warning has been issued. As a farmer using GPS-guided tractors, what should you do first?",
      options: [
        "Continue farming operations as normal",
        "Switch to manual navigation and monitor space weather alerts",
        "Only use GPS systems for navigation",
        "Ignore the warning and work faster"
      ],
      correct: 1,
      explanation: "During solar storms, GPS accuracy can be severely compromised. Switching to backup navigation systems ensures continued operations."
    },
    {
      character: 'farmer',
      question: "Your automated irrigation system relies on GPS timing. During a geomagnetic storm, you should:",
      options: [
        "Let the system run automatically",
        "Manually monitor and control irrigation timing",
        "Turn off all irrigation systems",
        "Increase automation settings"
      ],
      correct: 1,
      explanation: "Manual monitoring ensures crops receive proper irrigation when GPS timing systems may be disrupted."
    },
    {
      character: 'farmer',
      question: "To prepare for future space weather events, farmers should:",
      options: [
        "Rely only on modern GPS technology",
        "Implement backup navigation and timing systems",
        "Avoid using any technology",
        "Only farm during clear weather"
      ],
      correct: 1,
      explanation: "Having backup systems ensures farming operations can continue even when space weather affects GPS systems."
    },
    {
      character: 'farmer',
      question: "Space weather forecasts are important for farmers because they help:",
      options: [
        "Predict rainfall patterns",
        "Plan operations around potential GPS disruptions",
        "Determine soil quality",
        "Control pest populations"
      ],
      correct: 1,
      explanation: "Space weather forecasts help farmers plan operations and prepare backup systems before GPS disruptions occur."
    },
    {
      character: 'farmer',
      question: "If GPS-guided equipment malfunctions during a solar storm, the best immediate action is:",
      options: [
        "Force the equipment to continue operating",
        "Switch to manual operation and check backup systems",
        "Wait for the storm to pass without working",
        "Use the equipment at maximum speed"
      ],
      correct: 1,
      explanation: "Switching to manual operation prevents equipment damage and ensures safe, continued farming operations."
    },

    // Fisherman Questions
    {
      character: 'fisherman',
      question: "You're at sea when a geomagnetic storm warning is issued. Your GPS stops working. What should you do?",
      options: [
        "Continue fishing and hope GPS returns",
        "Use compass, charts, and celestial navigation to return to shore",
        "Stay in the same spot until GPS works",
        "Follow other boats randomly"
      ],
      correct: 1,
      explanation: "Traditional navigation methods are essential backup systems when GPS fails during space weather events."
    },
    {
      character: 'fisherman',
      question: "Before heading out to sea, you should check space weather forecasts to:",
      options: [
        "Predict fish behavior",
        "Prepare backup navigation equipment for potential GPS disruptions",
        "Determine water temperature",
        "Plan fishing routes only"
      ],
      correct: 1,
      explanation: "Space weather can disrupt GPS navigation, so preparing backup systems is crucial for safe return to shore."
    },
    {
      character: 'fisherman',
      question: "Essential backup navigation tools for fishermen include:",
      options: [
        "Only modern GPS devices",
        "Compass, paper charts, and knowledge of celestial navigation",
        "Just radio communication",
        "Only electronic fish finders"
      ],
      correct: 1,
      explanation: "Traditional navigation tools don't rely on satellites and remain functional during space weather events."
    },
    {
      character: 'fisherman',
      question: "During a solar storm, communication systems may also be affected. You should:",
      options: [
        "Rely only on cell phones",
        "Have multiple communication methods including VHF radio",
        "Avoid all communication",
        "Only use satellite phones"
      ],
      correct: 1,
      explanation: "VHF radio and other communication methods provide redundancy when satellite-based systems fail."
    },
    {
      character: 'fisherman',
      question: "If you notice GPS accuracy decreasing while at sea, you should:",
      options: [
        "Ignore it and continue fishing",
        "Immediately switch to backup navigation and consider returning to shore",
        "Try to fix the GPS yourself",
        "Go further out to sea"
      ],
      correct: 1,
      explanation: "Early recognition of GPS problems allows time to safely navigate back to shore using backup methods."
    },

    // Grid Operator Questions
    {
      character: 'grid-operator',
      question: "A severe geomagnetic storm is forecasted. As a grid operator, your first priority should be:",
      options: [
        "Increase power generation to maximum",
        "Monitor space weather alerts and prepare protective systems",
        "Shut down the entire grid immediately",
        "Ignore the forecast and continue normal operations"
      ],
      correct: 1,
      explanation: "Monitoring alerts and preparing protective systems helps prevent transformer damage and cascading failures."
    },
    {
      character: 'grid-operator',
      question: "Geomagnetic storms can induce currents in power lines. To protect transformers, you should:",
      options: [
        "Increase voltage levels",
        "Activate protective relay systems and consider load reduction",
        "Disconnect all power lines",
        "Ignore the induced currents"
      ],
      correct: 1,
      explanation: "Protective relays and load management help prevent transformer damage from geomagnetically induced currents."
    },
    {
      character: 'grid-operator',
      question: "During a space weather event, coordination with other grid operators is important to:",
      options: [
        "Compete for customers",
        "Share load and prevent cascading failures across regions",
        "Increase prices",
        "Reduce communication"
      ],
      correct: 1,
      explanation: "Regional coordination helps maintain grid stability and prevents widespread blackouts during space weather events."
    },
    {
      character: 'grid-operator',
      question: "Backup power generation during geomagnetic storms should be:",
      options: [
        "Avoided completely",
        "Ready and tested to handle increased demand if main systems fail",
        "Used only for profit",
        "Kept offline permanently"
      ],
      correct: 1,
      explanation: "Backup systems ensure power continuity when main grid components are affected by space weather."
    },
    {
      character: 'grid-operator',
      question: "The most vulnerable grid components during geomagnetic storms are:",
      options: [
        "Light bulbs and small appliances",
        "High-voltage transformers and transmission lines",
        "Customer meters",
        "Office computers"
      ],
      correct: 1,
      explanation: "High-voltage equipment is most susceptible to geomagnetically induced currents and requires special protection."
    },

    // Astronaut Questions
    {
      character: 'astronaut',
      question: "A solar particle event is detected while you're on a spacewalk (EVA). You should:",
      options: [
        "Continue the EVA as planned",
        "Immediately return to the spacecraft's shielded area",
        "Stay outside longer to study the event",
        "Remove your helmet for better visibility"
      ],
      correct: 1,
      explanation: "Solar particle events pose serious radiation risks. Immediate shelter in shielded areas is essential for astronaut safety."
    },
    {
      character: 'astronaut',
      question: "Space weather monitoring is crucial for astronauts because it helps:",
      options: [
        "Plan meal schedules",
        "Schedule EVAs during safe periods and prepare for radiation exposure",
        "Determine spacecraft color",
        "Choose entertainment options"
      ],
      correct: 1,
      explanation: "Space weather forecasts help plan safe EVA times and prepare radiation protection measures."
    },
    {
      character: 'astronaut',
      question: "The most effective protection against solar radiation in space is:",
      options: [
        "Wearing sunglasses",
        "Using spacecraft shielding and limiting EVA time during storms",
        "Drinking more water",
        "Exercising more frequently"
      ],
      correct: 1,
      explanation: "Physical shielding and timing restrictions are the primary defenses against space radiation."
    },
    {
      character: 'astronaut',
      question: "If spacecraft systems malfunction during a solar storm, astronauts should:",
      options: [
        "Panic and abandon the mission",
        "Follow emergency protocols and communicate with ground control",
        "Try to fix everything immediately",
        "Ignore the problems"
      ],
      correct: 1,
      explanation: "Emergency protocols and ground communication ensure proper response to space weather-related system failures."
    },
    {
      character: 'astronaut',
      question: "Long-term exposure to space radiation can cause:",
      options: [
        "Improved vision",
        "Increased cancer risk and other health issues",
        "Better physical strength",
        "Enhanced mental abilities"
      ],
      correct: 1,
      explanation: "Space radiation exposure increases cancer risk and can cause various health problems, requiring careful monitoring and protection."
    }
  ];

  const calculateDamage = (character: Character) => {
    const damage = (solarIntensity * character.vulnerability) / 100;
    const health = Math.max(0, character.baseHealth - damage * 100);
    return health;
  };

  const getIntensityLevel = () => {
    if (solarIntensity < 30) return { label: 'Calm', color: 'text-green-400' };
    if (solarIntensity < 60) return { label: 'Moderate', color: 'text-yellow-400' };
    if (solarIntensity < 80) return { label: 'Strong', color: 'text-orange-400' };
    return { label: 'Severe', color: 'text-red-400' };
  };

  // Get visual impact effects based on solar intensity and character health
  const getImpactEffects = (character: Character) => {
    const health = calculateDamage(character);
    const damageLevel = 100 - health;
    
    let effects = {
      shake: '',
      glow: '',
      opacity: 1,
      filter: '',
      particles: false,
      warningColor: ''
    };

    if (damageLevel > 80) {
      // Critical damage - severe effects
      effects.shake = 'animate-pulse animate-bounce';
      effects.glow = 'drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]';
      effects.opacity = 0.7;
      effects.filter = 'hue-rotate(0deg) saturate(150%) brightness(120%)';
      effects.particles = true;
      effects.warningColor = 'text-red-500';
    } else if (damageLevel > 60) {
      // High damage - strong effects
      effects.shake = 'animate-pulse';
      effects.glow = 'drop-shadow-[0_0_15px_rgba(251,146,60,0.6)]';
      effects.opacity = 0.8;
      effects.filter = 'hue-rotate(15deg) saturate(130%) brightness(110%)';
      effects.particles = true;
      effects.warningColor = 'text-orange-500';
    } else if (damageLevel > 30) {
      // Moderate damage - medium effects
      effects.shake = '';
      effects.glow = 'drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]';
      effects.opacity = 0.9;
      effects.filter = 'hue-rotate(30deg) saturate(110%)';
      effects.particles = false;
      effects.warningColor = 'text-yellow-500';
    } else {
      // Low damage - minimal effects
      effects.shake = '';
      effects.glow = '';
      effects.opacity = 1;
      effects.filter = '';
      effects.particles = false;
      effects.warningColor = 'text-green-500';
    }

    return effects;
  };

  const handleLearnMore = () => {
    if (onLearnMore && selectedCharacter) {
      onLearnMore({
        id: selectedCharacter.id,
        name: selectedCharacter.name,
        emoji: selectedCharacter.emoji
      });
    } else {
      setShowImpactDetails(true);
      setTimeout(() => setShowQuiz(true), 3000);
    }
  };

  const handleShowSolutions = () => {
    setShowImpactDetails(true);
  };

  const handleQuizAnswer = (selectedAnswer: number) => {
    const characterQuestions = quizQuestions.filter(q => q.character === selectedCharacter?.id);
    const currentQuestion = characterQuestions[currentQuizQuestion];
    
    if (selectedAnswer === currentQuestion.correct) {
      setQuizScore(quizScore + 1);
    }
    
    setQuizAnswer(selectedAnswer.toString());
    
    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuizQuestion < characterQuestions.length - 1) {
        setCurrentQuizQuestion(currentQuizQuestion + 1);
        setQuizAnswer(null);
      } else {
        // Quiz completed
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setQuizCompleted(false);
    setQuizAnswer(null);
    setShowQuiz(false);
  };

  const startQuiz = () => {
    resetQuiz();
    setShowQuiz(true);
  };

  const intensityLevel = getIntensityLevel();

  // Show impact details and quiz
  if (showImpactDetails && selectedCharacter) {
    const character = characters.find(c => c.id === selectedCharacter.id);
    
    if (!character) return null;

    if (!showQuiz) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-fade-in">
              <div className={`bg-gradient-to-r ${character.color} rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 animate-float`}>
                <span className="text-6xl">{character.emoji}</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">{character.name}</h2>
              <p className="text-xl text-blue-200 mb-8">{character.description}</p>
            </div>

            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 animate-slide-up">
              <h3 className="text-2xl font-bold text-stellar-gold mb-6">Impact of Space Weather</h3>
              <p className="text-lg text-blue-200 leading-relaxed mb-8">{character.impact}</p>
              
              <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                <Shield className="w-6 h-6 text-green-400 mr-2" />
                Protection Strategies & Solutions
              </h4>
              <div className="grid gap-4 text-left mb-8">
                {character.solutions.map((solution, index) => (
                  <div key={index} className="flex items-start space-x-3 animate-slide-up bg-green-900 bg-opacity-20 rounded-lg p-4 border border-green-500 border-opacity-30 hover:border-opacity-50 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                    <p className="text-green-100 font-medium">{solution}</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-900 bg-opacity-30 rounded-lg p-6 border border-blue-500 border-opacity-30 mb-6">
                <h5 className="text-lg font-bold text-blue-300 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                  Emergency Action Plan
                </h5>
                <div className="space-y-2 text-blue-200">
                  <p className="text-sm">• Monitor space weather alerts continuously</p>
                  <p className="text-sm">• Have backup systems ready and tested</p>
                  <p className="text-sm">• Establish communication protocols</p>
                  <p className="text-sm">• Train team members on emergency procedures</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-blue-300 mb-4 font-medium">Ready to test your knowledge?</p>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-pink-600 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 animate-pulse"
                >
                  🧠 Take the Quiz to Save {character.name}!
                </button>
                
                {/* Skip Button */}
                {onNext && (
                  <div className="mt-4">
                    <button
                      onClick={onNext}
                      className="bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-6 rounded-full text-sm transition-all duration-300 transform hover:scale-105"
                    >
                      Skip Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                🧠 Knowledge Check - Save the {selectedCharacter.name}!
              </h3>
              <button
                onClick={() => setShowQuiz(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {!quizCompleted ? (
              (() => {
                const characterQuestions = quizQuestions.filter(q => q.character === selectedCharacter.id);
                const currentQuestion = characterQuestions[currentQuizQuestion];
                
                return (
                  <div>
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Question {currentQuizQuestion + 1} of {characterQuestions.length}</span>
                        <span>Score: {quizScore}/{characterQuestions.length}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${((currentQuizQuestion + 1) / characterQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Question */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4">
                        {currentQuestion.question}
                      </h4>
                      
                      <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuizAnswer(index)}
                            disabled={quizAnswer !== null}
                            className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                              quizAnswer === null
                                ? 'border-gray-600 bg-gray-700/50 hover:bg-gray-600/50 hover:border-purple-400 text-white'
                                : quizAnswer === index.toString()
                                  ? index === currentQuestion.correct
                                    ? 'border-green-500 bg-green-500/20 text-green-300'
                                    : 'border-red-500 bg-red-500/20 text-red-300'
                                  : index === currentQuestion.correct
                                    ? 'border-green-500 bg-green-500/20 text-green-300'
                                    : 'border-gray-600 bg-gray-700/30 text-gray-400'
                            }`}
                          >
                            <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                          </button>
                        ))}
                      </div>

                      {/* Explanation */}
                      {quizAnswer !== null && (
                        <div className="mt-4 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                          <p className="text-blue-200">
                            <strong>Explanation:</strong> {currentQuestion.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()
            ) : (
              /* Quiz Completion */
              <div className="text-center">
                <div className="mb-6">
                  {quizScore >= 4 ? (
                    <div>
                      <div className="text-6xl mb-4">🎉</div>
                      <h3 className="text-3xl font-bold text-green-400 mb-2">
                        Congratulations! You Saved the {selectedCharacter.name}!
                      </h3>
                      <p className="text-xl text-green-300 mb-4">
                        Score: {quizScore}/5 - Excellent Knowledge!
                      </p>
                      <p className="text-gray-300">
                        You've demonstrated excellent understanding of space weather protection strategies. 
                        The {selectedCharacter.name} is now well-prepared for future space weather events!
                      </p>
                    </div>
                  ) : quizScore >= 3 ? (
                    <div>
                      <div className="text-6xl mb-4">👍</div>
                      <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                        Good Job! The {selectedCharacter.name} is Safer!
                      </h3>
                      <p className="text-xl text-yellow-300 mb-4">
                        Score: {quizScore}/5 - Good Knowledge!
                      </p>
                      <p className="text-gray-300">
                        You have a solid understanding of space weather protection. 
                        Consider reviewing the solutions for even better preparation!
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-6xl mb-4">⚠️</div>
                      <h3 className="text-3xl font-bold text-red-400 mb-2">
                        The {selectedCharacter.name} Needs More Protection!
                      </h3>
                      <p className="text-xl text-red-300 mb-4">
                        Score: {quizScore}/5 - Review Needed
                      </p>
                      <p className="text-gray-300">
                        Please review the protection strategies and try again to better protect the {selectedCharacter.name}!
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
                  >
                    Close Quiz
                  </button>
                  {onNext && (
                    <button
                      onClick={onNext}
                      className="px-6 py-3 bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    >
                      <span>Next Page</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show character selection screen if no character is selected
  if ((!selectedCharacter && !propSelectedCharacter) || showCharacterSelection) {
    return (
      <div className="min-h-screen py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Interactive Damage Simulator
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
              Choose a character to see how  Space Weather affects their daily operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {characters.map((character, index) => (
              <div
                key={character.id}
                onClick={() => handleCharacterSelect(character)}
                className={`bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20 cursor-pointer hover:border-opacity-40 transition-all duration-300 transform hover:scale-105 ${isLoaded ? 'animate-slideInUp opacity-100' : 'opacity-0 translate-y-12'}`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-center">
                  <div className={`text-6xl mb-4 transition-all duration-700 ${isLoaded ? 'animate-bounceIn' : 'opacity-0 scale-75'}`} style={{ animationDelay: `${700 + index * 100}ms` }}>
                    {character.emoji}
                  </div>
                  <h3 className={`text-xl font-bold text-white mb-2 transition-all duration-700 ${isLoaded ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: `${800 + index * 100}ms` }}>
                    {character.name}
                  </h3>
                  <div className={`bg-gradient-to-r ${character.color} rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3 text-white animate-glow transition-all duration-700 ${isLoaded ? 'animate-scaleIn opacity-100' : 'opacity-0 scale-75'}`} style={{ animationDelay: `${900 + index * 100}ms` }}>
                    {character.icon}
                  </div>
                  <p className={`text-sm text-blue-200 mb-4 transition-all duration-700 ${isLoaded ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: `${1000 + index * 100}ms` }}>
                    {character.description}
                  </p>
                  <div className={`text-xs text-gray-400 transition-all duration-700 ${isLoaded ? 'animate-fadeIn opacity-100' : 'opacity-0'}`} style={{ animationDelay: `${1100 + index * 100}ms` }}>
                    Vulnerability: {(character.vulnerability * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 transition-all duration-700 delay-1200 ${isLoaded ? 'animate-fadeInUp opacity-100' : 'opacity-0 translate-y-8'}`}>
            <h3 className={`text-2xl font-bold text-stellar-gold mb-4 text-center animate-glow transition-all duration-700 delay-1300 ${isLoaded ? 'animate-bounceIn opacity-100' : 'opacity-0 scale-75'}`}>
              About the Simulator
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-blue-200">
              <div className={`transition-all duration-700 delay-1400 ${isLoaded ? 'animate-slideInLeft opacity-100' : 'opacity-0 -translate-x-8'}`}>
                <h4 className="font-bold text-white mb-2">How It Works</h4>
                <p className="text-sm leading-relaxed">
                  Select a character above to explore how  Space Weather events affect different professions.
                  Each character has unique vulnerabilities based on their reliance on technology that can be
                  disrupted by space weather.
                </p>
              </div>
              <div className={`transition-all duration-700 delay-1500 ${isLoaded ? 'animate-slideInRight opacity-100' : 'opacity-0 translate-x-8'}`}>
                <h4 className="font-bold text-white mb-2">Interactive Learning</h4>
                <p className="text-sm leading-relaxed">
                  Adjust solar storm intensity and see real-time impacts on operational status.
                  Learn about protection strategies and test your knowledge with interactive quizzes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          {/* Back Button - Show when onBack is provided OR when viewing a specific character */}
          {(onBack || selectedCharacter) && (
            <div className="mb-6">
              <button
                onClick={selectedCharacter ? handleBackToSelection : (onBack as () => void)}
                className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <span>←</span>
                <span>Back</span>
              </button>
            </div>
          )}
          
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Interactive Damage Simulator
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-4">
            {selectedCharacter 
              ? `See how  Space Weather affects ${selectedCharacter.name}'s daily operations`
              : "Adjust the  Space Weather intensity and see how it affects different people"
            }
          </p>
          {selectedCharacter && internalSelectedCharacter && (
            <button
              onClick={handleBackToSelection}
              className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white font-bold py-2 px-6 rounded-full text-sm transition-all duration-300 transform hover:scale-105 mb-4"
            >
              ← Back to Character Selection
            </button>
          )}
          {selectedCharacter && (
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-4 max-w-md mx-auto mb-4">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-3xl">{selectedCharacter.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedCharacter.name}</h3>
                  <p className="text-sm text-blue-200">{selectedCharacter.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 mb-8 animate-slide-up relative overflow-hidden">
          {/* Dynamic Background Effect */}
          <div 
            className="absolute inset-0 opacity-20 transition-all duration-1000 ease-in-out"
            style={{
              background: solarIntensity < 30 
                ? 'linear-gradient(135deg, #1e3a8a, #1e40af)' 
                : solarIntensity < 60 
                ? 'linear-gradient(135deg, #f59e0b, #f97316)' 
                : solarIntensity < 80 
                ? 'linear-gradient(135deg, #dc2626, #b91c1c)' 
                : 'linear-gradient(135deg, #7c2d12, #991b1b)',
              filter: `blur(${solarIntensity / 10}px)`
            }}
          />
          
          {/* Particle Effect Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: Math.floor(solarIntensity / 10) }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-stellar-gold rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`,
                  opacity: solarIntensity / 100
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-stellar-gold mb-6 text-center flex items-center justify-center space-x-2">
              <span className={`text-3xl ${solarIntensity > 70 ? 'animate-pulse' : ''}`}>
                {solarIntensity < 30 ? '🌙' : solarIntensity < 60 ? '☀️' : solarIntensity < 80 ? '🔥' : '⚡'}
              </span>
              <span> Space Weather Intensity Control</span>
              <span className={`text-3xl ${solarIntensity > 70 ? 'animate-pulse' : ''}`}>
                {solarIntensity < 30 ? '🌙' : solarIntensity < 60 ? '☀️' : solarIntensity < 80 ? '🔥' : '⚡'}
              </span>
            </h2>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-blue-200">Calm</span>
                <span className={`font-bold text-lg ${intensityLevel.color} px-4 py-2 rounded-full bg-black bg-opacity-30 backdrop-blur-sm border transition-all duration-300`}
                  style={{
                    borderColor: solarIntensity < 30 ? '#3b82f6' : solarIntensity < 60 ? '#f59e0b' : solarIntensity < 80 ? '#dc2626' : '#7c2d12',
                    boxShadow: `0 0 ${solarIntensity / 5}px ${solarIntensity < 30 ? '#3b82f6' : solarIntensity < 60 ? '#f59e0b' : solarIntensity < 80 ? '#dc2626' : '#7c2d12'}`
                  }}
                >
                  {intensityLevel.label} ({solarIntensity}%)
                </span>
                <span className="text-red-400 flex items-center space-x-1">
                  <span>Severe</span>
                  <span>⚡</span>
                </span>
              </div>
              
              {/* Enhanced Slider Container */}
              <div className="relative mb-6">
                {/* Slider Track Background */}
                <div className="absolute inset-0 h-6 bg-gray-800 rounded-full shadow-inner" />
                
                {/* Dynamic Gradient Track */}
                <div 
                  className="absolute inset-0 h-6 rounded-full transition-all duration-300"
                  style={{
                    background: `linear-gradient(to right, 
                      #1e3a8a 0%, 
                      #3b82f6 25%, 
                      #f59e0b 50%, 
                      #dc2626 75%, 
                      #7c2d12 100%)`,
                    opacity: 0.7,
                    clipPath: `inset(0 ${100 - solarIntensity}% 0 0)`
                  }}
                />
                
                {/* Glow Effect */}
                <div 
                  className="absolute inset-0 h-6 rounded-full transition-all duration-300"
                  style={{
                    background: `linear-gradient(to right, 
                      transparent 0%, 
                      ${solarIntensity < 30 ? '#3b82f6' : solarIntensity < 60 ? '#f59e0b' : solarIntensity < 80 ? '#dc2626' : '#7c2d12'} ${solarIntensity}%, 
                      transparent ${solarIntensity + 5}%)`,
                    filter: 'blur(8px)',
                    opacity: solarIntensity / 100
                  }}
                />
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={solarIntensity}
                  onChange={(e) => setSolarIntensity(Number(e.target.value))}
                  className="relative z-10 slider w-full h-6 bg-transparent rounded-lg appearance-none cursor-pointer"
                  data-intensity={solarIntensity >= 75 ? 'high' : 'normal'}
                  style={{
                    background: 'transparent'
                  }}
                  onMouseDown={() => {
                    // Simulate haptic feedback with a subtle vibration effect
                    if (navigator.vibrate) {
                      navigator.vibrate(50);
                    }
                  }}
                  onInput={(e) => {
                    // Simulate sound feedback based on intensity
                    const value = Number((e.target as HTMLInputElement).value);
                    if (value >= 80) {
                      // High intensity - could play alert sound
                      // console.log('🚨 High intensity alert sound');
                    } else if (value >= 60) {
                      // Medium intensity - could play warning sound
                      // console.log('⚠️ Medium intensity warning sound');
                    } else if (value >= 30) {
                      // Low intensity - could play notification sound
                      // console.log('🔔 Low intensity notification sound');
                    }
                  }}
                />
                
                {/* Intensity Markers */}
                <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                  <span className={`transition-all duration-300 ${solarIntensity < 25 ? 'text-blue-400 font-bold' : ''}`}>
                    🌙 Minimal
                  </span>
                  <span className={`transition-all duration-300 ${solarIntensity >= 25 && solarIntensity < 50 ? 'text-yellow-400 font-bold' : ''}`}>
                    ☀️ Moderate
                  </span>
                  <span className={`transition-all duration-300 ${solarIntensity >= 50 && solarIntensity < 75 ? 'text-orange-400 font-bold' : ''}`}>
                    🔥 Strong
                  </span>
                  <span className={`transition-all duration-300 ${solarIntensity >= 75 ? 'text-red-400 font-bold animate-pulse' : ''}`}>
                    ⚡ Severe
                  </span>
                </div>
              </div>
              
              {/* Enhanced Description with Visual Effects */}
              <div className="text-center">
                <div className={`p-4 rounded-lg transition-all duration-500 ${
                  solarIntensity < 30 ? 'bg-blue-900 bg-opacity-30 border border-blue-500 border-opacity-30' :
                  solarIntensity < 60 ? 'bg-yellow-900 bg-opacity-30 border border-yellow-500 border-opacity-30' :
                  solarIntensity < 80 ? 'bg-orange-900 bg-opacity-30 border border-orange-500 border-opacity-30' :
                  'bg-red-900 bg-opacity-30 border border-red-500 border-opacity-30 animate-pulse'
                }`}>
                  <p className={`text-sm font-medium transition-all duration-300 ${
                    solarIntensity < 30 ? 'text-blue-200' :
                    solarIntensity < 60 ? 'text-yellow-200' :
                    solarIntensity < 80 ? 'text-orange-200' :
                    'text-red-200'
                  }`}>
                    {solarIntensity < 30 && "🌙 Minimal space weather activity. Normal operations expected. All systems functioning optimally."}
                    {solarIntensity >= 30 && solarIntensity < 60 && "☀️ Moderate solar activity. Some minor disruptions possible. Monitor sensitive equipment."}
                    {solarIntensity >= 60 && solarIntensity < 80 && "🔥 Strong solar storm conditions. Significant impacts likely. Prepare backup systems."}
                    {solarIntensity >= 80 && "⚡ SEVERE GEOMAGNETIC STORM! Critical systems at high risk. Emergency protocols activated!"}
                  </p>
                  
                  {/* Real-time Impact Indicator */}
                  <div className="mt-3 flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        solarIntensity < 30 ? 'bg-green-400' :
                        solarIntensity < 60 ? 'bg-yellow-400' :
                        solarIntensity < 80 ? 'bg-orange-400' :
                        'bg-red-400 animate-pulse'
                      }`} />
                      <span className="text-xs text-gray-300">
                        Risk Level: {solarIntensity < 30 ? 'LOW' : solarIntensity < 60 ? 'MODERATE' : solarIntensity < 80 ? 'HIGH' : 'CRITICAL'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        solarIntensity < 30 ? 'bg-green-400' :
                        solarIntensity < 60 ? 'bg-yellow-400 animate-pulse' :
                        solarIntensity < 80 ? 'bg-red-400 animate-pulse' :
                        'bg-red-600 animate-bounce'
                      }`} />
                      <span className="text-xs text-gray-300">
                        Alert Status: {solarIntensity < 30 ? 'NORMAL' : solarIntensity < 60 ? 'WATCH' : solarIntensity < 80 ? 'WARNING' : 'EMERGENCY'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-md mx-auto">
          {characters
            .filter(character => selectedCharacter ? character.id === selectedCharacter.id : true)
            .map((character, index) => {
            const health = calculateDamage(character);
            const healthPercent = health;
            const damagePercent = 100 - health;
            const impactEffects = getImpactEffects(character);

            return (
              <div
                key={character.id}
                className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 animate-slide-up border border-white border-opacity-20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center mb-4 relative">
                  {/* Particle effects for severe damage */}
                  {impactEffects.particles && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-2 left-4 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                      <div className="absolute top-8 right-6 w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-bounce"></div>
                      <div className="absolute top-6 right-2 w-1 h-1 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    </div>
                  )}
                  
                  <div 
                    className={`text-6xl mb-3 transition-all duration-500 ${impactEffects.shake}`}
                    style={{ 
                      opacity: impactEffects.opacity,
                      filter: `${impactEffects.filter} ${impactEffects.glow}`,
                      transform: damagePercent > 80 ? 'scale(0.95)' : 'scale(1)'
                    }}
                  >
                    {character.emoji}
                  </div>
                  
                  {/* Warning indicator for high damage */}
                  {damagePercent > 60 && (
                    <div className={`absolute -top-2 -right-2 ${impactEffects.warningColor} animate-pulse`}>
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {character.name}
                  </h3>
                  <div className={`bg-gradient-to-r ${character.color} rounded-full w-12 h-12 flex items-center justify-center mx-auto text-white transition-all duration-500`}
                       style={{ 
                         opacity: impactEffects.opacity,
                         filter: impactEffects.glow
                       }}>
                    {character.icon}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-200">Operational Status</span>
                      <span className={`text-sm font-bold ${
                        healthPercent > 70 ? 'text-green-400' :
                        healthPercent > 40 ? 'text-yellow-400' :
                        healthPercent > 20 ? 'text-orange-400' : 'text-red-400'
                      }`}>
                        {healthPercent.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          healthPercent > 70 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                          healthPercent > 40 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                          healthPercent > 20 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                          'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                        style={{ width: `${healthPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-200">Risk Level</span>
                      <span className="text-sm font-bold text-red-400">
                        {damagePercent.toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
                        style={{ width: `${damagePercent}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className={`bg-white bg-opacity-5 rounded-lg p-3 mt-4 transition-all duration-500 ${damagePercent > 80 ? 'bg-red-900 bg-opacity-20 border border-red-500 border-opacity-30' : ''}`}>
                    <p className={`text-xs text-center font-medium ${
                      healthPercent > 70 ? 'text-green-300' :
                      healthPercent > 40 ? 'text-yellow-300' :
                      healthPercent > 20 ? 'text-orange-300' : 'text-red-300'
                    }`}>
                      {healthPercent > 70 && "✅ Systems functioning normally"}
                      {healthPercent > 40 && healthPercent <= 70 && "⚠️ Minor disruptions occurring"}
                      {healthPercent > 20 && healthPercent <= 40 && "🔥 Significant impact detected"}
                      {healthPercent <= 20 && "🚨 CRITICAL SITUATION!"}
                    </p>
                  </div>

                  <div className="text-center text-xs text-gray-400 mt-2">
                    Vulnerability: {(character.vulnerability * 100).toFixed(0)}%
                  </div>

                  {selectedCharacter && (
                    <div className="text-center mt-4 space-y-2">
                      <button
                        onClick={handleLearnMore}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-2 px-6 rounded-full text-sm transition-all duration-300 transform hover:scale-105 w-full"
                      >
                        Learn More About Impact
                      </button>
                      
                      <button
                        onClick={handleShowSolutions}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white font-bold py-2 px-6 rounded-full text-sm transition-all duration-300 transform hover:scale-105 w-full"
                      >
                        🛡️ Show Solutions
                      </button>
                      
                      {/* <button
                        onClick={startQuiz}
                        className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 text-white font-bold py-2 px-6 rounded-full text-sm transition-all duration-300 transform hover:scale-105 w-full"
                      >
                        🧠 Take Quiz to Save {character.name}
                      </button> */}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Understanding the Impact Section */}
        <div className="mt-12 bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 animate-fade-in">
          <h3 className="text-2xl font-bold text-stellar-gold mb-4 text-center">
            Understanding the Impact
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-blue-200">
            <div>
              <h4 className="font-bold text-white mb-2">Why Different Impacts?</h4>
              <p className="text-sm leading-relaxed">
                Each profession has different vulnerability levels based on their reliance on technology
                affected by  Space Weather. Astronauts face the highest risk due to direct exposure,
                while farmers have lower vulnerability through indirect GPS effects.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-2">Real-World Consequences</h4>
              <p className="text-sm leading-relaxed">
                Solar storms can disrupt GPS navigation, damage satellites, cause power grid failures,
                and expose astronauts to radiation. Understanding these risks helps us prepare and
                protect critical infrastructure.
              </p>
            </div>
          </div>
          
          {!selectedCharacter && onNext && (
            <div className="text-center mt-8">
              <p className="text-blue-200 mb-4">Want to explore how space weather affects specific professions?</p>
              <button
                onClick={handleShowCharacterSelection}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 mr-4"
              >
                Choose a Character
              </button>
              <button
                onClick={onNext}
                className="bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
              >
                Continue Journey →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDamageSimulator;