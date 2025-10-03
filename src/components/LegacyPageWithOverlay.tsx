import React, { forwardRef } from 'react';

interface LegacyPageWithOverlayProps {
  isVisible: boolean;
  onNavigate: (page: number) => void;
  currentPage: number;
  isLoading: boolean;
  isTransitioning: boolean;
}

const LegacyPageWithOverlay = forwardRef<HTMLIFrameElement, LegacyPageWithOverlayProps>(
  ({ isVisible, onNavigate, currentPage, isLoading, isTransitioning }, ref) => {
    return (
      <div className={`fixed inset-0 z-20 transition-all duration-700 ease-in-out ${
        isVisible && !isLoading && !isTransitioning 
          ? 'opacity-100 transform translate-y-0 pointer-events-auto' 
          : 'opacity-0 transform translate-y-8 pointer-events-none'
      }`}>
        {/* The iframe itself */}
        <iframe
          ref={ref}
          src="./legacy.html"
          className=" w-full h-full"
          style={{ 
            border: "none",
            visibility: isVisible ? 'visible' : 'hidden'
          }}
          title="Legacy Page"
          loading="lazy"
        />
        
        {/* Overlay controls - only visible when active */}
        {isVisible && !isLoading && !isTransitioning && (
          <>
            {/* Back button */}
            <button
              onClick={() => onNavigate(2)}
              className="fixed bottom-6 left-6 z-30 bg-black bg-opacity-70 hover:bg-opacity-90 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-40" 
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
            
            {/* Continue button */}
            <button
              onClick={() => onNavigate(4)}
              className="fixed bottom-6 right-6 z-30 bg-stellar-gold bg-opacity-80 hover:bg-opacity-100 text-black px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm font-semibold"
            >
            Continue Journey
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

            {/* Navigation dots overlay */}
            {/* <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
              {[0, 1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-500 transform hover:scale-150 ${
                    currentPage === page
                      ? 'bg-stellar-gold scale-125 shadow-lg shadow-stellar-gold/50'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                >
                  {currentPage === page && (
                    <div className="absolute inset-0 rounded-full bg-stellar-gold animate-ping opacity-75"></div>
                  )}
                </button>
              ))}
            </div> */}
            
          </>
        )}
      </div>
    );
  }
);

LegacyPageWithOverlay.displayName = 'LegacyPageWithOverlay';

export default LegacyPageWithOverlay;