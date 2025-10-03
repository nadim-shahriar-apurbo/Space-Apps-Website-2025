import React, { useEffect, useState, useMemo, useCallback } from 'react';

// Define proper types for better type safety
interface Star {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly delay: number;
  readonly size: number;
  readonly opacity: number;
}

interface StarFieldProps {
  starCount?: number;
  className?: string;
}

const StarField: React.FC<StarFieldProps> = ({ 
  starCount = 100, 
  className = "stars z-15" 
}) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  // Memoize star generation function for better performance
  const generateStars = useCallback((count: number): Star[] => {
    try {
      const newStars: Star[] = [];
      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 3,
          size: Math.random() * 2 + 1, // Random size between 1-3px
          opacity: Math.random() * 0.7 + 0.3, // Random opacity between 0.3-1
        });
      }
      return newStars;
    } catch (error) {
      console.warn('Error generating stars:', error);
      return [];
    }
  }, []);

  // Generate stars only once on mount
  useEffect(() => {
    const generatedStars = generateStars(starCount);
    setStars(generatedStars);
  }, [generateStars, starCount]);

  // Handle visibility for performance optimization
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Memoize star elements to prevent unnecessary re-renders
  const starElements = useMemo(() => {
    if (!isVisible || stars.length === 0) return null;

    return stars.map((star) => (
      <div
        key={star.id}
        className="star"
        style={{
          left: `${star.x}%`,
          top: `${star.y}%`,
          animationDelay: `${star.delay}s`,
          width: `${star.size}px`,
          height: `${star.size}px`,
          opacity: star.opacity,
        }}
        aria-hidden="true"
      />
    ));
  }, [stars, isVisible]);

  // Error boundary fallback
  if (stars.length === 0) {
    return (
      <div 
        className={className}
        aria-label="Starfield background"
        role="img"
      >
        {/* Fallback: Simple CSS-only stars */}
        <div className="star" style={{ left: '10%', top: '20%' }} aria-hidden="true" />
        <div className="star" style={{ left: '80%', top: '30%' }} aria-hidden="true" />
        <div className="star" style={{ left: '60%', top: '70%' }} aria-hidden="true" />
        <div className="star" style={{ left: '30%', top: '80%' }} aria-hidden="true" />
        <div className="star" style={{ left: '90%', top: '10%' }} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div 
      className={className}
      aria-label="Animated starfield background"
      role="img"
    >
      {starElements}
    </div>
  );
};

export default StarField;