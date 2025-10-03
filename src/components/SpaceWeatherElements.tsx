import React, { useState } from 'react';
import { ChevronRight, X, ExternalLink, Zap, Sun, Waves, Wind } from 'lucide-react';

interface SpaceWeatherElementsProps {
  onNext: () => void;
}

interface Element {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string;
  nasaImage: string;
  nasaLink: string;
  color: string;
}

const SpaceWeatherElements: React.FC<SpaceWeatherElementsProps> = ({ onNext }) => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const elements: Element[] = [
    {
      id: 'solar-flares',
      title: 'Solar Flares',
      icon: <Zap className="w-12 h-12" />,
      description: 'Intense bursts of radiation from the Sun',
      details: 'Solar flares are intense bursts of radiation coming from the release of magnetic energy associated with sunspots. They are the most powerful explosions in the solar system and can affect radio communications, GPS systems, and power grids on Earth.',
      nasaImage: 'https://images.pexels.com/photos/87009/earth-soil-creep-moon-lunar-surface-87009.jpeg',
      nasaLink: 'https://www.nasa.gov/solar-flares',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'cme',
      title: 'Coronal Mass Ejections',
      icon: <Sun className="w-12 h-12" />,
      description: 'Massive bursts of solar wind and magnetic fields',
      details: 'Coronal Mass Ejections (CMEs) are large expulsions of plasma and magnetic field from the Sun\'s corona. They can cause geomagnetic storms when they interact with Earth\'s magnetosphere, potentially disrupting satellites and power systems.',
      nasaImage: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg',
      nasaLink: 'https://www.nasa.gov/coronal-mass-ejections',
      color: 'from-yellow-500 to-red-500'
    },
    {
      id: 'geomagnetic-storms',
      title: 'Geomagnetic Storms',
      icon: <Waves className="w-12 h-12" />,
      description: 'Disturbances in Earth\'s magnetic field',
      details: 'Geomagnetic storms occur when solar wind interacts with Earth\'s magnetic field. These storms can cause beautiful auroras but also disrupt GPS navigation, radio communications, and electrical power grids.',
      nasaImage: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg',
      nasaLink: 'https://www.nasa.gov/geomagnetic-storms',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'solar-wind',
      title: 'Solar Wind',
      icon: <Wind className="w-12 h-12" />,
      description: 'Stream of charged particles from the Sun',
      details: 'Solar wind is a stream of charged particles released from the upper atmosphere of the Sun. It varies in density, temperature, and speed over time and affects the entire solar system, including Earth\'s magnetosphere.',
      nasaImage: 'https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg',
      nasaLink: 'https://www.nasa.gov/solar-wind',
      color: 'from-blue-500 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Space Weather Elements
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Discover the powerful forces from our Sun that can affect life on Earth
          </p>
        </div>

        {/* Elements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {elements.map((element, index) => (
            <div
              key={element.id}
              className="group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => setSelectedElement(element)}
            >
              <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-6 h-full transition-all duration-300 hover:scale-105 hover:bg-opacity-50 border border-white border-opacity-20">
                <div className={`bg-gradient-to-r ${element.color} rounded-full w-20 h-20 flex items-center justify-center mb-6 mx-auto text-white group-hover:animate-pulse`}>
                  {element.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">
                  {element.title}
                </h3>
                <p className="text-blue-200 text-center text-sm leading-relaxed">
                  {element.description}
                </p>
                <div className="mt-4 text-center">
                  <span className="text-stellar-gold text-sm font-semibold group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <div className="text-center animate-fade-in">
          <button
            onClick={onNext}
            className="group bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 animate-glow flex items-center space-x-2 mx-auto"
          >
            <span>Learn About  Space Weather Impacts</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedElement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop">
          <div className="bg-black bg-opacity-90 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="p-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`bg-gradient-to-r ${selectedElement.color} rounded-full w-16 h-16 flex items-center justify-center text-white`}>
                    {selectedElement.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-white">
                    {selectedElement.title}
                  </h2>
                </div>
                {/* Back closes modal */}
                <button
                  onClick={() => setSelectedElement(null)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setSelectedElement(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image */}
              <div className="mb-6">
                <img
                  src={selectedElement.nasaImage}
                  alt={selectedElement.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Description */}
              <p className="text-blue-200 text-lg leading-relaxed mb-6">
                {selectedElement.details}
              </p>

              {/* NASA Link */}
              <a
                href={selectedElement.nasaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span>Learn More from NASA</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpaceWeatherElements;