'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 z-40 p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 animate-fade-in'
          aria-label='Scroll to top'
        >
          <ArrowUp className='w-5 h-5' />
        </button>
      )}
    </>
  );
}
