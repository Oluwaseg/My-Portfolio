'use client';

import Lenis from '@studio-freight/lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type React from 'react';
import { createContext, useContext, useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });

    type LenisOptions = {
      duration?: number;
      easing?: (t: number) => number;
      direction?: string;
      gestureDirection?: string;
      smooth?: boolean;
      mouseMultiplier?: number;
      touchMultiplier?: number;
      infinite?: boolean;
    };

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    } as LenisOptions);

    lenisRef.current = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      AOS.refresh();
    });

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    const handleResize = () => {
      ScrollTrigger.refresh();
      AOS.refresh();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
