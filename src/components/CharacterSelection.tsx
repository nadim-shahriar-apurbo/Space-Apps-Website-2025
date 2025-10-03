import React, { useState } from 'react';
import { ChevronRight, Heart, Star, Sparkles } from 'lucide-react';

interface CharacterSelectionProps {
  onCharacterSelected: (character: Character) => void;
}

interface Character {
  id: string;
  name: string;
  description: string;
  personality: string;
  color: string;
  emoji: string;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ onCharacterSelected }) => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);

  const characters: Character[] = [
    {
      id: 'curious-explorer',
      name: 'Curious Explorer',
      description: 'Always asking questions and eager to learn',
      personality: 'Inquisitive, brave, and loves discovering new things',
      color: 'from-blue-400 to-cyan-500',
      emoji: '🔍'
    },
    {
      id: 'science-enthusiast',
      name: 'Science Enthusiast',
      description: 'Fascinated by how things work in the universe',
      personality: 'Analytical, thoughtful, and loves experiments',
      color: 'from-green-400 to-emerald-500',
      emoji: '🧪'
    },
    {
      id: 'space-dreamer',
      name: 'Space Dreamer',
      description: 'Dreams of traveling among the stars',
      personality: 'Imaginative, optimistic, and loves stargazing',
      color: 'from-purple-400 to-pink-500',
      emoji: '🌟'
    },
    {
      id: 'tech-wizard',
      name: 'Tech Wizard',
      description: 'Loves gadgets and understanding technology',
      personality: 'Creative, innovative, and tech-savvy',
      color: 'from-orange-400 to-red-500',
      emoji: '⚡'
    }
  ];

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleConfirmSelection = () => {
    if (selectedCharacter) {
      onCharacterSelected(selectedCharacter);
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Star className="w-8 h-8 text-stellar-gold mr-3 animate-twinkle" />
            <h1 className="text-5xl font-bold gradient-text">
              Choose Your Character
            </h1>
            <Star className="w-8 h-8 text-stellar-gold ml-3 animate-twinkle" />
          </div>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Select the character that best represents you on this space weather adventure!
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {characters.map((character, index) => (
            <div
              key={character.id}
              className={`group cursor-pointer animate-slide-up transition-all duration-300 ${
                selectedCharacter?.id === character.id ? 'scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => handleCharacterSelect(character)}
              onMouseEnter={() => setHoveredCharacter(character.id)}
              onMouseLeave={() => setHoveredCharacter(null)}
            >
              <div className={`bg-black bg-opacity-30 backdrop-blur-sm rounded-3xl p-8 h-full transition-all duration-300 border-2 ${
                selectedCharacter?.id === character.id
                  ? 'border-stellar-gold bg-opacity-50 shadow-2xl shadow-stellar-gold/20'
                  : 'border-white border-opacity-20 hover:border-opacity-40 hover:bg-opacity-50'
              }`}>
                {/* Character Avatar */}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 animate-float">
                    {character.emoji}
                  </div>
                  <div className={`bg-gradient-to-r ${character.color} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 text-white transition-all duration-300 ${
                    hoveredCharacter === character.id || selectedCharacter?.id === character.id
                      ? 'animate-pulse scale-110'
                      : ''
                  }`}>
                    <div className="w-12 h-12 bg-gradient-to-b from-orange-200 to-orange-300 rounded-full relative">
                      {/* Simple anime face */}
                      <div className="absolute top-2 left-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3 h-1 border-b-2 border-green-600 rounded-b-full"></div>
                    </div>
                  </div>
                </div>

                {/* Character Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-3">
                    {character.name}
                  </h3>
                  <p className="text-blue-200 text-sm mb-4 leading-relaxed">
                    {character.description}
                  </p>
                  <p className="text-gray-300 text-xs leading-relaxed">
                    {character.personality}
                  </p>
                </div>

                {/* Selection Indicator */}
                {selectedCharacter?.id === character.id && (
                  <div className="mt-6 text-center animate-fade-in">
                    <div className="flex items-center justify-center space-x-2 text-stellar-gold">
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="text-sm font-bold">Selected!</span>
                      <Heart className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Confirm Button */}
        {selectedCharacter && (
          <div className="text-center animate-fade-in">
            <div className="bg-black bg-opacity-40 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Great Choice!
              </h3>
              <p className="text-blue-200 mb-4">
                You've chosen <span className="text-stellar-gold font-bold">{selectedCharacter.name}</span>
              </p>
              <p className="text-gray-300 text-sm">
                {selectedCharacter.personality}
              </p>
            </div>
            
            <button
              onClick={handleConfirmSelection}
              className="group bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 animate-glow flex items-center space-x-2 mx-auto"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Continue Your Journey</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterSelection;