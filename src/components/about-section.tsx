'use client';

import { Badge } from '@/components/ui/badge';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code,
  Database,
  GitBranch,
  Lightbulb,
  Server,
  TestTube,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const expertiseAreas = [
  {
    title: 'Frontend Development',
    level: 'Advanced',
    description:
      'React component architecture, Angular SPAs, Next.js SSR/ISR, Tailwind CSS, responsive/accessibility best practices',
    technologies: [
      'React',
      'Angular',
      'Next.js',
      'Tailwind CSS',
      'Shadcn/ui',
      'GSAP',
      'Three.js',
      'Framer Motion',
    ],
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Backend & APIs',
    level: 'Advanced',
    description:
      'Node.js with Express & NestJS, REST and GraphQL endpoints, JWT/OAuth2 auth, validation & security',
    technologies: [
      'Node.js',
      'Express.js',
      'NestJS',
      'REST APIs',
      'GraphQL',
      'JWT',
      'OAuth2',
    ],
    icon: Server,
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Data Management',
    level: 'Proficient',
    description:
      'MySQL/PostgreSQL schema design and optimization, MongoDB modeling, Redis caching strategies',
    technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
    icon: Database,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Testing & Quality',
    level: 'Proficient',
    description:
      'Unit/integration tests (Jest, Supertest), end-to-end workflows (Cypress, Postman), TDD habits',
    technologies: ['Jest', 'Supertest', 'Cypress', 'Postman', 'TDD'],
    icon: TestTube,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'CI/CD & DevOps',
    level: 'Familiar',
    description:
      'Docker containerization, GitHub Actions pipelines, automated builds/tests/deployments, basic monitoring',
    technologies: ['Docker', 'GitHub Actions', 'CI/CD', 'DevOps'],
    icon: GitBranch,
    color: 'from-yellow-500 to-amber-500',
  },
];

export function AboutSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const profileSummaryRef = useRef(null);
  const expertiseTitleRef = useRef(null);
  const expertiseItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    tl.fromTo(
      profileSummaryRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.7'
    );
    tl.fromTo(
      expertiseTitleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );
    tl.fromTo(
      expertiseItemsRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.15,
      },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id='about'
      ref={sectionRef}
      className='min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 py-20 px-4 md:px-8 relative overflow-hidden'
    >
      {/* Subtle Background Grid */}
      <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]' />

      <div className='container mx-auto max-w-7xl text-center relative z-10'>
        {/* Section Title */}
        <div ref={titleRef} className='mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-6'>
            <Lightbulb className='h-4 w-4' />
            Who I Am
          </div>
          <h2 className='text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-foreground via-primary to-green-600 bg-clip-text text-transparent'>
            About Me
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-green-500 mx-auto rounded-full' />
        </div>

        {/* Profile Summary */}
        <div
          ref={profileSummaryRef}
          className='mb-20 max-w-4xl mx-auto text-muted-foreground space-y-6'
        >
          <p className='text-xl md:text-2xl leading-relaxed'>
            I’m a{' '}
            <span className='text-primary font-semibold'>
              full-stack software engineer
            </span>{' '}
            with 4+ years of experience building user-centric web applications
            from concept to production. I led a redesign of Finchat’s dashboard,
            improving load times by 30% and boosting user satisfaction by 20%.
            During my tenure at Noma Gaming, I developed a matchmaking system
            that enhanced game session stability and reduced connection errors
            by 25%.
          </p>
        </div>

        {/* Areas of Expertise */}
        <div ref={expertiseTitleRef} className='mb-12'>
          <h3 className='text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent'>
            Areas of Expertise
          </h3>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
            My proficiency across the stack ensures robust, scalable, and
            user-friendly digital solutions.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl mx-auto text-left'>
          {expertiseAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <div
                key={area.title}
                ref={(el) =>
                  (expertiseItemsRef.current[index] = el as HTMLDivElement)
                }
                className='relative p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1'
              >
                <div className='flex items-center gap-4 mb-4'>
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${area.color} text-white shadow-md`}
                  >
                    <IconComponent className='h-6 w-6' />
                  </div>
                  {/* Title and Level */}
                  <h4 className='text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent'>
                    {area.title}{' '}
                    <span className='text-lg font-normal text-muted-foreground/80 ml-2'>
                      {area.level}
                    </span>
                  </h4>
                </div>
                {/* Description */}
                <p className='text-muted-foreground text-base mb-4 leading-relaxed'>
                  {area.description}
                </p>
                {/* Technologies */}
                <div className='flex flex-wrap gap-2'>
                  {area.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant='secondary'
                      className='text-sm px-3 py-1 bg-secondary/80 hover:bg-secondary transition-colors duration-300 cursor-default'
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
