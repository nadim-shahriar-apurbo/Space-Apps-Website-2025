import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryProps {
  onBack: () => void;
}

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Simplified view: no modal or element-specific details

  const items: GalleryItem[] = [
    {
      id: 'what-is-space-weather',
      title: 'What Is Space Weather?',
      description:
        'Space weather refers to the changing conditions in space driven by solar activity. It includes solar flares, coronal mass ejections, and the solar wind interacting with Earth’s magnetic field. Understanding these basics is the first step to mastering space weather.',
      imageUrl: '/Img/img-5.png',
    },
    {
      id: 'where-does-it-come-from',
      title: 'Where Does It Come From?',
      description:
        'Space weather originates from the Sun: sunspots, magnetic reconnection, solar flares, and coronal mass ejections release energy and charged particles. These travel through the solar system and can reach Earth within hours to days depending on speed and direction.',
      imageUrl: '/Img/img-1.png',
    },
    {
      id: 'how-can-it-affect-earth',
      title: 'How Can It Affect Earth ?',
      description:
        'Impacts range from beautiful auroras to serious technological disruptions. Satellites may experience radiation damage, GPS accuracy can degrade, radio communications may fade, and in extreme cases geomagnetic storms can stress power grids. Awareness and resilience planning reduce risk.',
      imageUrl: '/Img/img-4.png',
    },
    {
      id: 'how-do-we-monitor',
      title: 'How Do We Monitor It?',
      description:
        'Scientists monitor the Sun with ground-based telescopes and spacecraft (e.g., SOHO, SDO, DSCOVR). Instruments track X-rays, magnetic fields, particle flux, and solar wind speed. Forecast centers analyze this data to predict storm arrival and intensity.',
      imageUrl: '/Img/img-2.png',
    },
    {
      id: 'why-does-it-matter',
      title: 'Why Does It Matter?',
      description:
        'Space weather awareness protects modern life. Reliable forecasts help airlines plan polar routes, grid operators manage risk, satellite teams safeguard assets, and mission planners time launches. Learning the signals and responses turns beginners into confident practitioners.',
      imageUrl: '/Img/img-6.png',
    },
  ];

  // Simplified items above; no reordering swap needed

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  // No modal functionality in simplified overview

  const currentItem = items[currentIndex];

  return (
    <div className="min-h-screen py-16 px-4 relative z-10">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-stellar-gold rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-50"></div>
        <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-5xl lg:text-6xl font-bold gradient-text mb-6 animate-glow">
            What Is Space Weather?
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Start here: clear basics, key concepts, and a quick path to expertise.
          </p>
        </div>

        {/* Main Gallery Display */}
        <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-3xl p-8 mb-8 animate-slideInUp">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={currentItem.imageUrl}
                  alt={currentItem.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                {/* Info button removed to keep the page focused and simple */}
              </div>
              
              {/* Category badge removed in simplified overview */}
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white animate-slideInRight">
                {currentItem.title}
              </h2>
              <p className="text-blue-200 leading-relaxed text-lg animate-slideInRight">
                {currentItem.description}
              </p>
              
              {/* Removed Quick Facts and detailed modal trigger */}
            </div>
          </div>
        </div>

        

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handlePrevious}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="text-center">
            <span className="text-stellar-gold font-bold text-lg">
              {currentIndex + 1} of {items.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex justify-center space-x-4 overflow-x-auto pb-4">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                index === currentIndex
                  ? 'border-stellar-gold scale-110 shadow-lg shadow-stellar-gold/50'
                  : 'border-white border-opacity-30 hover:border-opacity-60'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Detailed modal removed for simplified overview */}
    </div>
  );
};

export default Gallery;