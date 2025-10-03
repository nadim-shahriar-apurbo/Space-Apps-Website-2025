import React, { useState, useEffect } from 'react';
import { ArrowLeft, Satellite, Brain, Eye, Globe, Heart } from 'lucide-react';

interface PredictionPageProps {
  onBack: () => void;
}

const PredictionPage: React.FC<PredictionPageProps> = ({ onBack }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [solarActivity, setSolarActivity] = useState(Math.floor(Math.random() * 100));

  const phases = [
    {
      title: "Satellite Monitoring",
      icon: <Satellite className="w-16 h-16" />,
      description: "Advanced satellites continuously monitor the Sun's activity, detecting solar flares and coronal mass ejections in real-time."
    },
    {
      title: "AI Analysis",
      icon: <Brain className="w-16 h-16" />,
      description: "Artificial intelligence systems analyze vast amounts of solar data to predict space weather patterns and potential impacts."
    },
    {
      title: "Ground Observatories",
      icon: <Eye className="w-16 h-16" />,
      description: "Earth-based observatories work together with space missions to provide comprehensive space weather monitoring."
    },
    {
      title: "Global Alerts",
      icon: <Globe className="w-16 h-16" />,
      description: "Warning systems alert governments, airlines, power companies, and the public about incoming space weather events."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
      setSolarActivity(Math.floor(Math.random() * 100));
    }, 4000);

    return () => clearInterval(timer);
  }, [phases.length]);

  return (
    <div className="min-h-screen py-16 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header with character */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="relative mb-8">
            {/* Futuristic background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            
            {/* Character Portrait */}
            <div className="relative anime-character animate-float mx-auto w-fit">
              <div className="w-64 h-64 rounded-full relative overflow-hidden border-4 border-cyan-400 shadow-2xl">
                <img 
                  src="/Girl Portrait.png" 
                  alt="Character Portrait" 
                  className="w-full h-full object-cover"
                />
                {/* Futuristic overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-500/15"></div>
                {/* Tech overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-400/10"></div>
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold gradient-text mb-6">
            Space Weather Prediction
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            How scientists predict and monitor space weather to protect our world
          </p>
        </div>

        {/* Futuristic City Background */}
        <div className="relative mb-16">
          <div className="absolute inset-0 bg-gradient-to-t from-space-blue to-transparent rounded-2xl"></div>
          <div className="bg-black bg-opacity-20 backdrop-blur-sm rounded-2xl p-8 relative">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Current Phase */}
              <div className="animate-slide-up">
                <div className="text-center mb-8">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 text-white animate-pulse">
                    {phases[currentPhase].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {phases[currentPhase].title}
                  </h3>
                  <p className="text-blue-200 leading-relaxed">
                    {phases[currentPhase].description}
                  </p>
                </div>
              </div>

              {/* Solar Activity Monitor */}
              <div className="animate-slide-up">
                <div className="bg-black bg-opacity-40 rounded-xl p-6">
                  <h4 className="text-xl font-bold text-stellar-gold mb-4 text-center">
                    Live Solar Activity Monitor
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Solar Activity Level:</span>
                      <span className={`font-bold ${
                        solarActivity > 70 ? 'text-red-400' : 
                        solarActivity > 40 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {solarActivity}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          solarActivity > 70 ? 'bg-gradient-to-r from-red-500 to-red-600' : 
                          solarActivity > 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 
                          'bg-gradient-to-r from-green-500 to-green-600'
                        }`}
                        style={{ width: `${solarActivity}%` }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <span className={`text-sm font-semibold ${
                        solarActivity > 70 ? 'text-red-400' : 
                        solarActivity > 40 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {solarActivity > 70 ? 'HIGH ALERT' : 
                         solarActivity > 40 ? 'MODERATE' : 'QUIET'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase Indicators */}
        <div className="flex justify-center space-x-4 mb-16">
          {phases.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                index === currentPhase ? 'bg-stellar-gold scale-125' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Final Message */}
        <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 text-center animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-red-400 mr-3" />
            <h2 className="text-3xl font-bold gradient-text">
              A Message from Our Young Scientist
            </h2>
            <Heart className="w-8 h-8 text-red-400 ml-3" />
          </div>
          <p className="text-xl text-white leading-relaxed mb-8 max-w-4xl mx-auto">
            "Space weather affects all of us—from the fisherman navigating the seas to the farmer growing our food, 
            from the pilot flying overhead to the engineer managing our power grid. By understanding and predicting 
            these cosmic forces, we can protect lives, preserve technology, and build a more resilient future. 
            Stay informed, stay prepared, and help spread awareness about the invisible forces that connect us all 
            to the stars."
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={onBack}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Start Over</span>
            </button>
            
            <a
              href="https://www.nasa.gov/space-weather"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Learn More from NASA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage;