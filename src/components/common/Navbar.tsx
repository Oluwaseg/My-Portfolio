'use client';

import type React from 'react';

import { useLenis } from '@/components/smooth-scroll-provider';
import { Button } from '@/components/ui/button';
import { useRoleContent } from '@/hooks/useRoleContent';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Download, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ModeToggle } from './Switch';

type SectionId = 'hero' | 'about' | 'experience' | 'projects' | 'contact';

export function Navbar() {
  const { content, roleKey } = useRoleContent();
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lenis = useLenis();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(
    null
  ) as React.RefObject<HTMLAnchorElement>;
  const resumeRef = useRef<HTMLButtonElement>(
    null
  ) as React.RefObject<HTMLButtonElement>;
  const themeToggleRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  const sections: { id: SectionId; name: string; number: string }[] = useMemo(
    () => [
      { id: 'hero', name: 'Home', number: '01' },
      { id: 'about', name: 'About', number: '02' },
      { id: 'experience', name: 'Experience', number: '03' },
      { id: 'projects', name: 'Work', number: '04' },
      { id: 'contact', name: 'Contact', number: '05' },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id: SectionId) => {
    setIsMobileMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.5 });
    }
  };

  const getMagneticStyle = (elementRef: React.RefObject<HTMLElement>) => {
    if (!elementRef.current) return {};

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < 100) {
      const strength = (100 - distance) / 100;
      return {
        transform: `translate(${deltaX * strength * 0.1}px, ${
          deltaY * strength * 0.1
        }px)`,
      };
    }
    return {};
  };

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out',
          isScrolled
            ? 'bg-background/80 backdrop-blur-2xl shadow-2xl border-b border-border/20'
            : 'bg-transparent backdrop-blur-sm'
        )}
      >
        <div className='container mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20'>
            <Link
              ref={logoRef}
              href='#hero'
              className='group relative flex items-center space-x-3'
              onClick={() => scrollToSection('hero')}
              style={getMagneticStyle(logoRef)}
            >
              <div className='relative'>
                <div className='relative overflow-hidden rounded-xl'>
                  <Image
                    src={'/logo.png'}
                    alt='logo'
                    width={40}
                    height={60}
                    unoptimized
                    className='transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3'
                  />
                </div>
                <div className='absolute inset-0 bg-gradient-to-br from-primary via-blue-500 to-orange-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-500 scale-150' />
              </div>
              <div className='hidden sm:block'>
                <div className='text-xl font-black bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-500 transition-all duration-500'>
                  Samuel Oluwasegun
                </div>
                <div className='text-xs text-muted-foreground font-medium tracking-wider uppercase group-hover:text-primary/70 transition-colors duration-300'>
                  {content.roleBadge}
                </div>
              </div>
            </Link>

            <div className='hidden lg:flex items-center'>
              <div className='flex items-center space-x-1 bg-background/50 backdrop-blur-sm rounded-2xl p-2 border border-border/30 shadow-lg'>
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant='ghost'
                    className={cn(
                      'relative text-sm font-medium transition-all duration-300 px-4 py-2 rounded-xl group overflow-hidden',
                      activeSection === section.id
                        ? 'text-primary bg-primary/10 shadow-lg shadow-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:scale-105'
                    )}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <span className='relative z-10 flex items-center space-x-2'>
                      <span className='text-xs opacity-60 font-mono transition-all duration-300 group-hover:opacity-100'>
                        {section.number}
                      </span>
                      <span className='transition-all duration-300 group-hover:translate-x-0.5'>
                        {section.name}
                      </span>
                    </span>
                    {activeSection === section.id && (
                      <div className='absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-orange-500/10 rounded-xl animate-pulse' />
                    )}
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out' />
                  </Button>
                ))}
              </div>
            </div>

            <div className='flex items-center space-x-3'>
              <div
                ref={themeToggleRef}
                style={getMagneticStyle(themeToggleRef)}
              >
                <ModeToggle />
              </div>
              <Button
                ref={resumeRef}
                variant='outline'
                size='sm'
                className='hidden md:flex items-center gap-2 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/50 transition-all duration-300 rounded-xl px-4 py-2 group hover:scale-105 hover:shadow-lg relative overflow-hidden'
                style={getMagneticStyle(resumeRef)}
                onClick={() => {
                  const link = document.createElement('a');
                  if (roleKey === 'frontend') {
                    link.href = '/resumes/frontend-resume.pdf';
                  } else if (roleKey === 'backend') {
                    link.href = '/resumes/backend-resume.pdf';
                  } else {
                    link.href = '/resumes/fullstack-resume.pdf';
                  }
                  link.download = `${content.resumeText}.pdf`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className='h-4 w-4 group-hover:scale-110 transition-transform duration-300' />
                <span>{content.resumeText}</span>
                <ArrowUpRight className='h-3 w-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300' />
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='lg:hidden rounded-xl hover:scale-110 transition-all duration-300'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className='relative'>
                  <Menu
                    className={cn(
                      'h-6 w-6 transition-all duration-300',
                      isMobileMenuOpen
                        ? 'rotate-90 scale-0'
                        : 'rotate-0 scale-100'
                    )}
                  />
                  <X
                    className={cn(
                      'absolute inset-0 h-6 w-6 transition-all duration-300',
                      isMobileMenuOpen
                        ? 'rotate-0 scale-100'
                        : '-rotate-90 scale-0'
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={cn(
          'fixed top-20 left-0 right-0 z-40 lg:hidden transition-all duration-500 ease-in-out',
          isMobileMenuOpen
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0',
          'h-[calc(100vh-80px)] overflow-y-auto bg-background/95 backdrop-blur-2xl p-8 border-b border-border/20'
        )}
      >
        <div className='space-y-2'>
          {sections.map((section, index) => (
            <Button
              key={section.id}
              variant='ghost'
              className={cn(
                'w-full justify-start text-lg font-medium py-6 rounded-2xl transition-all duration-300 group relative overflow-hidden',
                activeSection === section.id
                  ? 'text-primary bg-gradient-to-r from-primary/10 to-blue-500/10 shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:scale-105'
              )}
              onClick={() => scrollToSection(section.id)}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <span className='flex items-center space-x-4 relative z-10'>
                <span className='text-sm opacity-60 font-mono group-hover:opacity-100 transition-opacity duration-300'>
                  {section.number}
                </span>
                <span className='group-hover:translate-x-1 transition-transform duration-300'>
                  {section.name}
                </span>
              </span>
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out' />
            </Button>
          ))}
        </div>
        <div className='mt-8 pt-8 border-t border-border/50'>
          <Button 
            className='w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white rounded-2xl py-6 text-lg font-medium group relative overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
            onClick={() => {
              // Download role-specific resume
              const link = document.createElement('a');
              if (roleKey === 'frontend') {
                link.href = '/resumes/frontend-resume.pdf';
              } else if (roleKey === 'backend') {
                link.href = '/resumes/backend-resume.pdf';
              } else {
                link.href = '/resumes/fullstack-resume.pdf';
              }
              link.download = `${content.resumeText}.pdf`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <Download className='mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300' />
            Download {content.resumeText}
            <ArrowUpRight className='ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300' />
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out' />
          </Button>
        </div>
      </div>
    </>
  );
}
