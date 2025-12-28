'use client';

import { Badge } from '@/components/ui/badge';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

type Project = {
  _id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  image?: string;
  longDescription?: string;
  featured?: boolean;
  stats?: { stars: number; forks: number };
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!API_URL) {
          throw new Error('API URL not configured.');
        }
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!loading && projects.length > 0) {
      const items = itemsRef.current.filter(Boolean);

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }
  }, [loading, projects, filter]);

  const categories = ['all', ...new Set(projects.map((p) => p.category))];
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  if (loading) {
    return (
      <section className='min-h-screen flex items-center justify-center bg-background'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin' />
          <p className='font-mono text-xs uppercase tracking-widest text-muted-foreground'>
            Initializing Systems...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className='w-full bg-background py-24 px-4 md:px-8'
      ref={containerRef}
    >
      <div className='container mx-auto max-w-6xl'>
        {/* Header - Minimalist & Technical */}
        <div className='mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-12'>
          <div className='max-w-xl'>
            <div className='flex items-center gap-2 mb-4'>
              <span className='w-2 h-2 bg-primary animate-pulse' />
              <span className='font-mono text-xs uppercase tracking-[0.2em] text-primary'>
                System.Deployment_Log
              </span>
            </div>
            <h2 className='text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6'>
              Engineering{' '}
              <span className='text-muted-foreground/50'>Solutions.</span>
            </h2>
            <p className='text-muted-foreground font-mono text-sm leading-relaxed max-w-md'>
              A chronological index of technical implementations, focusing on
              performance, scalability, and modular architecture.
            </p>
          </div>

          {/* Minimalist Filter */}
          <nav className='flex flex-wrap gap-x-8 gap-y-4'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`group relative py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  filter === category
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {category}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300 ${
                    filter === category ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Projects List - Modern Asymmetric Layout */}
        <div className='space-y-32'>
          {filteredProjects.map((project, index) => (
            <div
              key={project._id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className='group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'
            >
              {/* Index Column */}
              <div className='hidden lg:block lg:col-span-1 pt-2'>
                <span className='font-mono text-[10px] text-muted-foreground/40 group-hover:text-primary transition-colors duration-500'>
                  {String(index + 1).padStart(2, '0')}—
                </span>
              </div>

              {/* Content Column */}
              <div className='lg:col-span-5 space-y-6'>
                <div>
                  <Badge
                    variant='outline'
                    className='font-mono text-[9px] uppercase tracking-tighter rounded-none border-primary/20 text-primary mb-4 py-0 h-5 px-2'
                  >
                    {project.category}
                  </Badge>
                  <h3 className='text-3xl font-bold text-foreground group-hover:translate-x-1 transition-transform duration-500'>
                    {project.title}
                  </h3>
                </div>

                <p className='text-muted-foreground text-sm leading-relaxed font-sans'>
                  {project.description}
                </p>

                <div className='flex flex-wrap gap-x-4 gap-y-2 pt-2'>
                  {project.technologies
                    .flatMap((t) => t.split(','))
                    .map((tech, i) => (
                      <span
                        key={i}
                        className='font-mono text-[10px] text-muted-foreground uppercase flex items-center gap-1.5'
                      >
                        <span className='w-1 h-1 bg-border group-hover:bg-primary/40 transition-colors' />
                        {tech.trim()}
                      </span>
                    ))}
                </div>

                <div className='flex gap-6 pt-4'>
                  <Link
                    href={project.liveLink}
                    target='_blank'
                    className='flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground hover:text-primary transition-colors group/link'
                  >
                    Launch{' '}
                    <ArrowUpRight className='w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform' />
                  </Link>
                  <Link
                    href={project.githubLink}
                    target='_blank'
                    className='flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground hover:text-primary transition-colors group/link'
                  >
                    Source <Github className='w-3 h-3' />
                  </Link>
                </div>
              </div>

              {/* Visual Column */}
              <div className='lg:col-span-6 relative aspect-[16/10] overflow-hidden bg-muted/10 border border-border group-hover:border-primary/20 transition-colors duration-500'>
                <Image
                  src={
                    project.image ||
                    `/placeholder.svg?height=600&width=1000&text=${project.title}`
                  }
                  alt={project.title}
                  fill
                  className='object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out'
                />

                {/* Technical Overlay */}
                <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'>
                  <div className='absolute top-4 right-4 font-mono text-[8px] text-white/60 bg-black/40 backdrop-blur-md px-2 py-1 border border-white/10 uppercase'>
                    Ref: {project._id.slice(-8)}
                  </div>
                  <div className='absolute bottom-4 left-4 right-4 flex justify-between font-mono text-[8px] text-white/40 uppercase tracking-[0.2em]'>
                    <span>Secure_Layer_V2</span>
                    <span>© {new Date().getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
