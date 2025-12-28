'use client';

import { Logo } from '@/assets';
import { Button } from '@/components/ui/button';
import { useRoleContent } from '@/hooks/useRoleContent';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Download } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

type SectionId = 'hero' | 'about' | 'experience' | 'projects' | 'contact';

const sections: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const { content, roleKey } = useRoleContent();
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const resumeHref =
    roleKey === 'frontend'
      ? '/resumes/frontend-resume.pdf'
      : roleKey === 'backend'
      ? '/resumes/backend-resume.pdf'
      : '/resumes/fullstack-resume.pdf';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 150;
      const allSections: SectionId[] = ['hero', ...sections.map((s) => s.id)];

      for (let i = allSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(allSections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(allSections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((id: SectionId) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeHref;
    link.download = `${content.resumeText}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Main Navbar */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isScrolled
            ? 'py-3 bg-background/60 backdrop-blur-xl border-b border-border/50'
            : 'py-5 bg-transparent'
        )}
      >
        <nav className='container mx-auto max-w-6xl px-6'>
          <div className='flex items-center justify-between'>
            {/* Logo & Name */}
            <a className='group flex items-center gap-3 animate-nav-slide-in'>
              <div className='relative'>
                <div className='w-10 h-10 rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-105'>
                  <Image
                    src={Logo}
                    alt='Logo'
                    width={40}
                    height={40}
                    className='object-cover'
                    unoptimized
                  />
                </div>
                {/* Glow effect on hover */}
                <div className='absolute inset-0 rounded-lg bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10' />
              </div>
              <div className='hidden sm:block'>
                <p className='text-sm font-semibold text-foreground tracking-tight leading-none'>
                  SOSTECH
                </p>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  {content.roleBadge}
                </p>
              </div>
            </a>

            {/* Desktop Navigation - Centered */}
            <div
              className='hidden lg:flex items-center gap-1 animate-nav-slide-in'
              style={{ animationDelay: '100ms' }}
            >
              {sections.map((section, index) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section.id);
                  }}
                  onMouseEnter={() => setHoveredLink(section.id)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg',
                    activeSection === section.id
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                  style={{ animationDelay: `${(index + 1) * 50}ms` }}
                >
                  <span className='relative z-10'>{section.label}</span>

                  {/* Active indicator line */}
                  <span
                    className={cn(
                      'absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300',
                      activeSection === section.id ? 'w-4' : 'w-0'
                    )}
                  />

                  {/* Hover background */}
                  <span
                    className={cn(
                      'absolute inset-0 rounded-lg bg-secondary/50 transition-all duration-300',
                      hoveredLink === section.id && activeSection !== section.id
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-95'
                    )}
                  />
                </a>
              ))}
            </div>

            {/* Right Section - Resume Button */}
            <div
              className='flex items-center gap-3 animate-nav-slide-in'
              style={{ animationDelay: '200ms' }}
            >
              <Button
                variant='ghost'
                size='sm'
                onClick={handleDownload}
                className='hidden md:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 group'
              >
                <Download className='w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5' />
                <span>{content.resumeText}</span>
                <ArrowUpRight className='w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300' />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='lg:hidden w-10 h-10 rounded-lg hover:bg-secondary/50 transition-all duration-300'
                aria-label='Toggle menu'
              >
                <div className='relative w-5 h-5'>
                  <span
                    className={cn(
                      'absolute left-0 w-5 h-0.5 bg-foreground rounded-full transition-all duration-300',
                      isMobileMenuOpen
                        ? 'top-[9px] rotate-45'
                        : 'top-1 rotate-0'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 top-[9px] w-5 h-0.5 bg-foreground rounded-full transition-all duration-300',
                      isMobileMenuOpen
                        ? 'opacity-0 scale-0'
                        : 'opacity-100 scale-100'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute left-0 w-5 h-0.5 bg-foreground rounded-full transition-all duration-300',
                      isMobileMenuOpen
                        ? 'top-[9px] -rotate-45'
                        : 'top-[17px] rotate-0'
                    )}
                  />
                </div>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 lg:hidden transition-all duration-500',
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            'absolute inset-0 bg-background/80 backdrop-blur-xl transition-opacity duration-500',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={cn(
            'absolute top-0 right-0 h-full w-full max-w-sm bg-background border-l border-border/50 transition-transform duration-500 ease-out',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className='flex flex-col h-full pt-24 px-8 pb-8'>
            {/* Navigation Links */}
            <nav className='flex-1'>
              <div className='space-y-2'>
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section.id);
                    }}
                    className={cn(
                      'group flex items-center justify-between py-4 px-4 rounded-xl transition-all duration-300',
                      activeSection === section.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
                      isMobileMenuOpen ? 'animate-menu-slide' : ''
                    )}
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span className='text-lg font-medium'>{section.label}</span>
                    <ArrowUpRight
                      className={cn(
                        'w-4 h-4 transition-all duration-300',
                        activeSection === section.id
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0'
                      )}
                    />
                  </a>
                ))}
              </div>
            </nav>

            {/* Bottom Section */}
            <div
              className={cn(
                'pt-6 border-t border-border/50',
                isMobileMenuOpen ? 'animate-menu-slide' : ''
              )}
              style={{ animationDelay: '350ms' }}
            >
              <Button
                onClick={handleDownload}
                className='w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-medium transition-all duration-300 group'
              >
                <Download className='w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-y-0.5' />
                Download {content.resumeText}
              </Button>

              {/* Contact Info */}
              <div className='mt-6 text-center'>
                <p className='text-xs text-muted-foreground'>
                  Available for new opportunities
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div className='fixed top-0 left-0 right-0 h-0.5 z-[60]'>
        <div
          className='h-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-150'
          style={{
            width: `${
              typeof window !== 'undefined'
                ? (window.scrollY /
                    (document.documentElement.scrollHeight -
                      window.innerHeight)) *
                  100
                : 0
            }%`,
          }}
        />
      </div>
    </>
  );
}
