import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, SkipForward, Heart, Sparkles, X } from 'lucide-react';

interface LandingPageProps {
  onNext: () => void;
  onSkipToElements: () => void;
  registerOpenModal?: (openModal: () => void) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext, onSkipToElements, registerOpenModal }) => {
  const [currentText, setCurrentText] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalButton, setShowModalButton] = useState(true);
  const [modalMessage, setModalMessage] = useState('');
  const [isRedirecting, setIsRedirecting] = useState(false);

  const storyTexts = [
    "My father was a fisherman. One day, he went fishing in the deep ocean.",
    "But something strange happened—he never came back. His GPS stopped working, and he lost his path in the vast sea.",
    "For years, I wondered why this happened. Later, I discovered the truth: it was caused by  Space Weather.",
    "A powerful space storm disrupted his navigation system.",
    "I realized many lives—fishermen, farmers, pilots, even power operators—can be affected by space weather.",
    "I decided to create this website to help people understand and prepare."
  ];

  // Images to show for each story step (popup panel on the right)
  const storyImages: string[][] = [
    ["/Img/img-10.png", "/Img/img-8.png"],
    ["/Img/img-8.png", "/Img/img-7.png"],
    ["/Img/img-9.png", "/img-7.png"],
    ["/Img/img-10.png", "/Img/img-8.png"],
    ["/Img/img-10.png", "/Img/img-9.png"],
    ["/Img/img-9.png", "/Img/img-10.png"],
  ];

  useEffect(() => {

    const timer = setTimeout(() => {
      if (currentText < storyTexts.length - 1) {
        setCurrentText(currentText + 1);
      } else {
        setShowButton(true);
      }
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentText, storyTexts.length]);

  // Expose a callback to open the Yes/No modal so parent controls can trigger it
  useEffect(() => {
    if (registerOpenModal) {
      registerOpenModal(() => setShowModal(true));
    }
  }, [registerOpenModal]);

  const handlePrevious = () => {
    setCurrentText((prev) => {
      const nextIndex = Math.max(prev - 1, 0);
      if (nextIndex < storyTexts.length - 1) {
        setShowButton(false);
      }
      return nextIndex;
    });
  };

  const handleNext = () => {
    setCurrentText((prev) => {
      const nextIndex = Math.min(prev + 1, storyTexts.length - 1);
      if (nextIndex === storyTexts.length - 1) {
        setShowButton(true);
      }
      return nextIndex;
    });
  };

  const handleSkip = () => {
    setShowModal(true);
  };

  const handleModalResponse = (knowsSolarWeather: boolean) => {
    if (knowsSolarWeather) {
      setModalMessage("Wow! Let's know more");
    } else {
      setModalMessage("Okay, no problem! Let's learn about  Space Weather");
    }

    setIsRedirecting(true);
    
    setTimeout(() => {
      setShowModal(false);
      onSkipToElements();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Character Section */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glowing background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            
            {/* Character Portrait */}
            <div className="relative anime-character animate-float">
              <div className="w-80 h-80 rounded-full relative overflow-hidden border-4 border-stellar-gold shadow-2xl">
                <img 
                  src="/Girl Portrait.png" 
                  alt="Character Portrait" 
                  className="w-full h-full object-cover"
                />
                {/* Overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold gradient-text animate-fade-in">
              Stellar X
            </h1>
            <p className="text-xl text-blue-200 animate-fade-in">
              A Child's Journey to Discover Space Weather
            </p>
          </div>

          {/* Story Text with popup images for every story step (non-overlapping layout) */}
          <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-6 md:p-8 min-h-[200px] flex items-center justify-between">
            <p className="text-lg lg:text-xl text-white leading-relaxed animate-slide-up text-shadow flex-1 mr-4">
              {storyTexts[currentText]}
            </p>
            {storyImages[currentText] && storyImages[currentText].length > 0 && (
              <div className="hidden sm:flex bg-black/70 border border-stellar-gold/40 rounded-2xl p-3 shadow-xl space-x-3">
                {storyImages[currentText].map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`Story Photo ${idx + 1}`}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-cover rounded-xl"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="flex space-x-2 justify-center lg:justify-start">
            {storyTexts.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index <= currentText ? 'bg-stellar-gold w-8' : 'bg-gray-600 w-2'
                }`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentText === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 ${
                currentText === 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleSkip}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-400 hover:to-gray-200 text-black font-bold transition-all duration-300 transform hover:scale-105"
            >
              <span>Skip</span>
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold transition-all duration-300 transform hover:scale-105"
            >
              <span>{currentText === storyTexts.length - 1 ? 'Finish' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Next Button */}
          {showButton && (
            <div className="animate-fade-in space-y-4">
              {/* <button
                onClick={onNext}
                className="group bg-gradient-to-r from-stellar-gold to-orange-500 hover:from-orange-500 hover:to-stellar-gold text-black font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 animate-glow flex items-center space-x-2 mx-auto lg:mx-0"
              >
                <Heart className="w-5 h-5" /> */}
                {/* <span>Learn About Space Weather Elements</span> */}
                {/* <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button> */}

              {showModalButton && (
                <button
                  onClick={() => setShowModal(true)}
                  className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto lg:mx-0"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Learn About Space Weather Elements</span>
                  <Sparkles className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fade-in">
          <div className="bg-black bg-opacity-90 backdrop-blur-sm rounded-2xl max-w-md w-full animate-slide-up border border-stellar-gold border-opacity-30">
            <div className="p-8 text-center">
              {/* Back inside modal */}
              {!isRedirecting && (
                <div className="absolute top-4 left-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                  </button>
                </div>
              )}
              {!isRedirecting ? (
                <>
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-stellar-gold to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      Quick Question!
                    </h3>
                    <p className="text-lg text-blue-200">
                      Do you know about  Space Weather?
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleModalResponse(true)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleModalResponse(false)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      No
                    </button>
                  </div>
                </>
              ) : (
                <div className="animate-fade-in">
                  <div className="w-16 h-16 bg-gradient-to-r from-stellar-gold to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Sparkles className="w-8 h-8 text-black" />
                  </div>
                  <p className="text-xl text-stellar-gold font-bold mb-4">
                    {modalMessage}
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-blue-200">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-stellar-gold"></div>
                    <span>Redirecting...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;