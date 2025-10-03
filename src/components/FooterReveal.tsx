import React, { useEffect, useRef, useState } from 'react';

interface FooterRevealProps {
  imageSrc?: string;
  text?: string;
  threshold?: number; // px from bottom to trigger (nearBottom mode)
  mode?: 'auto' | 'onScroll' | 'nearBottom' | 'onScrollUp' | 'onScrollDown' | 'manual'; // when to reveal
  scrollThreshold?: number; // px scrolled from top to trigger (onScroll mode)
}

const FooterReveal: React.FC<FooterRevealProps> = ({
  imageSrc = '/auroraslider.jpg',
  text = 'May no child ever weep for a parent lost to the storms of space.',
  threshold = 200,
  mode = 'auto',
  scrollThreshold = 10,
}) => {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasTypedOnce, setHasTypedOnce] = useState(false);
  const typingTimerRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(0);

  useEffect(() => {
    // Manual mode: no scroll listeners; visibility controlled by buttons
    if (mode === 'manual') {
      setVisible(false);
      return;
    }

    const onScroll = () => {
      if (mode === 'nearBottom') {
        const scrollBottom = window.innerHeight + window.scrollY;
        const docHeight = document.body.offsetHeight;
        const nearBottom = scrollBottom >= docHeight - threshold;
        setVisible(nearBottom);
        lastScrollYRef.current = window.scrollY;
        return;
      }

      if (mode === 'onScrollUp') {
        const currentY = window.scrollY;
        const goingUp = currentY < lastScrollYRef.current;
        // reveal only when user scrolls up, hide when scrolling down
        setVisible(goingUp && currentY > 0);
        lastScrollYRef.current = currentY;
        return;
      }

      if (mode === 'onScrollDown') {
        const currentY = window.scrollY;
        const goingDown = currentY > lastScrollYRef.current;
        // reveal only when user scrolls down, hide when scrolling up
        setVisible(goingDown && currentY > 0);
        lastScrollYRef.current = currentY;
        return;
      }

      if (mode === 'onScroll') {
        // reveal after small scroll from top
        const scrolledEnough = window.scrollY >= scrollThreshold;
        setVisible(scrolledEnough);
        lastScrollYRef.current = window.scrollY;
        return;
      }

      // auto: reveal on any meaningful scroll direction or near-bottom
      const currentY = window.scrollY;
      const goingUp = currentY < lastScrollYRef.current;
      const scrolledEnough = currentY >= scrollThreshold;
      const scrollBottom = window.innerHeight + currentY;
      const docHeight = document.body.offsetHeight;
      const nearBottom = scrollBottom >= docHeight - threshold;
      setVisible((goingUp && currentY > 0) || scrolledEnough || nearBottom);
      lastScrollYRef.current = currentY;
    };

    // initial state: hidden until user scrolls
    setVisible(false);
    lastScrollYRef.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    // Evaluate once on mount in case the page isn’t scrollable
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold, mode, scrollThreshold]);

  // Typewriter effect whenever footer becomes visible
  useEffect(() => {
    // Reset when hidden so it types again next time
    if (!visible) {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      setTypedText('');
      setIsTyping(false);
      setHasTypedOnce(false);
      return;
    }

    if (visible && !isTyping) {
      setTypedText('');
      setIsTyping(true);
      let i = 0;
      const speed = 30; // ms per character
      typingTimerRef.current = window.setInterval(() => {
        setTypedText((prev) => prev + (text[i] ?? ''));
        i += 1;
        if (i >= text.length) {
          if (typingTimerRef.current) {
            window.clearInterval(typingTimerRef.current);
            typingTimerRef.current = null;
          }
          setIsTyping(false);
          setHasTypedOnce(true);
        }
      }, speed);
    }

    return () => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [visible, text]);

  return (
    <>
      {/* Floating controls to show/hide footer (always visible) */}
      <div className="fixed bottom-24 right-4 z-50 flex flex-col space-y-2">
        <button
          onClick={() => setVisible(true)}
          className="w-10 h-10 rounded-full bg-black bg-opacity-70 text-white hover:bg-opacity-90 shadow-md flex items-center justify-center"
          aria-label="Show footer"
          title="Show footer"
        >
          ▲
        </button>
        {/* Vertical label between buttons */}
        <span
          className="h-16 px-1 text-white text-xs font-medium flex items-center justify-center"
          style={{ writingMode: 'vertical-rl', textOrientation: 'upright' }}
          aria-hidden="true"
        >
          Footer
        </span>
        <button
          onClick={() => setVisible(false)}
          className="w-10 h-10 rounded-full bg-black bg-opacity-70 text-white hover:bg-opacity-90 shadow-md flex items-center justify-center"
          aria-label="Hide footer"
          title="Hide footer"
        >
          ▼
        </button>
      </div>

      <div
      aria-hidden={!visible}
      className={`fixed left-0 right-0 bottom-0 z-40 transition-all duration-1000 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Top black bar: only project name requested */}
      <div className="bg-black text-gray-300 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="text-center">
            <span className="text-sm sm:text-base md:text-lg text-white">
              Stellar X - A Child's Journey to Discover Space Weather
            </span>
          </div>
        </div>
      </div>

      {/* Large green banner with the requested sentence */}
      <div className="relative w-full h-36 sm:h-48 md:h-64 bg-[#2AF87A] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-center px-4 max-w-5xl">
            May no child ever weep for a parent lost to the storms of space
          </span>
        </div>
      </div>
      </div>
    </>
  );
};

export default FooterReveal;