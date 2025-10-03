import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Zap, Sun, Waves, Wind, Sparkles } from 'lucide-react';

interface InteractiveSpaceWeatherElementsProps {
  onNext: () => void;
  onLearnMore?: () => void;
}

interface Element {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  color: string;
  facts: string[];
}

const InteractiveSpaceWeatherElements: React.FC<InteractiveSpaceWeatherElementsProps> = ({ onNext, onLearnMore }) => {
  const [currentElementIndex, setCurrentElementIndex] = useState(0);
  const [showFacts, setShowFacts] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const elements: Element[] = [
    {
      id: 'cme',
      title: 'Coronal Mass Ejections (CME)',
      icon: <Sun className="w-16 h-16" />,
      description: 'Massive bursts of solar wind and magnetic fields released from the Sun\'s corona',
      details: 'Coronal Mass Ejections are like giant bubbles of gas and magnetic field lines that are ejected from the Sun over the course of several hours. When they reach Earth, they can cause beautiful auroras but also disrupt our technology.',
      color: 'from-yellow-400 to-orange-600',
      facts: [
        'CMEs can travel at speeds up to 3,000 km/s',
        'They can contain billions of tons of plasma',
        'The largest CME on record occurred in 1859',
        'They cause the beautiful Northern and Southern Lights'
      ]
    },
    {
      id: 'solar-flares',
      title: 'Solar Flares',
      icon: <Zap className="w-16 h-16" />,
      description: 'Intense bursts of radiation from the Sun\'s surface',
      details: 'Solar flares are like giant explosions on the Sun that release enormous amounts of energy. They happen when magnetic field lines get tangled up and suddenly snap back into place, releasing energy equivalent to billions of nuclear bombs!',
      color: 'from-red-500 to-orange-500',
      facts: [
        'The largest flares are called X-class flares',
        'They can disrupt radio communications on Earth',
        'Flares travel at the speed of light',
        'They often occur near sunspots'
      ]
    },
    {
      id: 'geomagnetic-storms',
      title: 'Geomagnetic Storms',
      icon: <Waves className="w-16 h-16" />,
      description: 'Disturbances in Earth\'s magnetic field caused by solar activity',
      details: 'When solar particles reach Earth, they interact with our planet\'s magnetic field, creating geomagnetic storms. These storms can make compasses spin wildly and cause power outages, but they also create spectacular light shows in the sky!',
      color: 'from-green-400 to-blue-600',
      facts: [
        'They can last from hours to several days',
        'Stronger storms can be seen at lower latitudes',
        'They can disrupt GPS and satellite communications',
        'The Carrington Event of 1859 was the strongest recorded'
      ]
    },
    {
      id: 'solar-wind',
      title: 'Solar Wind',
      icon: <Wind className="w-16 h-16" />,
      description: 'A stream of charged particles flowing from the Sun',
      details: 'The solar wind is like an invisible river of particles that flows from the Sun at all times. It\'s made of electrons and protons that have escaped from the Sun\'s atmosphere and travel through space at incredible speeds!',
      color: 'from-cyan-400 to-blue-500',
      facts: [
        'Solar wind speed ranges from 300-800 km/s',
        'It creates the shape of comet tails',
        'Earth\'s magnetic field protects us from it',
        'It extends beyond Pluto\'s orbit'
      ]
    }
  ];

  const currentElement = elements[currentElementIndex];

  const handleNext = () => {
    if (currentElementIndex < elements.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentElementIndex(currentElementIndex + 1);
        setShowFacts(false);
        setIsTransitioning(false);
      }, 300);
    } else {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentElementIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentElementIndex(currentElementIndex - 1);
        setShowFacts(false);
        setIsTransitioning(false);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl font-bold gradient-text mb-6 animate-glow">
            Space Weather Elements
          </h1>
          <p className={`text-xl text-blue-200 transition-all duration-1000 ${isLoaded ? 'animate-fadeInUp animate-delay-200' : 'opacity-0 translate-y-10'}`}>
            Let's explore the amazing forces from our Sun!
          </p>
        </div>

        {/* Progress Indicator */}
        <div className={`flex justify-center space-x-3 mb-12 transition-all duration-1000 ${isLoaded ? 'animate-slideInUp animate-delay-300' : 'opacity-0 translate-y-10'}`}>
          {elements.map((_, index) => (
            <div
              key={index}
              className={`h-3 rounded-full transition-all duration-500 ${
                index <= currentElementIndex ? 'bg-stellar-gold w-12 animate-glow' : 'bg-gray-600 w-3'
              }`}
            />
          ))}
        </div>

        {/* Main Content Box */}
        <div className={`bg-black bg-opacity-40 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white border-opacity-20 transition-all duration-700 ${
          isLoaded ? 'animate-scaleIn animate-delay-500' : 'opacity-0 scale-90'
        } ${
          isTransitioning ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'
        }`}>
          {/* Element Header */}
          <div className="text-center mb-8">
            <div className={`bg-gradient-to-r ${currentElement.color} rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 text-white animate-float animate-glow transition-all duration-500`}>
              {currentElement.icon}
            </div>
            <h2 className={`text-3xl font-bold text-white mb-4 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              {currentElement.title}
            </h2>
            <p className={`text-lg text-blue-200 mb-6 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              {currentElement.description}
            </p>
          </div>

          {/* Element Details */}
          <div className={`bg-black bg-opacity-30 rounded-2xl p-6 mb-8 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <p className="text-white text-lg leading-relaxed mb-6">
              {currentElement.details}
            </p>
            
            {!showFacts ? (
              <button
                onClick={() => setShowFacts(true)}
                className="bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto animate-bounceIn"
              >
                <Sparkles className="w-5 h-5 animate-pulse" />
                <span>Show Fun Facts!</span>
              </button>
            ) : (
              <div className="animate-fadeInUp">
                <h3 className="text-stellar-gold text-xl font-bold mb-4 text-center animate-glow">
                  🌟 Amazing Facts! 🌟
                </h3>
                <div className="grid gap-3">
                  {currentElement.facts.map((fact, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-4 text-white border border-stellar-gold border-opacity-30 animate-slideInLeft`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-stellar-gold text-xl">✨</span>
                        <span>{fact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentElementIndex === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                currentElementIndex === 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white animate-slideInLeft'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="text-center">
              <span className="text-stellar-gold font-bold text-lg animate-pulse">
                {currentElementIndex + 1} of {elements.length}
              </span>
            </div>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold transition-all duration-300 transform hover:scale-105 animate-slideInRight"
            >
              <span>{currentElementIndex === elements.length - 1 ? 'Continue' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Learn More Button */}
          {onLearnMore && (
            <div className="text-center mt-8">
              <button
                onClick={onLearnMore}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-pulse"
              >
                <span className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Learn More in Gallery</span>
                  <Sparkles className="w-5 h-5" />
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Floating Animation Elements */}
        <div className={`absolute top-20 left-10 w-3 h-3 bg-stellar-gold rounded-full animate-float opacity-60 transition-all duration-1000 ${isLoaded ? 'animate-fadeIn animate-delay-1000' : 'opacity-0'}`}></div>
        <div className={`absolute top-1/3 right-20 w-4 h-4 bg-blue-400 rounded-full animate-pulse opacity-50 transition-all duration-1000 ${isLoaded ? 'animate-fadeIn animate-delay-700' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-32 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-70 transition-all duration-1000 ${isLoaded ? 'animate-fadeIn animate-delay-500' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-20 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-bounce opacity-40 transition-all duration-1000 ${isLoaded ? 'animate-fadeIn animate-delay-300' : 'opacity-0'}`}></div>
      </div>
    </div>
  );
};

export default InteractiveSpaceWeatherElements;