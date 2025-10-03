import React, { useState, useEffect } from 'react';

interface AuroraPainterProps {
  onNext?: () => void;
}

const AuroraPainter: React.FC<AuroraPainterProps> = ({ onNext }) => {
  const [intensity, setIntensity] = useState(50);
  const [isAnimating, setIsAnimating] = useState(true);

  // Handle slider change
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIntensity(parseInt(event.target.value));
  };

  // Toggle animation
  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black relative overflow-hidden">
      {/* Black mask overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      
      {/* Aurora background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-300"
        style={{
          backgroundImage: 'url(/auroraslider.jpg)',
          opacity: intensity / 100,
          filter: `brightness(${0.5 + (intensity / 100) * 1.5}) contrast(${1 + intensity / 200}) saturate(${1 + intensity / 100})`,
          transform: isAnimating ? `scale(${1 + (intensity / 1000)})` : 'scale(1)'
        }}
      ></div>

      {/* Control Panel */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-white/20 z-40">
        <h1 className="text-4xl font-bold text-white text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Aurora Painter
        </h1>
        
        {/* Intensity Slider */}
        <div className="mb-6">
          <label className="block text-white text-lg font-semibold mb-4 text-center">
            Aurora Intensity Level: {intensity}%
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={intensity}
              onChange={handleSliderChange}
              className="w-80 h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #1f2937 0%, #10b981 ${intensity}%, #1f2937 ${intensity}%, #1f2937 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Dim</span>
              <span>Moderate</span>
              <span>Brilliant</span>
            </div>
          </div>
        </div>

        {/* Animation Toggle */}
        <div className="text-center">
          <button
            onClick={toggleAnimation}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              isAnimating 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-gray-200'
            }`}
          >
            {isAnimating ? 'Pause Animation' : 'Start Animation'}
          </button>
        </div>

        {/* Intensity Description */}
        <div className="mt-4 text-center">
          <p className="text-gray-300 text-sm">
            {intensity < 25 && "Faint aurora glow - barely visible"}
            {intensity >= 25 && intensity < 50 && "Moderate aurora activity - gentle waves"}
            {intensity >= 50 && intensity < 75 && "Strong aurora display - vibrant colors"}
            {intensity >= 75 && "Intense aurora storm - spectacular light show"}
          </p>
        </div>

        {/* Next Button */}
        {onNext && (
          <div className="mt-6 text-center">
            {/* <button
              onClick={onNext}
              className="bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
            >
              Continue Journey →
            </button> */}
          </div>
        )}
      </div>

      {/* Custom CSS for slider styling */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #3b82f6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #10b981, #3b82f6);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AuroraPainter;