'use client';

import { useLenis } from '@/components/smooth-scroll-provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Download, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, forwardRef } from 'react';

type SectionId = 'hero' | 'about' | 'experience' | 'projects' | 'contact';

export const Navbar = forwardRef<HTMLElement, React.HTMLProps<HTMLElement>>(function Navbar(props, ref) {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const lenis = useLenis();
  const navRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const scrollToSection = (id: SectionId) => {
    setIsMobileMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.5 });
    }
  };

  return (
    <>
      <nav
        ref={ref || navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out',
          isScrolled
            ? 'bg-background/80 backdrop-blur-2xl shadow-2xl border-b border-border/20'
            : 'bg-transparent backdrop-blur-sm'
        )}
      >
        <div className='container mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='flex items-center justify-between h-20'>
            {/* Logo */}
            <Link
              href='#hero'
              className='group relative flex items-center space-x-3'
              onClick={() => scrollToSection('hero')}
            >
              <div className='relative'>
                <div className='w-10 h-10 bg-gradient-to-br from-primary via-green-500 to-orange-500 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3'>
                  SO
                </div>
                <div className='absolute inset-0 bg-gradient-to-br from-primary via-green-500 to-orange-500 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300' />
              </div>
              <div className='hidden sm:block'>
                <div className='text-xl font-black bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-500 transition-all duration-300'>
                  Samuel Oluwasegun
                </div>
                <div className='text-xs text-muted-foreground font-medium tracking-wider uppercase'>
                  Full Stack Developer
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className='hidden lg:flex items-center'>
              <div className='flex items-center space-x-1 bg-background/50 backdrop-blur-sm rounded-2xl p-2 border border-border/30'>
                {sections.map((section) => (
                  <Button
                    key={section.id}
                    variant='ghost'
                    className={cn(
                      'relative text-sm font-medium transition-all duration-300 px-4 py-2 rounded-xl group',
                      activeSection === section.id
                        ? 'text-primary bg-primary/10 shadow-lg shadow-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    )}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <span className='relative z-10 flex items-center space-x-2'>
                      <span className='text-xs opacity-60'>
                        {section.number}
                      </span>
                      <span>{section.name}</span>
                    </span>
                    {activeSection === section.id && (
                      <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-green-500/5 to-orange-500/5 rounded-xl' />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className='flex items-center space-x-3'>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className='rounded-xl hover:bg-accent/50 transition-all duration-300 hover:scale-110'
              >
                {mounted ? (
                  theme === 'dark' ? (
                    <Sun className='h-5 w-5' />
                  ) : (
                    <Moon className='h-5 w-5' />
                  )
                ) : null}
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='hidden md:flex items-center gap-2 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/50 transition-all duration-300 rounded-xl px-4 py-2 group'
              >
                <Download className='h-4 w-4 group-hover:scale-110 transition-transform duration-300' />
                <span>Resume</span>
                <ArrowUpRight className='h-3 w-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300' />
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='lg:hidden rounded-xl'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className='h-6 w-6' />
                ) : (
                  <Menu className='h-6 w-6' />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed top-20 left-0 right-0 z-40 lg:hidden transition-transform duration-500 ease-in-out',
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full',
          'h-[calc(100vh-80px)] overflow-y-auto bg-background/95 backdrop-blur-2xl p-8' // Combined styles
        )}
      >
        <div className='space-y-2'>
          {sections.map((section) => (
            <Button
              key={section.id}
              variant='ghost'
              className={cn(
                'w-full justify-start text-lg font-medium py-6 rounded-2xl transition-all duration-300 group',
                activeSection === section.id
                  ? 'text-primary bg-gradient-to-r from-primary/10 to-green-500/10 shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              )}
              onClick={() => scrollToSection(section.id)}
            >
              <span className='flex items-center space-x-4'>
                <span className='text-sm opacity-60 font-mono'>
                  {section.number}
                </span>
                <span>{section.name}</span>
              </span>
            </Button>
          ))}
        </div>
        <div className='mt-8 pt-8 border-t border-border/50'>
          <Button className='w-full bg-gradient-to-r from-primary to-green-600 text-white rounded-2xl py-6 text-lg font-medium group'>
            <Download className='mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300' />
            Download Resume
            <ArrowUpRight className='ml-2 h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300' />
          </Button>
        </div>
      </div>
    </>
  );
});
