import React from 'react';

interface PageNavControlsProps {
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  nextLabel?: string;
  prevLabel?: string;
}

const PageNavControls: React.FC<PageNavControlsProps> = ({
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false, 
  nextLabel = 'Next',
  prevLabel = 'Previous',
}) => {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-30 px-6 flex justify-between pointer-events-none">
      <button
        onClick={onPrev}
        disabled={disablePrev}
        className={`pointer-events-auto bg-black bg-opacity-70 hover:bg-opacity-90 text-white px-5 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm border border-white border-opacity-20 hover:border-opacity-40 ${
          disablePrev ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        {prevLabel}
      </button>

      <button
        onClick={onNext}
        disabled={disableNext}
        className={`pointer-events-auto bg-stellar-gold bg-opacity-80 hover:bg-opacity-100 text-black px-5 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 backdrop-blur-sm font-semibold ${
          disableNext ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {nextLabel}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </div>
  );
};

export default PageNavControls;