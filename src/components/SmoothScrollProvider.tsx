'use client';

import Lenis from '@studio-freight/lenis';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { createContext, useContext, useEffect, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });

    const instance = new Lenis({
      lerp: 0.08,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    setLenis(instance);

    instance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      instance.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
