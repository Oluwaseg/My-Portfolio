'use client';

import { hero_left_img, hero_right_img } from '@/assets/index';
import { useLenis } from '@/components/SmoothScrollProvider';
import { Button } from '@/components/ui/button';
import type { roleContent, RoleKey } from '@/config/roleContent';
import { AnimatedSubtitle } from '@/hooks/animated-subtitle';
import { AutoTypingText } from '@/hooks/auto-typing-text';
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface HeroSectionProps {
  content: (typeof roleContent)[RoleKey];
}

export function HeroSection({ content }: HeroSectionProps) {
  const lenis = useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const scrollToSection = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.5 });
    }
  };

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/oluwaseg',
      label: 'GitHub',
      username: '@oluwaseg',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/samuel-oluwasegun-39ab37253',
      label: 'LinkedIn',
      username: 'Samuel Oluwasegun',
    },
    {
      icon: Mail,
      href: 'mailto:oluwasegunsam56@gmail.com',
      label: 'Email',
      username: 'oluwasegunsam56@gmail.com',
    },
    {
      icon: Phone,
      href: 'tel:+2349048095407',
      label: 'Phone',
      username: '+234 904 809 5407',
    },
  ];

  return (
    <>
      <section
        id='hero'
        ref={heroRef}
        className='relative min-h-screen mt-0 lg:mt-9 w-full flex items-center overflow-hidden'
      >
        {/* Hero Background SVGs - Your original images */}
        <Image
          src={hero_left_img || '/placeholder.svg'}
          alt='Left Hero Background'
          className='absolute left-0 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none hidden lg:block'
          width={450}
          height={287}
          priority
        />
        <Image
          src={hero_right_img || '/placeholder.svg'}
          alt='Right Hero Background'
          className='absolute right-0 top-1/2 -translate-y-1/2 opacity-50 pointer-events-none hidden lg:block'
          width={450}
          height={287}
          priority
        />

        {/* Animated gradient background that follows mouse */}
        <div
          className='absolute inset-0 opacity-30 transition-opacity duration-700'
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.15), transparent 50%)`,
          }}
        />

        {/* Subtle grid */}
        <div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:72px_72px]' />

        {/* Main Content */}
        <div className='relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-0'>
          <div className='flex flex-col items-center text-center space-y-8'>
            {/* Availability Badge */}
            <div
              className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 backdrop-blur-sm transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-4'
              }`}
            >
              <span className='relative flex h-2.5 w-2.5'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
                <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500' />
              </span>
              <span className='text-sm font-medium text-emerald-400'>
                Open to new opportunities
              </span>
            </div>

            {/* Main Heading */}
            <div
              className={`space-y-4 transition-all duration-700 delay-150 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <p className='text-lg sm:text-xl text-muted-foreground font-medium'>
                Hello, I&apos;m
              </p>
              <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight'>
                <span className='bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent'>
                  Samuel
                </span>{' '}
                <span className='bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent'>
                  Oluwasegun
                </span>
              </h1>
            </div>

            {/* Dynamic Role with AutoTypingText */}
            <div
              className={`transition-all duration-700 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className='inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm'>
                <span className='text-xl sm:text-2xl font-semibold text-primary'>
                  <AutoTypingText roles={content.autoTypingRoles} />
                </span>
                <span className='w-0.5 h-6 bg-primary animate-pulse' />
              </div>
            </div>

            {/* Animated Subtitle */}
            <div
              className={`max-w-2xl transition-all duration-700 delay-450 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <AnimatedSubtitle
                text={content.heroSubtitle}
                className='text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty'
                delay={1500}
              />
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-4 pt-4 transition-all duration-700 delay-600 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <Button
                size='lg'
                className='group relative bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-xl font-medium text-base overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/25'
                onClick={() => scrollToSection('projects')}
              >
                <span className='relative z-10 flex items-center gap-2'>
                  Explore My Work
                  <ArrowDown className='w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300' />
                </span>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700' />
              </Button>

              <Button
                size='lg'
                variant='outline'
                className='group border-border/50 hover:border-primary/50 bg-background/30 backdrop-blur-sm hover:bg-primary/5 px-8 py-6 rounded-xl font-medium text-base transition-all duration-300'
                onClick={() => setIsModalOpen(true)}
              >
                <span className='flex items-center gap-2'>
                  Get In Touch
                  <ArrowUpRight className='w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300' />
                </span>
              </Button>
            </div>

            {/* Quick Social Links */}
            <div
              className={`flex items-center gap-2 pt-8 transition-all duration-700 delay-750 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group p-3 rounded-full border border-border/30 bg-card/20 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/10 transition-all duration-300'
                  aria-label={label}
                >
                  <Icon className='w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300' />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-background/80 backdrop-blur-sm'
            onClick={() => setIsModalOpen(false)}
          />

          <div className='relative w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors duration-200'
              aria-label='Close modal'
            >
              <X className='h-4 w-4' />
            </button>

            <div className='text-center mb-6'>
              <h3 className='text-xl font-semibold mb-1'>Let&apos;s Connect</h3>
              <p className='text-sm text-muted-foreground'>
                Choose how you&apos;d like to reach out
              </p>
            </div>

            <div className='space-y-3'>
              {socialLinks.map(({ icon: Icon, href, label, username }) => (
                <a
                  key={label}
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300'
                >
                  <div className='p-2 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300'>
                    <Icon className='w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <div className='font-medium text-sm'>{label}</div>
                    <div className='text-xs text-muted-foreground truncate'>
                      {username}
                    </div>
                  </div>
                  <ArrowUpRight className='w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
