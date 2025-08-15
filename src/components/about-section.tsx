'use client';

import { Badge } from '@/components/ui/badge';
import {
  Code,
  Database,
  GitBranch,
  Lightbulb,
  Server,
  Sparkles,
  TestTube,
  Zap,
} from 'lucide-react';

const expertiseAreas = [
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
    color: 'from-blue-500 to-cyan-500',
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
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Data Management',
    description:
      'MySQL/PostgreSQL schema design and optimization, MongoDB modeling, Redis caching strategies',
    technologies: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
    icon: Database,
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Testing & Quality',
    description:
      'Unit/integration tests (Jest, Supertest), end-to-end workflows (Cypress, Postman), TDD habits',
    technologies: ['Jest', 'Supertest', 'Cypress', 'Postman', 'TDD'],
    icon: TestTube,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'CI/CD & DevOps',
    description:
      'Docker containerization, GitHub Actions pipelines, automated builds/tests/deployments, basic monitoring',
    technologies: ['Docker', 'GitHub Actions', 'CI/CD', 'DevOps'],
    icon: GitBranch,
    color: 'from-yellow-500 to-amber-500',
  },
];

const stats = [
  { label: 'Years Experience', value: 4, suffix: '+' },
  { label: 'Projects Completed', value: 50, suffix: '+' },
  { label: 'Performance Improvement', value: 30, suffix: '%' },
  { label: 'User Satisfaction', value: 20, suffix: '%' },
];

export function AboutSection() {
  return (
    <section
      id='about'
      className='min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 py-20 px-4 md:px-8 relative overflow-hidden'
    >
      {/* Enhanced Background Elements */}
      <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]' />
      <div className='absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-blue-500/5' />

      {/* Floating Elements */}
      <div className='absolute top-20 left-10 text-primary/20 animate-bounce'>
        <Sparkles className='h-6 w-6' />
      </div>
      <div className='absolute top-40 right-20 text-blue-500/20 animate-pulse'>
        <Zap className='h-8 w-8' />
      </div>
      <div className='absolute bottom-40 left-20 text-purple-500/20 animate-bounce'>
        <Code className='h-7 w-7' />
      </div>

      <div className='container mx-auto max-w-7xl text-center relative z-10'>
        {/* Section Title */}
        <div
          data-aos='fade-up'
          data-aos-duration='1200'
          data-aos-easing='ease-out-back'
          className='mb-16'
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-6 hover:bg-primary/15 transition-colors duration-300'>
            <Lightbulb className='h-4 w-4' />
            Who I Am
          </div>
          <h2 className='text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent'>
            About Me
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full shadow-lg shadow-primary/25' />
        </div>

        {/* Profile Summary */}
        <div
          data-aos='zoom-in'
          data-aos-delay='200'
          data-aos-duration='800'
          className='mb-16 max-w-4xl mx-auto text-muted-foreground space-y-6'
        >
          <p className='text-xl md:text-2xl leading-relaxed'>
            I&apos;m a
            <span className='ml-1 text-primary font-semibold bg-primary/10 px-2 py-1 rounded-md'>
              full-stack software engineer
            </span>
            with 4+ years of experience building user-centric web applications
            from concept to production. I led a redesign of Finchat&apos;s
            dashboard, improving load times by 30% and boosting user
            satisfaction by 20%. During my tenure at Noma Gaming, I developed a
            matchmaking system that enhanced game session stability and reduced
            connection errors by 25%.
          </p>
        </div>

        {/* Stats Section */}
        <div className='mb-20'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto'>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                data-aos='fade-up'
                data-aos-delay={300 + index * 100}
                data-aos-duration='800'
                className='text-center group'
              >
                <div className='text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300'>
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className='text-sm md:text-base text-muted-foreground font-medium'>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Areas of Expertise */}
        <div
          data-aos='fade-up'
          data-aos-delay='700'
          data-aos-duration='800'
          className='mb-12'
        >
          <h3 className='text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent'>
            Areas of Expertise
          </h3>
          <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto'>
            My experience across the stack ensures robust, scalable, and
            user-friendly digital solutions.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl mx-auto text-left'>
          {expertiseAreas.map((area, index) => {
            const IconComponent = area.icon;
            return (
              <div
                key={area.title}
                data-aos='fade-up'
                data-aos-delay={800 + index * 150}
                data-aos-duration='800'
                className='group relative p-6 rounded-2xl bg-card/60 backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-card/80 cursor-pointer'
              >
                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${area.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className='flex items-center gap-4 mb-4'>
                  {/* Enhanced Icon */}
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${area.color} text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}
                  >
                    <IconComponent className='h-6 w-6' />
                  </div>
                  {/* Title */}
                  <div className='flex-1'>
                    <h4 className='text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-blue-600 transition-all duration-300'>
                      {area.title}
                    </h4>
                  </div>
                </div>

                {/* Description */}
                <p className='text-muted-foreground text-base mb-4 leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-300'>
                  {area.description}
                </p>

                {/* Technologies */}
                <div className='flex flex-wrap gap-2'>
                  {area.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant='secondary'
                      className='text-sm px-3 py-1 bg-secondary/80 hover:bg-secondary transition-all duration-300 cursor-default group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20'
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
