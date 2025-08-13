'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const progressBarRef = useRef(null);

  useEffect(() => {
    gsap.to(progressBarRef.current, {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div
      ref={progressBarRef}
      className='fixed top-0 left-0 h-1 bg-blue-500 z-[999] w-0' // High z-index to be on top
    />
  );
}
