import React from 'react';
import { AlertTriangle, Shield, Zap, Activity, ChevronRight, CheckCircle, ArrowLeft } from 'lucide-react';

interface SelectedCharacter {
  id: string;
  name: string;
  emoji: string;
}

interface DetailedImpactPageProps {
  onBack?: () => void;
  onNext?: () => void;
  selectedCharacter?: SelectedCharacter | null;
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
  detailedImpact: string;
  riskLevel: string;
  affectedSystems: string[];
}

const DetailedImpactPage: React.FC<DetailedImpactPageProps> = ({ onBack, onNext, selectedCharacter }) => {
  const characters: Character[] = [
    {
      id: 'farmer',
      name: 'Farmer',
      emoji: '🌾',
      icon: <Activity className="w-8 h-8" />,
      baseHealth: 100,
      vulnerability: 0.6,
      color: 'from-green-500 to-emerald-600',
      description: 'Growing crops and feeding communities',
      impact: 'Solar storms can disrupt GPS systems used for precision farming, affecting crop monitoring, automated tractors, and irrigation systems. This can lead to reduced crop yields and food security issues.',
      detailedImpact: 'Modern agriculture heavily relies on GPS technology for precision farming techniques. During geomagnetic storms, GPS signals can become unreliable or completely unavailable, causing automated tractors to lose their way, irrigation systems to malfunction, and crop monitoring systems to provide inaccurate data. This disruption can result in significant economic losses, reduced crop yields, and potential food security issues for entire communities.',
      riskLevel: 'Moderate',
      affectedSystems: ['GPS-guided tractors', 'Automated irrigation systems', 'Crop monitoring drones', 'Precision planting equipment'],
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
      icon: <Shield className="w-8 h-8" />,
      baseHealth: 100,
      vulnerability: 0.8,
      color: 'from-blue-500 to-cyan-600',
      description: 'Navigating the vast oceans to catch fish',
      impact: 'GPS navigation failures during geomagnetic storms can leave fishermen lost at sea, unable to find their way back to shore or locate fishing grounds. This puts lives at risk and affects livelihoods.',
      detailedImpact: 'Fishermen depend on GPS navigation systems to safely navigate vast ocean waters, locate productive fishing grounds, and return to shore. When geomagnetic storms disrupt these systems, fishermen can become lost at sea, unable to find their way back to safety. This creates life-threatening situations and can result in search and rescue operations. Additionally, the inability to locate known fishing spots can severely impact their livelihood and the local seafood supply chain.',
      riskLevel: 'High',
      affectedSystems: ['GPS navigation', 'Fish finder systems', 'Emergency beacons', 'Communication systems'],
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
      icon: <Zap className="w-8 h-8" />,
      baseHealth: 100,
      vulnerability: 0.9,
      color: 'from-yellow-500 to-orange-600',
      description: 'Managing electrical power systems',
      impact: 'Geomagnetic storms can induce currents in power lines, causing transformer damage, blackouts, and cascading failures across the electrical grid, affecting millions of people.',
      detailedImpact: 'Geomagnetic storms generate powerful electromagnetic fields that can induce dangerous currents in power transmission lines and transformers. These geomagnetically induced currents (GICs) can cause transformers to overheat and fail, leading to widespread blackouts that can affect millions of people. The cascading effect of grid failures can shut down hospitals, schools, businesses, and critical infrastructure, potentially lasting for days or weeks while damaged equipment is repaired or replaced.',
      riskLevel: 'Critical',
      affectedSystems: ['High-voltage transformers', 'Power transmission lines', 'Grid control systems', 'Protective relays'],
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
      icon: <AlertTriangle className="w-8 h-8" />,
      baseHealth: 100,
      vulnerability: 1.0,
      color: 'from-purple-500 to-pink-600',
      description: 'Exploring space and conducting research',
      impact: 'Direct exposure to solar radiation and particles during space missions can cause serious health issues, equipment failures, and mission abort scenarios.',
      detailedImpact: 'Astronauts in space are directly exposed to the harsh radiation environment during solar storms. High-energy particles can penetrate spacecraft shielding and spacesuits, causing acute radiation sickness, increased cancer risk, and potential death. Solar storms can also damage critical spacecraft systems, including life support, navigation, and communication equipment, potentially stranding astronauts or forcing mission abort. The radiation can also affect electronic systems and computers essential for mission operations.',
      riskLevel: 'Extreme',
      affectedSystems: ['Life support systems', 'Navigation computers', 'Communication equipment', 'Spacecraft electronics'],
      solutions: [
        'Monitor space weather forecasts before EVAs',
        'Use radiation shielding in spacecraft',
        'Have emergency protocols for solar storms',
        'Coordinate with ground control for safety updates'
      ]
    }
  ];

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'High': return 'text-red-400 bg-red-900';
      case 'Moderate': return 'text-yellow-400 bg-yellow-900';
      case 'Low': return 'text-green-400 bg-green-900';
      case 'Extreme': return 'text-purple-400 bg-purple-900';
      default: return 'text-gray-400 bg-gray-900';
    }
  };

  // Filter characters based on selectedCharacter
  const displayCharacters = selectedCharacter 
    ? characters.filter(char => char.id === selectedCharacter.id)
    : characters;

  return (
    <div className="min-h-screen py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          {onBack && (
            <div className="mb-6">
              <button
                onClick={onBack}
                className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            </div>
          )}
          
          <h1 className="text-5xl font-bold gradient-text mb-6">
            {selectedCharacter ? `${selectedCharacter.name} -  Space Weather Impact` : ' Space Weather Impact Analysis'}
          </h1>
          <p className="text-xl text-blue-200 max-w-4xl mx-auto mb-8">
            {selectedCharacter 
              ? `Detailed analysis of how space weather affects ${selectedCharacter.name.toLowerCase()}s and their critical systems`
              : 'Comprehensive overview of how space weather affects different professions and critical infrastructure systems'
            }
          </p>
        </div>

        {/* Characters Grid */}
        <div className="grid gap-8 md:gap-12">
          {displayCharacters.map((character, index) => (
            <div
              key={character.id}
              className="bg-black bg-opacity-40 backdrop-blur-sm rounded-3xl p-8 animate-slide-up border border-white border-opacity-10 hover:border-opacity-20 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Character Header */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                <div className={`bg-gradient-to-r ${character.color} rounded-full w-24 h-24 flex items-center justify-center animate-float`}>
                  <span className="text-4xl">{character.emoji}</span>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">{character.name}</h2>
                  <p className="text-lg text-blue-200 mb-4">{character.description}</p>
                  
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(character.riskLevel)} bg-opacity-20`}>
                      Risk Level: {character.riskLevel}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-300 bg-blue-900 bg-opacity-20">
                      Vulnerability: {Math.round(character.vulnerability * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Impact Details */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Impact Description */}
                <div>
                  <h3 className="text-xl font-bold text-stellar-gold mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 text-red-400 mr-2" />
                    Impact of Space Weather
                  </h3>
                  <p className="text-blue-200 leading-relaxed mb-6">{character.detailedImpact}</p>
                  
                  <h4 className="text-lg font-bold text-white mb-3">Affected Systems:</h4>
                  <div className="space-y-2">
                    {character.affectedSystems.map((system, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-red-200 text-sm">{system}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Solutions */}
                <div>
                  <h3 className="text-xl font-bold text-stellar-gold mb-4 flex items-center">
                    <Shield className="w-6 h-6 text-green-400 mr-2" />
                    Protection Strategies
                  </h3>
                  <div className="space-y-3">
                    {character.solutions.map((solution, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 bg-green-900 bg-opacity-20 rounded-lg p-4 border border-green-500 border-opacity-30 hover:border-opacity-50 transition-all duration-300"
                      >
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-green-100 text-sm font-medium">{solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency Action Plan */}
              <div className="mt-8 bg-blue-900 bg-opacity-30 rounded-lg p-6 border border-blue-500 border-opacity-30">
                <h4 className="text-lg font-bold text-blue-300 mb-3 flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mr-2" />
                  Emergency Action Plan for {character.name}
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-blue-200 text-sm">
                  <div>
                    <p className="font-medium mb-1">Before Space Weather Events:</p>
                    <p>• Monitor space weather forecasts daily</p>
                    <p>• Test backup systems and equipment</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">During Space Weather Events:</p>
                    <p>• Activate emergency protocols immediately</p>
                    <p>• Switch to backup systems when needed</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Information */}
        <div className="mt-16 text-center">
          <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-10">
            <h3 className="text-2xl font-bold text-stellar-gold mb-4">Understanding Space Weather</h3>
            <p className="text-blue-200 leading-relaxed max-w-4xl mx-auto mb-8">
              Space weather refers to the environmental conditions in space as influenced by solar activity. 
              Solar flares, coronal mass ejections, and geomagnetic storms can significantly impact Earth's 
              technological systems and human activities. By understanding these impacts and preparing 
              appropriate mitigation strategies, we can better protect our infrastructure and ensure the 
              safety of people in various professions.
            </p>
            
            {/* Next Button */}
            {onNext && (
              <div className="mt-8">
                <button
                  onClick={onNext}
                  className="bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
                >
                  <span>Continue Journey</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedImpactPage;