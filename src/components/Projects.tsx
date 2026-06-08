'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Github,
  Play,
  Star,
} from 'lucide-react';
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
  images: string[];
  video?: string;
  tags?: string[];
  featured?: boolean;
  status?: 'completed' | 'in-progress' | 'archived';
  createdAt?: string;
  updatedAt?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const STATUS_STYLES: Record<
  NonNullable<Project['status']>,
  { dot: string; label: string }
> = {
  completed: { dot: 'bg-primary', label: 'Completed' },
  'in-progress': { dot: 'bg-amber-400 animate-pulse', label: 'In Progress' },
  archived: { dot: 'bg-muted-foreground', label: 'Archived' },
};

function formatDate(iso?: string) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  } catch {
    return null;
  }
}

function ProjectMedia({ project }: { project: Project }) {
  const [showVideo, setShowVideo] = useState(false);
  const [idx, setIdx] = useState(0);
  const hasImages = project.images?.length > 0;
  const hasMultiple = project.images?.length > 1;

  if (project.video && showVideo) {
    return (
      <div className='relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-black'>
        <video
          src={project.video}
          controls
          autoPlay
          className='h-full w-full object-cover'
        />
      </div>
    );
  }

  return (
    <div className='relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-card'>
      {hasImages ? (
        <Image
          src={project.images[idx]}
          alt={`${project.title} preview ${idx + 1}`}
          fill
          className='object-cover transition-transform duration-700 group-hover:scale-105'
        />
      ) : (
        <div className='flex h-full w-full items-center justify-center text-muted-foreground font-mono text-xs'>
          No preview
        </div>
      )}

      {/* Carousel controls */}
      {hasMultiple && (
        <>
          <button
            onClick={() =>
              setIdx(
                (i) => (i - 1 + project.images.length) % project.images.length
              )
            }
            className='absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1.5 text-foreground backdrop-blur hover:bg-background'
            aria-label='Previous image'
          >
            <ChevronLeft className='h-4 w-4' />
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % project.images.length)}
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/60 p-1.5 text-foreground backdrop-blur hover:bg-background'
            aria-label='Next image'
          >
            <ChevronRight className='h-4 w-4' />
          </button>
          <div className='absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1'>
            {project.images.map((_, i) => (
              <span
                key={i}
                className={`h-1 w-4 rounded-full transition-colors ${i === idx ? 'bg-primary' : 'bg-foreground/30'}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Video play button */}
      {project.video && !showVideo && (
        <button
          onClick={() => setShowVideo(true)}
          className='absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity hover:opacity-100'
        >
          <span className='flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground font-mono text-xs uppercase tracking-widest'>
            <Play className='h-3 w-3 fill-current' /> Play Demo
          </span>
        </button>
      )}

      {/* Featured badge */}
      {project.featured && (
        <div className='absolute left-3 top-3 flex items-center gap-1 rounded-sm border border-primary/40 bg-background/70 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-primary backdrop-blur'>
          <Star className='h-3 w-3 fill-current' /> Featured
        </div>
      )}

      {/* Technical overlay (kept) */}
      <div className='pointer-events-none absolute inset-0 flex flex-col justify-between p-3 font-mono text-[10px] uppercase tracking-widest text-foreground/80'>
        <div className='self-end rounded-sm bg-background/60 px-2 py-1 backdrop-blur'>
          Ref: {project._id.slice(-8)}
        </div>
        <div className='flex items-end justify-between'>
          <span className='rounded-sm bg-background/60 px-2 py-1 backdrop-blur'>
            Secure_Layer_V2
          </span>
          <span className='rounded-sm bg-background/60 px-2 py-1 backdrop-blur'>
            © {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        if (!API_URL) throw new Error('API URL not configured.');
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch projects');
        setProjects(await res.json());
      } catch (e) {
        console.error(e);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (loading) return;
    itemsRef.current.filter(Boolean).forEach((item) => {
      gsap.fromTo(
        item!,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item!,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, [loading, projects, filter]);

  const categories = [
    'all',
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  if (loading)
    return (
      <div className='py-32 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground'>
        Initializing Systems...
      </div>
    );
  if (error)
    return (
      <div className='py-32 text-center font-mono text-xs uppercase tracking-widest text-destructive'>
        {error}
      </div>
    );

  return (
    <section className='py-24 md:py-32'>
      <div className='container mx-auto px-6'>
        {/* Header */}
        <div className='mb-20 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
          <div className='max-w-2xl'>
            <div className='mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary'>
              <span className='h-px w-8 bg-primary' /> System.Deployment_Log
            </div>
            <h2 className='text-4xl md:text-6xl leading-tight'>
              Engineering <span className='text-primary'>Solutions.</span>
            </h2>
            <p className='mt-6 max-w-lg text-muted-foreground'>
              A chronological index of technical implementations, focusing on
              performance, scalability, and modular architecture.
            </p>
          </div>

          <div className='flex flex-wrap gap-6'>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`group relative py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  filter === c
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {c}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-primary transition-all ${filter === c ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className='flex flex-col gap-24'>
          {filtered.map((project, index) => {
            const status = project.status
              ? STATUS_STYLES[project.status]
              : null;
            const created = formatDate(project.createdAt);
            const updated = formatDate(project.updatedAt);

            return (
              <div
                key={project._id}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className='group grid grid-cols-1 items-start gap-8 lg:grid-cols-12'
              >
                {/* Index + meta */}
                <div className='lg:col-span-2'>
                  <div className='font-mono text-sm text-primary'>
                    {String(index + 1).padStart(2, '0')}—
                  </div>
                  {/* Status */}
                  {status && (
                    <div className='mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground'>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                      />
                      {status.label}
                    </div>
                  )}
                  {/* Dates */}
                  {/* {(created || updated) && (
                    <div className='mt-4 space-y-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground'>
                      {created && (
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-3 w-3' /> {created}
                        </div>
                      )}
                      {updated && updated !== created && (
                        <div className='flex items-center gap-2'>
                          <RefreshCw className='h-3 w-3' /> {updated}
                        </div>
                      )}
                    </div>
                  )} */}
                </div>

                {/* Content */}
                <div className='space-y-6 lg:col-span-5'>
                  <div>
                    <div className='font-mono text-[10px] uppercase tracking-widest text-muted-foreground'>
                      {project.category}
                    </div>
                    <h3 className='mt-2 text-3xl md:text-4xl leading-tight transition-colors group-hover:text-primary'>
                      {project.title}
                    </h3>
                  </div>

                  <p className='text-muted-foreground leading-relaxed'>
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className='rounded-full border border-primary/30 bg-primary/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-primary'
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className='flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-4'>
                    {project.technologies
                      .flatMap((t) => t.split(','))
                      .map((tech, i) => (
                        <span
                          key={i}
                          className='flex items-center gap-1.5 font-mono text-xs text-muted-foreground'
                        >
                          <span className='h-1 w-1 rounded-full bg-primary/60' />
                          {tech.trim()}
                        </span>
                      ))}
                  </div>

                  <div className='flex flex-wrap items-center gap-6 pt-2'>
                    {project.liveLink && (
                      <Link
                        href={project.liveLink}
                        target='_blank'
                        className='group/link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground hover:text-primary'
                      >
                        Launch{' '}
                        <ArrowUpRight className='h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5' />
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link
                        href={project.githubLink}
                        target='_blank'
                        className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground'
                      >
                        Source <Github className='h-4 w-4' />
                      </Link>
                    )}
                  </div>
                </div>

                {/* Visual */}
                <div className='lg:col-span-5'>
                  <ProjectMedia project={project} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
