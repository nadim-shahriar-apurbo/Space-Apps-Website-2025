import React, { useMemo, useRef, useState } from 'react';
import { Heart, X } from 'lucide-react';

const ArtChallengePage: React.FC = () => {
  // Use images from public/art and assign randomized child names and ages (<14)
  const artFileNames = [
    'WhatsApp Image 2025-10-03 at 02.53.07 (1).jpeg',
    'WhatsApp Image 2025-10-03 at 02.53.07.jpeg',
    'WhatsApp Image 2025-10-03 at 02.53.08.jpeg',
    'WhatsApp Image 2025-10-03 at 02.53.09 (1).jpeg',
    'WhatsApp Image 2025-10-03 at 02.53.09.jpeg',
    'WhatsApp Image 2025-10-03 at 02.53.10 (1).jpeg',
    'WhatsApp Image 2025-10-03 at 02.53.10 (2).jpeg',
    'WhatsApp Image 2025-10-03 at 02.53.10.jpeg',
    'WhatsApp Image 2025-10-03 at 02.53.11 (1).jpeg',
    'WhatsApp Image 2025-10-03 at 02.53.11.jpeg',
    'WhatsApp Image 2025-10-03 at 02.53.12.jpeg',
  ];

  const childNames = [
    'Arshi','Shreya','Tanmay','Aarav','Anaya','Ishaan','Zara','Vihaan','Mira','Kabir',
    'Riya','Ayaan','Sara','Advika','Amaira','Reyansh','Diya','Atharv','Myra','Neil'
  ];

  const randomAge = () => Math.floor(Math.random() * 8) + 6; // 6–13

  const artworks = useMemo(() => {
    return artFileNames.map((file, i) => {
      const name = childNames[Math.floor(Math.random() * childNames.length)];
      const age = randomAge();
      const src = encodeURI(`/art/${file}`);
      return {
        src,
        caption: `${name}, ${age} Years Old`,
        title: `Artwork ${i + 1}`,
        description: 'Student illustration inspired by the space weather.',
      };
    });
  }, []);

  const [likes, setLikes] = useState<number[]>(artworks.map(() => 0));
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const likeArtwork = (index: number) => {
    setLikes((prev) => prev.map((v, i) => (i === index ? v + 1 : v)));
  };

  const mostLovedIndex = likes.indexOf(Math.max(...likes));

  const handleScroll = (direction: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction * 400, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900 via-indigo-900 to-black opacity-90"></div>
      {/* Floating decorative dots */}
      <div className="absolute top-24 left-10 w-2 h-2 bg-stellar-gold rounded-full animate-pulse opacity-70"></div>
      <div className="absolute top-1/3 right-24 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-40"></div>
      <div className="absolute bottom-24 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-50"></div>
      <div className="absolute bottom-16 right-1/3 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-30"></div>

      <div className="relative px-4 py-16">
        {/* Header */}
        <div className="text-center mb-10 animate-fadeInUp">
          <h1 className="text-4xl lg:text-5xl font-extrabold gradient-text tracking-tight animate-glow">
            Last Month's Art Challenge Selections
          </h1>
          <p className="mt-4 text-lg lg:text-xl text-blue-200">
            Draw your thought about how a coronal mass ejection looks like
          </p>
          {mostLovedIndex >= 0 && (
            <div className="mt-3 text-sm text-stellar-gold">
              Most Loved: {artworks[mostLovedIndex].caption} ({likes[mostLovedIndex]})
            </div>
          )}
        </div>

        {/* Artworks Row - Horizontal Scroll */}
        <div className="max-w-6xl mx-auto relative">
          <button
            aria-label="Scroll left"
            onClick={() => handleScroll(-1)}
            className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full bg-black/40 text-white border border-white/20 hover:bg-black/60"
          >
            ◀
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => handleScroll(1)}
            className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 px-3 py-2 rounded-full bg-black/40 text-white border border-white/20 hover:bg-black/60"
          >
            ▶
          </button>

          <div ref={scrollRef} className="overflow-x-auto pb-4">
            <div className="flex space-x-6 px-1 snap-x snap-mandatory">
              {artworks.map((art, idx) => (
                <div key={idx} className="flex-shrink-0 w-[85vw] md:w-[420px] snap-center flex flex-col items-center">
                  <div
                    className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white border-opacity-20 bg-black bg-opacity-40"
                    onClick={() => setSelectedIndex(idx)}
                  >
                    <img
                      src={art.src}
                      alt={art.caption}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="px-3 py-1 rounded-full bg-black/50 text-white text-sm backdrop-blur-md">
                        Tap to view details
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          likeArtwork(idx);
                        }}
                        className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-stellar-gold to-orange-500 text-black font-bold shadow-md hover:from-orange-500 hover:to-stellar-gold"
                      >
                        <Heart className="w-4 h-4" />
                        <span>{likes[idx]}</span>
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="text-white text-lg font-semibold tracking-wide">
                      {art.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for enlarged view */}
        {selectedIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="relative max-w-4xl w-[92%] lg:w-[70%] rounded-2xl overflow-hidden bg-black/60 border border-white/20">
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="grid md:grid-cols-2 gap-0 items-stretch">
                <div className="relative">
                  <img
                    src={artworks[selectedIndex].src}
                    alt={artworks[selectedIndex].caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {artworks[selectedIndex].title}
                  </h3>
                  <p className="text-blue-200 text-sm leading-relaxed mb-4">
                    {artworks[selectedIndex].description}
                  </p>
                  <div className="text-stellar-gold font-semibold">
                    Artist: {artworks[selectedIndex].caption}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtChallengePage;