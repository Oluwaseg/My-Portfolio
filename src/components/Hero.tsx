'use client';

import { useLenis } from '@/components/SmoothScrollProvider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedSubtitle } from '@/hooks/animated-subtitle';
import { AutoTypingText } from '@/hooks/auto-typing-text';
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
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { roleContent, RoleKey } from '@/config/roleContent';

interface HeroSectionProps {
  content: typeof roleContent[RoleKey];
}

export function HeroSection({ content }: HeroSectionProps) {
  const lenis = useLenis();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isModalOpen])

  const scrollToSection = (id: string) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.5 })
    }
  }

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/oluwaseg",
      label: "GitHub",
      color: "hover:text-gray-400",
      bgColor: "hover:bg-gray-400/10",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/samuel-oluwasegun-39ab37253",
      label: "LinkedIn",
      color: "hover:text-blue-400",
      bgColor: "hover:bg-blue-400/10",
    },
    {
      icon: Mail,
      href: "mailto:oluwasegunsam56@gmail.com",
      label: "Email",
      color: "hover:text-primary",
      bgColor: "hover:bg-primary/10",
    },
    {
      icon: Phone,
      href: "tel:+2349048095407",
      label: "Phone",
      color: "hover:text-orange-400",
      bgColor: "hover:bg-orange-400/10",
    },
  ]

  return (
    <>
    <section
      id='hero'
      ref={heroRef}
      className='relative lg:p-3 min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-background/95'
    >
      {/* Enhanced Background Effects */}
      <div className='absolute inset-0 bg-grid-white/[0.02] bg-grid-16' />

      {/* Dynamic Gradient Overlays */}
      <div
        className='absolute inset-0 opacity-30 transition-all duration-1000 ease-out z-10'
        style={{
          background: `radial-gradient(1000px circle at ${
            50 + mousePosition.x * 20
          }% ${
            50 + mousePosition.y * 20
          }%, rgba(99, 102, 241, 0.1), rgba(59, 130, 246, 0.05) 40%, transparent 70%)`,
        }}
      />

      {/* Floating Elements */}
      <div className='absolute inset-0 z-10'>
        <Sparkles
          className='absolute top-20 left-20 h-6 w-6 text-primary/30 animate-pulse'
          style={{ animationDelay: '0s' }}
        />
        <Zap
          className='absolute top-40 right-32 h-8 w-8 text-blue-500/20 animate-bounce'
          style={{ animationDelay: '1s' }}
        />
        <Sparkles
          className='absolute bottom-32 left-32 h-4 w-4 text-orange-500/40 animate-pulse'
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* Main Content */}
      <div className='relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20'>
        <div className='grid lg:grid-cols-12 gap-12 items-center'>
          {/* Left Column - Main Content */}
          <div className='lg:col-span-8 space-y-8'>
            {/* Enhanced Status Badge */}
            <div
              className={`inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 backdrop-blur-sm border border-green-500/30 text-green-400 text-sm font-medium shadow-lg transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <div className='relative'>
                <div className='w-3 h-3 bg-green-400 rounded-full animate-pulse' />
                <div className='absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75' />
              </div>
              Available for new opportunities
              <Calendar className='h-4 w-4' />
            </div>

            {/* Enhanced Main Title */}
            <div
              ref={titleRef}
              className={`space-y-6 transition-all duration-1000 delay-300 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className='text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight'>
                <span className='block bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent hover:from-primary hover:via-blue-500 hover:to-orange-500 transition-all duration-500'>
                  Hi, I&apos;m
                </span>
                <span className='block bg-gradient-to-r from-primary via-blue-500 to-orange-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-default'>
                  Samuel Oluwasegun
                </span>
              </h1>
              <div className='flex flex-wrap items-center gap-4 text-2xl sm:text-3xl lg:text-4xl font-light text-muted-foreground'>
                <Badge
                  variant='outline'
                  className='text-lg px-6 py-3 bg-gradient-to-r from-primary via-blue-500 to-orange-500 bg-clip-text text-transparent border-primary/30 font-semibold min-w-[300px] justify-center shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105'
                >
                  <AutoTypingText
                    roles={content.autoTypingRoles}
                  />
                </Badge>
              </div>
            </div>

            {/* Enhanced Animated Subtitle */}
            <div
              ref={subtitleRef}
              className={`transition-all duration-1000 delay-500 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              <AnimatedSubtitle
                text={content.heroSubtitle}
                className='text-lg sm:text-xl lg:text-2xl max-w-4xl leading-relaxed text-muted-foreground'
                delay={2000}
              />
            </div>

              {/* Enhanced CTA Buttons */}
              <div
                ref={ctaRef}
                className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Button
                  size="lg"
                  className="group relative bg-gradient-to-r from-primary via-blue-600 to-orange-600 hover:from-primary/90 hover:via-blue-600/90 hover:to-orange-600/90 text-white shadow-2xl text-lg px-10 py-7 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-primary/30 border-0 overflow-hidden"
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      const navbarHeight = 80;
                      const elementPosition = projectsSection.offsetTop - navbarHeight;
                      
                      window.scrollTo({
                        top: elementPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Play className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    View My Work
                    <ArrowDown className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group bg-background/30 backdrop-blur-sm border-border/40 hover:bg-background/50 shadow-xl text-lg px-10 py-7 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-lg"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span className="flex items-center gap-3">
                    Let&apos;s Connect
                    <ExternalLink className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </Button>
              </div>
          </div>

          {/* Enhanced Right Column - Stats & Social */}
          <div className='lg:col-span-4 space-y-8'>
            {/* Enhanced Social Links */}
            <div
              ref={socialRef}
              className={`space-y-6 transition-all duration-1000 delay-900 ${
                isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            >
              <h3 className='text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2'>
                <Sparkles className='h-4 w-4' />
                Connect With Me
              </h3>
              <div className='flex flex-col space-y-4'>
                {[
                  {
                    icon: Github,
                    href: 'https://github.com/oluwaseg',
                    label: 'GitHub',
                    username: 'oluwaseg',
                    color: 'hover:text-gray-400 hover:border-gray-400/30',
                    bg: 'hover:bg-gray-400/5',
                  },
                  {
                    icon: Linkedin,
                    href: 'https://www.linkedin.com/in/samuel-oluwasegun-39ab37253',
                    label: 'LinkedIn',
                    username: '/in/samuel-oluwasegun',
                    color: 'hover:text-blue-400 hover:border-blue-400/30',
                    bg: 'hover:bg-blue-400/5',
                  },
                  {
                    icon: Mail,
                    href: 'mailto:oluwasegunsam56@gmail.com',
                    label: 'Email',
                    username: 'oluwasegunsam56@gmail.com',
                    color: 'hover:text-primary hover:border-primary/30',
                    bg: 'hover:bg-primary/5',
                  },
                  {
                    icon: Phone,
                    href: 'tel:+2349048095407',
                    label: 'Phone',
                    username: '+234 904 809 5407',
                    color: 'hover:text-orange-400 hover:border-orange-400/30',
                    bg: 'hover:bg-orange-400/5',
                  },
                ].map(
                  ({ icon: Icon, href, label, username, color, bg }, index) => (
                    <a
                      key={label}
                      href={href}
                      className={`group flex items-center gap-4 p-5 rounded-2xl bg-background/20 backdrop-blur-sm border border-border/30 text-muted-foreground ${color} ${bg} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                      style={{ animationDelay: `${index * 100}ms` }}
                      aria-label={label}
                    >
                      <div className='relative'>
                        <Icon className='h-6 w-6 group-hover:scale-110 transition-transform duration-300' />
                        <div className='absolute inset-0 h-6 w-6 opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-300 rounded-full bg-current' />
                      </div>
                      <div className='flex-1'>
                        <div className='font-medium'>{label}</div>
                        <div className='text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300'>
                          {username}
                        </div>
                      </div>
                      <ArrowUpRight className='h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300' />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20'>
        <div
          className='flex flex-col items-center space-y-3 animate-bounce cursor-pointer group'
          onClick={() => scrollToSection('about')}
        >
          <div className='w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex justify-center group-hover:border-primary/60 transition-colors duration-300'>
            <div className='w-1 h-3 bg-primary rounded-full mt-2 animate-pulse group-hover:bg-blue-500 transition-colors duration-300' />
          </div>
          <span className='text-xs text-muted-foreground font-medium tracking-wider uppercase group-hover:text-primary transition-colors duration-300'>
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
      {/* Responsive Social Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

          {/* Modal Content */}
          <div className="relative bg-background/95 backdrop-blur-md border border-border/50 rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors duration-200"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Let&apos;s Connect!</h3>
              <p className="text-muted-foreground">Choose your preferred way to reach out</p>
            </div>

            {/* Social Icons Grid */}
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map(({ icon: Icon, href, label, color, bgColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center justify-center p-6 rounded-2xl bg-muted/20 border border-border/30 ${color} ${bgColor} transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                >
                  <Icon className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="text-center mt-6 pt-6 border-t border-border/30">
              <p className="text-xs text-muted-foreground">I&apos;ll get back to you as soon as possible!</p>
            </div>
          </div>
        </div>
      )}
      </>
  );
}
