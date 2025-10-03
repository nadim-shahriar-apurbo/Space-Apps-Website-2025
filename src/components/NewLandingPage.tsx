import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Sun3D from './Sun3D';

interface NewLandingPageProps {
  onExplore: () => void;
}

const NewLandingPage: React.FC<NewLandingPageProps> = ({ onExplore }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Main Title */}
        <div className={`mb-16 transition-all duration-1000 ${isLoaded ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-7xl lg:text-8xl font-bold gradient-text mb-8 animate-float animate-glow">
            Stellar X
          </h1>
          <p className={`text-2xl lg:text-3xl text-blue-200 mb-4 text-shadow transition-all duration-1000 ${isLoaded ? 'animate-fadeInUp animate-delay-200' : 'opacity-0 translate-y-10'}`}>
            A Child's Journey to Discover Space Weather
          </p>
          <p className={`text-lg text-blue-300 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ${isLoaded ? 'animate-fadeInUp animate-delay-300' : 'opacity-0 translate-y-10'}`}>
            Embark on an educational adventure to understand the invisible forces 
            that connect our planet to the cosmos
          </p>
        </div>

        {/* Explore Button */}
        <div className={`relative z-20 transition-all duration-1000 ${isLoaded ? 'animate-bounceIn animate-delay-500' : 'opacity-0 scale-50'}`}>
          <button
            onClick={onExplore}
            className="relative z-30 group bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold py-6 px-12 rounded-full text-2xl transition-all duration-300 transform hover:scale-110 animate-glow flex items-center space-x-4 mx-auto shadow-2xl hover:shadow-stellar-gold/50 pointer-events-auto"
          >
            <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform animate-pulse" />
            <span>Explore</span>
            <Sparkles className="w-8 h-8 group-hover:-rotate-12 transition-transform animate-pulse" />
          </button>
          
          {/* 3D Sun positioned under the explore button */}
          <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-8 z-10 transition-all duration-1000 pointer-events-none ${isLoaded ? 'animate-scaleIn animate-delay-700' : 'opacity-0 scale-0'}`} style={{ mixBlendMode: 'screen', opacity: 0.9 }}>
            <Sun3D />
          </div>
        </div>

        {/* Enhanced Floating Elements with Staggered Animations */}
        <div className={`absolute top-20 left-10 w-4 h-4 bg-stellar-gold rounded-full animate-float opacity-60 transition-all duration-1000 pointer-events-none ${isLoaded ? 'animate-fadeIn animate-delay-1000' : 'opacity-0'}`}></div>
        <div className={`absolute top-40 right-20 w-6 h-6 bg-nebula-pink rounded-full animate-float opacity-40 transition-all duration-1000 pointer-events-none ${isLoaded ? 'animate-fadeIn animate-delay-1000' : 'opacity-0'}`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute bottom-32 left-20 w-3 h-3 bg-blue-400 rounded-full animate-float opacity-50 transition-all duration-1000 pointer-events-none ${isLoaded ? 'animate-fadeIn animate-delay-1000' : 'opacity-0'}`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute bottom-20 right-10 w-5 h-5 bg-purple-400 rounded-full animate-float opacity-30 transition-all duration-1000 pointer-events-none ${isLoaded ? 'animate-fadeIn animate-delay-1000' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}></div>
        
        {/* Additional Animated Elements */}
        <div className={`absolute top-1/3 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse opacity-70 transition-all duration-1000 pointer-events-none ${isLoaded ? 'animate-fadeIn animate-delay-700' : 'opacity-0'}`}></div>
        <div className={`absolute top-2/3 right-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60 transition-all duration-1000 pointer-events-none ${isLoaded ? 'animate-fadeIn animate-delay-500' : 'opacity-0'}`}></div>
        <div className={`absolute top-1/2 left-1/6 w-1 h-1 bg-stellar-gold rounded-full animate-ping opacity-80 transition-all duration-1000 pointer-events-none ${isLoaded ? 'animate-fadeIn animate-delay-300' : 'opacity-0'}`}></div>
        <div className={`absolute top-1/4 right-1/6 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-50 transition-all duration-1000 pointer-events-none ${isLoaded ? 'animate-fadeIn animate-delay-200' : 'opacity-0'}`}></div>
      </div>
    </div>
  );
};

export default NewLandingPage;