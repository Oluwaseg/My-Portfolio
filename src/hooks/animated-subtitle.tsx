'use client';

import { useEffect, useState } from 'react';

interface AnimatedSubtitleProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedSubtitle({
  text,
  className = '',
  delay = 0,
}: AnimatedSubtitleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Split text into words while preserving spaces and special elements
  const words = text.split(/(\s+|<[^>]*>)/);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < words.length) {
          setDisplayedText((prev) => prev + words[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        } else {
          setIsComplete(true);
        }
      },
      currentIndex === 0 ? delay : 100 + Math.random() * 50
    ); // Slight randomness for natural feel

    return () => clearTimeout(timer);
  }, [currentIndex, words, delay]);

  return (
    <div className={`${className} ${isComplete ? 'animate-pulse-once' : ''}`}>
      <span
        className='inline-block'
        dangerouslySetInnerHTML={{
          __html:
            displayedText +
            (currentIndex < words.length
              ? '<span class="animate-pulse text-primary">|</span>'
              : ''),
        }}
      />
    </div>
  );
}
