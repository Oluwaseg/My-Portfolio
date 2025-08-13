'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  Calendar,
  Check,
  ExternalLink,
  MapPin,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'; // Added Check icon
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    company: 'Finchat',
    position: 'Backend Engineer',
    duration: 'Jan 2021 – Aug 2022',
    location: 'Remote', // Inferred
    type: 'Full-time',
    description:
      'Spearheaded a React-based dashboard overhaul, cutting initial page load from 4s to 2.8s and lifting NPS by 20%. Implemented Redis caching and optimized database queries to slash average API response times by 35%. Built Jest and Supertest suites covering 80% of core payment endpoints, reducing post-release bugs by 40%. Integrated WebSockets for real-time balance updates, improving active session duration by 15%.',
    achievements: [
      {
        icon: TrendingUp,
        text: 'Cut initial page load from 4s to 2.8s',
        metric: '30% faster',
      },
      { icon: Award, text: 'Lifted NPS by 20%', metric: '20% NPS' },
      {
        icon: Zap,
        text: 'Reduced API response times by 35%',
        metric: '35% faster',
      },
      {
        icon: Check,
        text: 'Built Jest/Supertest suites (80% coverage)',
        metric: '80% coverage',
      },
      {
        icon: Users,
        text: 'Reduced post-release bugs by 40%',
        metric: '40% fewer bugs',
      },
      {
        icon: TrendingUp,
        text: 'Improved active session duration by 15%',
        metric: '15% longer',
      },
    ],
    technologies: [
      'React',
      'Redis',
      'PostgreSQL',
      'Jest',
      'Supertest',
      'WebSockets',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    company: 'Noma Gaming',
    position: 'Full-Stack Developer',
    duration: 'Jun 2019 – Dec 2020',
    location: 'Remote', // Inferred
    type: 'Full-time',
    description:
      'Developed Angular modules for live game lobbies, boosting daily active players by 15%. Enhanced React admin portal, reducing asset load size by 40% and improving deployment frequency. Designed Node.js matchmaking service supporting 2,000+ concurrent sessions with <1% error rate. Automated Docker builds and GitHub Actions workflows, achieving zero-downtime releases for weekly feature updates.',
    achievements: [
      {
        icon: TrendingUp,
        text: 'Boosted daily active players by 15%',
        metric: '15% growth',
      },
      {
        icon: Zap,
        text: 'Reduced asset load size by 40%',
        metric: '40% smaller',
      },
      {
        icon: Users,
        text: 'Supported 2,000+ concurrent sessions',
        metric: '2K+ sessions',
      },
      {
        icon: Award,
        text: 'Achieved zero-downtime releases',
        metric: 'Zero downtime',
      },
    ],
    technologies: [
      'Angular',
      'React',
      'Node.js',
      'Docker',
      'GitHub Actions',
      'WebSockets',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 3,
    company: 'Freelance',
    position: 'Contract Developer',
    duration: 'Jan 2021 – Present',
    location: 'Remote', // Inferred
    type: 'Contract',
    description:
      'Delivered full-stack solutions for e-commerce, fintech, and SaaS clients, building React frontends and Node.js/Express backends. Designed and optimized SQL and NoSQL schemas; improved query performance by up to 25%. Set up CI/CD with GitHub Actions and Docker, cutting manual deployment steps in half. Worked directly with stakeholders for UI/UX feedback and user acceptance testing, ensuring polished deliverables.',
    achievements: [
      {
        icon: Award,
        text: 'Delivered full-stack solutions for diverse clients',
        metric: 'Multi-industry',
      },
      {
        icon: TrendingUp,
        text: 'Improved query performance by up to 25%',
        metric: '25% faster',
      },
      {
        icon: Zap,
        text: 'Cut manual deployment steps in half',
        metric: '50% faster',
      },
      {
        icon: Users,
        text: 'Ensured polished deliverables via stakeholder feedback',
        metric: 'Client-focused',
      },
    ],
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'SQL',
      'NoSQL',
      'Docker',
      'GitHub Actions',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    company: 'HNG Virtual Program',
    position: 'Full-Stack Web Developer',
    duration: 'Jul 2024',
    location: 'Remote', // Inferred
    type: 'Program',
    description:
      'Built a Next.js demo app with code splitting and caching that achieved a 95% Lighthouse performance score. Authored unit/integration tests to maintain 90%+ coverage under tight deadlines. Configured GitHub Actions for live previews and automated deployments, reducing feedback loops by 60%.',
    achievements: [
      {
        icon: Award,
        text: 'Achieved 95% Lighthouse performance score',
        metric: '95% score',
      },
      {
        icon: Check,
        text: 'Maintained 90%+ test coverage',
        metric: '90%+ coverage',
      },
      {
        icon: Zap,
        text: 'Reduced feedback loops by 60%',
        metric: '60% faster',
      },
    ],
    technologies: ['Next.js', 'Jest', 'GitHub Actions', 'TypeScript'],
    color: 'from-orange-500 to-red-500',
  },
];

export function ExperienceSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  return (
    <section
      id='experience'
      ref={sectionRef}
      className='min-h-screen w-full bg-gradient-to-br from-background via-muted/5 to-background py-20 px-4 md:px-8 relative overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]' />
      <div className='absolute top-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl' />
      <div className='absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-500/3 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-7xl relative z-10'>
        <div ref={titleRef} className='text-center mb-20'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-6'>
            <Calendar className='h-4 w-4' />
            Professional Journey
          </div>
          <h2 className='text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent'>
            Experience
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full mb-6' />
          <p className='text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            A journey through innovative companies, impactful projects, and
            continuous growth in the ever-evolving world of technology
          </p>
        </div>

        <div className='space-y-12'>
          {experiences.map((exp, index) => (
            <Card
              key={exp.id}
              ref={(el) => {
                cardsRef.current[index] = el as HTMLDivElement;
              }}
              className='group relative overflow-hidden bg-card/60 backdrop-blur-sm border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 hover:rotate-1'
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />
              <div className='grid lg:grid-cols-12 gap-8 p-8 lg:p-12'>
                {/* Left Column - Company Info */}
                <div className='lg:col-span-4 space-y-6'>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${exp.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg`}
                      >
                        {exp.company.charAt(0)}
                      </div>
                      <div>
                        <h3 className='text-2xl font-bold group-hover:text-primary transition-colors duration-300'>
                          {exp.company}
                        </h3>
                        {/* Removed website link as it's not in PDF */}
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <h4 className='text-xl font-semibold text-foreground'>
                        {exp.position}
                      </h4>
                      <div className='flex flex-wrap gap-3 text-sm text-muted-foreground'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          {exp.duration}
                        </div>
                        {exp.location && (
                          <div className='flex items-center gap-1'>
                            <MapPin className='h-4 w-4' />
                            {exp.location}
                          </div>
                        )}
                        <Badge
                          variant='secondary'
                          className='bg-primary/10 text-primary border-primary/20'
                        >
                          {exp.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className='space-y-4'>
                    <h5 className='font-semibold text-foreground'>
                      Technologies
                    </h5>
                    <div className='flex flex-wrap gap-2'>
                      {exp.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant='outline'
                          className='text-xs px-3 py-1 bg-secondary/50 hover:bg-secondary transition-colors duration-300 cursor-default'
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Description & Achievements */}
                <div className='lg:col-span-8 space-y-8'>
                  <div className='space-y-4'>
                    <h5 className='font-semibold text-foreground text-lg'>
                      Role Overview
                    </h5>
                    <p className='text-muted-foreground leading-relaxed text-lg'>
                      {exp.description}
                    </p>
                  </div>
                  <div className='space-y-6'>
                    <h5 className='font-semibold text-foreground text-lg'>
                      Key Achievements
                    </h5>
                    <div className='grid sm:grid-cols-2 gap-4'>
                      {exp.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className='group/achievement flex items-start gap-4 p-4 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/30 hover:bg-background/50 transition-all duration-300 hover:scale-105'
                        >
                          <div
                            className={`p-2 rounded-xl bg-gradient-to-br ${exp.color} bg-opacity-10 group-hover/achievement:bg-opacity-20 transition-all duration-300`}
                          >
                            <achievement.icon className='h-5 w-5 text-primary' />
                          </div>
                          <div className='flex-1'>
                            <p className='text-sm font-medium text-foreground mb-1'>
                              {achievement.text}
                            </p>
                            <div
                              className={`text-2xl font-black bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}
                            >
                              {achievement.metric}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center mt-16'>
          <Button
            size='lg'
            className='bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-orange-600/90 text-white shadow-2xl text-lg px-8 py-6 rounded-2xl transition-all duration-500 hover:scale-105'
          >
            <ExternalLink className='mr-2 h-5 w-5' />
            View Full Resume
          </Button>
        </div>
      </div>
    </section>
  );
}
