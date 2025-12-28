'use client';

import { Badge } from '@/components/ui/badge';
import { roleContent, RoleKey } from '@/config/roleContent';
import {
  Code,
  Database,
  GitBranch,
  Lightbulb,
  Server,
  TestTube,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const expertiseAreas = {
  frontend: [
    {
      title: 'Frontend Development',
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
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      title: 'UI/UX Design',
      description:
        'User interface design, responsive layouts, accessibility standards, design systems, and user experience optimization',
      technologies: [
        'Figma',
        'Adobe XD',
        'Responsive Design',
        'Accessibility',
        'Design Systems',
        'User Research',
      ],
      icon: Lightbulb,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      title: 'Testing & Quality',
      description:
        'Unit/integration tests (Jest, Cypress), component testing, accessibility testing, and performance optimization',
      technologies: [
        'Jest',
        'Cypress',
        'Storybook',
        'Lighthouse',
        'Performance',
      ],
      icon: TestTube,
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    },
    {
      title: 'Build Tools & Optimization',
      description:
        'Webpack, Vite, code splitting, lazy loading, bundle optimization, and modern build workflows',
      technologies: [
        'Webpack',
        'Vite',
        'Code Splitting',
        'Lazy Loading',
        'Bundle Optimization',
      ],
      icon: GitBranch,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ],
  backend: [
    {
      title: 'Backend & APIs',
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
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      title: 'Data Management',
      description:
        'MySQL/PostgreSQL schema design and optimization, MongoDB modeling, Redis caching strategies',
      technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
      icon: Database,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      title: 'Testing & Quality',
      description:
        'Unit/integration tests (Jest, Supertest), API testing, database testing, and TDD practices',
      technologies: [
        'Jest',
        'Supertest',
        'API Testing',
        'Database Testing',
        'TDD',
      ],
      icon: TestTube,
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    },
    {
      title: 'CI/CD & DevOps',
      description:
        'Docker containerization, GitHub Actions pipelines, automated builds/tests/deployments, monitoring',
      technologies: [
        'Docker',
        'GitHub Actions',
        'CI/CD',
        'DevOps',
        'Monitoring',
      ],
      icon: GitBranch,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ],
  fullstack: [
    {
      title: 'Frontend Development',
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
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      title: 'Backend & APIs',
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
      color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      title: 'Data Management',
      description:
        'MySQL/PostgreSQL schema design and optimization, MongoDB modeling, Redis caching strategies',
      technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
      icon: Database,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      title: 'Testing & Quality',
      description:
        'Unit/integration tests (Jest, Supertest), end-to-end workflows (Cypress, Postman), TDD habits',
      technologies: ['Jest', 'Supertest', 'Cypress', 'Postman', 'TDD'],
      icon: TestTube,
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    },
    {
      title: 'CI/CD & DevOps',
      description:
        'Docker containerization, GitHub Actions pipelines, automated builds/tests/deployments, basic monitoring',
      technologies: ['Docker', 'GitHub Actions', 'CI/CD', 'DevOps'],
      icon: GitBranch,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ],
};

const stats = [
  { label: 'Years Experience', value: 4, suffix: '+' },
  { label: 'Projects Completed', value: 50, suffix: '+' },
  { label: 'Performance Improvement', value: 30, suffix: '%' },
  { label: 'User Satisfaction', value: 20, suffix: '%' },
];

interface AboutSectionProps {
  content: (typeof roleContent)[RoleKey];
  roleKey: RoleKey;
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className='tabular-nums'>
      {count}
      {suffix}
    </div>
  );
}

export function AboutSection({ content, roleKey }: AboutSectionProps) {
  const currentExpertiseAreas =
    expertiseAreas[roleKey] || expertiseAreas.fullstack;
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id='about'
      ref={sectionRef}
      className='relative min-h-screen w-full py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden'
    >
      {/* Subtle gradient background */}
      <div className='absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20' />

      {/* Grid pattern overlay */}
      <div
        className='absolute inset-0 opacity-[0.02]'
        style={{
          backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className='relative z-10 max-w-6xl mx-auto'>
        {/* Section Header - Clean left alignment */}
        <div className='mb-20'>
          <div className='flex items-center gap-4 mb-6'>
            <div className='h-px w-12 bg-primary' />
            <span className='text-primary text-sm font-medium tracking-widest uppercase'>
              About
            </span>
          </div>

          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight'>
            Building digital
            <br />
            <span className='text-muted-foreground'>
              experiences that matter
            </span>
          </h2>

          <p className='text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed'>
            {content.aboutText}
          </p>
        </div>

        {/* Stats Row - Minimal horizontal layout */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-24 pb-24 border-b border-border/30'>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className='group'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='text-4xl md:text-5xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300'>
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className='text-sm text-muted-foreground font-medium'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Expertise Section */}
        <div className='mb-16'>
          <div className='flex items-center gap-4 mb-8'>
            <div className='h-px w-8 bg-primary/50' />
            <span className='text-muted-foreground text-sm font-medium tracking-wide'>
              Areas of Expertise
            </span>
          </div>

          <p className='text-muted-foreground max-w-2xl mb-12'>
            {roleKey === 'frontend' &&
              'My frontend expertise ensures pixel-perfect, accessible, and performant user interfaces.'}
            {roleKey === 'backend' &&
              'My backend expertise focuses on scalable APIs, robust data management, and system optimization.'}
            {roleKey === 'fullstack' &&
              'My experience across the stack ensures robust, scalable, and user-friendly digital solutions.'}
          </p>
        </div>

        {/* Expertise Cards - Bento-style grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {currentExpertiseAreas.map((area, index) => {
            const IconComponent = area.icon;
            const isActive = activeCard === index;

            return (
              <div
                key={area.title}
                className={`
                  group relative p-6 md:p-8 rounded-2xl border transition-all duration-500 cursor-pointer
                  ${
                    isActive
                      ? 'bg-card border-primary/30 shadow-lg shadow-primary/5'
                      : 'bg-card/50 border-border/50 hover:bg-card hover:border-border'
                  }
                `}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Icon and Title Row */}
                <div className='flex items-start gap-4 mb-4'>
                  <div
                    className={`
                    w-12 h-12 rounded-xl flex items-center justify-center border
                    transition-all duration-300
                    ${area.color}
                    ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                  `}
                  >
                    <IconComponent className='h-5 w-5' />
                  </div>

                  <div className='flex-1'>
                    <h3
                      className={`
                      text-xl font-semibold transition-colors duration-300
                      ${
                        isActive
                          ? 'text-primary'
                          : 'text-foreground group-hover:text-foreground'
                      }
                    `}
                    >
                      {area.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className='text-muted-foreground text-sm leading-relaxed mb-6'>
                  {area.description}
                </p>

                {/* Technologies */}
                <div className='flex flex-wrap gap-2'>
                  {area.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant='secondary'
                      className={`
                        text-xs px-2.5 py-1 font-medium transition-all duration-300
                        ${
                          isActive
                            ? 'bg-primary/10 text-primary border-primary/20'
                            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                        }
                      `}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Hover indicator line */}
                <div
                  className={`
                  absolute bottom-0 left-6 right-6 h-0.5 bg-primary rounded-full
                  transition-all duration-500 origin-left
                  ${
                    isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                  }
                `}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
