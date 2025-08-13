'use client';

import { useLenis } from '@/components/smooth-scroll-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowDown,
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Phone,
  Play,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AutoTypingText } from '../hooks/auto-typing-text';

export function HeroSection() {
  const lenis = useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // useEffect(() => {
  //   const tl = gsap.timeline({ delay: 0.8 });
  //   tl.fromTo(
  //     titleRef.current,
  //     { opacity: 0, y: 120, scale: 0.8, rotateX: 15 },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       scale: 1,
  //       rotateX: 0,
  //       duration: 1.4,
  //       ease: 'power4.out',
  //     }
  //   );
  //   tl.fromTo(
  //     subtitleRef.current,
  //     { opacity: 0, y: 60, filter: 'blur(10px)' },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       filter: 'blur(0px)',
  //       duration: 1.2,
  //       ease: 'power3.out',
  //     },
  //     '-=1'
  //   );
  //   tl.fromTo(
  //     ctaRef.current,
  //     { opacity: 0, y: 40, scale: 0.8 },
  //     { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.4)' },
  //     '-=0.8'
  //   );
  //   tl.fromTo(
  //     [socialRef.current, statsRef.current],
  //     { opacity: 0, y: 30 },
  //     { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.2 },
  //     '-=0.6'
  //   );
  //   return () => tl.kill();
  // }, []);

  const scrollToSection = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.5 });
    }
  };

  return (
    <section
      id='hero'
      ref={heroRef}
      className='relative lg:p-3 min-h-[80vh] w-full flex items-center justify-center overflow-hidden'
    >
      {/* Dynamic Gradient Overlays - Keep the mouse-reactive one */}
      <div
        className='absolute inset-0 opacity-20 transition-all duration-1000 ease-out z-10'
        style={{
          background: `radial-gradient(800px circle at ${
            50 + mousePosition.x * 15
          }% ${
            50 + mousePosition.y * 15
          }%, rgba(99, 102, 241, 0.15), transparent 60%)`,
        }}
      />

      {/* Main Content */}
      <div className='relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20'>
        <div className='grid lg:grid-cols-12 gap-12 items-center'>
          {/* Left Column - Main Content */}
          <div className='lg:col-span-8 space-y-8'>
            {/* Status Badge */}
            <div className='inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 backdrop-blur-sm border border-green-500/20 text-green-400 text-sm font-medium'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse' />
              Available for new opportunities
              <Calendar className='h-4 w-4' />
            </div>

            {/* Main Title */}
            <div ref={titleRef} className='space-y-4'>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight'>
                <span className='block bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent'>
                  Hi, I&apos;m
                </span>
                <span className='block bg-gradient-to-r from-primary via-blue-500 to-orange-500 bg-clip-text text-transparent'>
                  Samuel Oluwasegun
                </span>
              </h1>
              <div className='flex flex-wrap items-center gap-4 text-2xl sm:text-3xl lg:text-4xl font-light text-muted-foreground'>
                <Badge
                  variant='outline'
                  className='text-lg px-4 py-2 bg-gradient-to-r from-primary via-blue-500 to-orange-500 bg-clip-text text-transparent border-primary/20  font-semibold min-w-[280px] justify-center' // Adjusted min-w for full phrase
                >
                  <AutoTypingText
                    roles={[
                      'Full Stack Architect',
                      'Full Stack Developer',
                      'Full Stack Engineer',
                    ]}
                  />
                </Badge>
              </div>
            </div>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className='text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed text-muted-foreground'
            >
              I craft{' '}
              <span className='text-primary font-semibold bg-primary/10 px-2 py-1 rounded-lg'>
                next-generation
              </span>{' '}
              digital experiences that blend cutting-edge technology with
              intuitive design, delivering solutions that don&apos;t just
              work—they{' '}
              <span className='text-blue-500 font-semibold bg-blue-500/10 px-2 py-1 rounded-lg'>
                inspire
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className='flex flex-col sm:flex-row gap-4'>
              <Button
                size='lg'
                className='group relative bg-gradient-to-r from-primary via-blue-600 to-orange-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-orange-600/90 text-white shadow-2xl text-lg px-8 py-6 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-primary/25 border-0 overflow-hidden'
                onClick={() => scrollToSection('projects')}
              >
                <span className='relative z-10 flex items-center gap-3'>
                  <Play className='h-5 w-5 group-hover:scale-110 transition-transform duration-300' />
                  View My Work
                  <ArrowDown className='h-5 w-5 group-hover:translate-y-1 transition-transform duration-300' />
                </span>
                <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </Button>
              <Button
                size='lg'
                variant='outline'
                className='group bg-background/20 backdrop-blur-sm border-border/30 hover:bg-background/40 shadow-xl text-lg px-8 py-6 rounded-2xl transition-all duration-500 hover:scale-105'
                onClick={() => scrollToSection('contact')}
              >
                <span className='flex items-center gap-3'>
                  Let&apos;s Connect
                  <ExternalLink className='h-5 w-5 group-hover:rotate-12 transition-transform duration-300' />
                </span>
              </Button>
            </div>
          </div>
          {/* Right Column - Stats & Social */}
          <div className='lg:col-span-4 space-y-8'>
            {/* Social Links */}
            <div ref={socialRef} className='space-y-4'>
              <h3 className='text-sm font-semibold text-muted-foreground uppercase tracking-wider'>
                Connect With Me
              </h3>
              <div className='flex flex-col space-y-3'>
                {[
                  {
                    icon: Github,
                    href: 'https://github.com/samueloluwasegun',
                    label: 'GitHub',
                    username: 'samueloluwasegun',
                    color: 'hover:text-gray-400',
                  },
                  {
                    icon: Linkedin,
                    href: 'https://linkedin.com/in/samueloluwasegun',
                    label: 'LinkedIn',
                    username: '/in/samueloluwasegun',
                    color: 'hover:text-blue-400',
                  },
                  {
                    icon: Mail,
                    href: 'mailto:samueloluwasegun999@gmail.com',
                    label: 'Email',
                    username: 'samueloluwasegun999@gmail.com',
                    color: 'hover:text-blue-400',
                  },
                  {
                    icon: Phone,
                    href: 'tel:+2349048095407',
                    label: 'Phone',
                    username: '+2349048095407',
                    color: 'hover:text-orange-400',
                  },
                ].map(({ icon: Icon, href, label, username, color }) => (
                  <a
                    key={label}
                    href={href}
                    className={`group flex items-center gap-4 p-4 rounded-2xl bg-background/10 backdrop-blur-sm border border-border/20 text-muted-foreground ${color} hover:bg-background/20 transition-all duration-300 hover:scale-105`}
                    aria-label={label}
                  >
                    <Icon className='h-6 w-6 group-hover:scale-110 transition-transform duration-300' />
                    <div>
                      <div className='font-medium'>{label}</div>
                      <div className='text-sm opacity-70'>{username}</div>
                    </div>
                    <ArrowUpRight className='h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300' />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20'>
        <div className='flex flex-col items-center space-y-3 animate-bounce'>
          <div className='w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center'>
            <div className='w-1 h-3 bg-primary rounded-full mt-2 animate-pulse' />
          </div>
          <span className='text-xs text-muted-foreground font-medium tracking-wider uppercase'>
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  );
}
