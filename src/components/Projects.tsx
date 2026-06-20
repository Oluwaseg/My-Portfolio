'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Expand,
  Github,
  Loader2,
  Play,
  Star,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

const API_URL = process.env.VITE_API_URL;

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

/* ---------------- Lightbox ---------------- */
function Lightbox({
  images,
  index,
  title,
  video,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  title: string;
  video?: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const isVideo = !!video;
  const hasMultiple = !isVideo && images.length > 1;
  const activeSrc = isVideo ? video : images[index];
  const [mediaReady, setMediaReady] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchMoved = useRef(false);

  useEffect(() => {
    setMediaReady(false);
  }, [activeSrc]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
    touchMoved.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - (touchStartY.current ?? 0);
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) touchMoved.current = true;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - (touchStartY.current ?? 0);
    touchStartX.current = null;
    touchStartY.current = null;
    if (!hasMultiple) return;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) onNext();
      else onPrev();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!isVideo) {
        if (e.key === 'ArrowLeft') onPrev();
        if (e.key === 'ArrowRight') onNext();
      }
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onPrev, onNext, isVideo]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className='fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm overscroll-contain'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-label={`${title} ${isVideo ? 'video' : 'image'} viewer`}
    >
      {/* Top bar */}
      <div
        className='absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-3 p-3 sm:p-5 bg-gradient-to-b from-black/70 to-transparent'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='min-w-0 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/80'>
          <div className='truncate text-primary'>{title}</div>
          {hasMultiple && (
            <div className='mt-0.5 text-white/60'>
              {String(index + 1).padStart(2, '0')} /{' '}
              {String(images.length).padStart(2, '0')}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className='shrink-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors'
          aria-label='Close'
        >
          <X className='h-5 w-5' />
        </button>
      </div>

      {/* Media area — centered, full viewport */}
      <div
        className='absolute inset-0 flex items-center justify-center p-4 sm:p-8 touch-pan-y'
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {!mediaReady && (
          <div
            className='absolute flex flex-col items-center justify-center gap-3 w-[min(85vw,900px)] aspect-video rounded bg-white/[0.04] overflow-hidden'
            aria-hidden='true'
          >
            <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent' />
            {isVideo ? (
              <Play className='h-10 w-10 text-white/30' />
            ) : (
              <Loader2 className='h-8 w-8 animate-spin text-primary' />
            )}
            <span className='font-mono text-[10px] uppercase tracking-widest text-white/40'>
              {isVideo ? 'Buffering' : 'Loading'}
            </span>
          </div>
        )}

        {isVideo ? (
          <video
            key={activeSrc}
            src={video}
            controls
            autoPlay
            playsInline
            preload='auto'
            onLoadedData={() => setMediaReady(true)}
            onCanPlay={() => setMediaReady(true)}
            className={`max-h-[85vh] max-w-full w-auto h-auto rounded transition-opacity duration-200 ${mediaReady ? 'opacity-100' : 'opacity-0'}`}
          />
        ) : (
          <img
            key={activeSrc}
            src={images[index]}
            alt={`${title} ${index + 1}`}
            className={`max-h-[85vh] max-w-full w-auto h-auto object-contain select-none transition-opacity duration-200 ${mediaReady ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setMediaReady(true)}
            draggable={false}
          />
        )}
      </div>

      {/* Prev / Next */}
      {hasMultiple && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-2 sm:p-3 text-white hover:bg-white/20 transition-colors'
            aria-label='Previous image'
          >
            <ChevronLeft className='h-5 w-5 sm:h-6 sm:w-6' />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/10 p-2 sm:p-3 text-white hover:bg-white/20 transition-colors'
            aria-label='Next image'
          >
            <ChevronRight className='h-5 w-5 sm:h-6 sm:w-6' />
          </button>
        </>
      )}

      {/* Dots */}
      {hasMultiple && (
        <div
          className='absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5'
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === index ? 'w-6 bg-primary' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const [idx, setIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false);
  const hasImages = project.images?.length > 0;
  const hasMultiple = project.images?.length > 1;
  const currentImage = hasImages ? project.images[idx] : null;
  const currentVideo = project.video ?? null;

  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    if (currentImage) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = currentImage;
      document.head.appendChild(link);
      links.push(link);
    }
    if (currentVideo) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = currentVideo;
      document.head.appendChild(link);
      links.push(link);
    }
    return () => {
      links.forEach((l) => {
        if (l.parentNode) l.parentNode.removeChild(l);
      });
    };
  }, [currentImage, currentVideo]);

  return (
    <>
      <div className='relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-card'>
        {hasImages ? (
          <img
            src={project.images[idx]}
            alt={`${project.title} preview ${idx + 1}`}
            className='absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
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

        {/* Expand / view full image */}
        {hasImages && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            className='absolute right-2 top-2 z-[1] rounded-full bg-background/70 p-1.5 text-foreground backdrop-blur hover:bg-primary hover:text-primary-foreground transition-colors'
            aria-label='View full image'
            title='View full image'
          >
            <Expand className='h-4 w-4' />
          </button>
        )}

        {/* Video play button */}
        {project.video && (
          <button
            onClick={() => setVideoLightboxOpen(true)}
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

      {lightboxOpen && hasImages && (
        <Lightbox
          images={project.images}
          index={idx}
          title={project.title}
          onClose={() => setLightboxOpen(false)}
          onPrev={() =>
            setIdx(
              (i) => (i - 1 + project.images.length) % project.images.length
            )
          }
          onNext={() => setIdx((i) => (i + 1) % project.images.length)}
        />
      )}

      {videoLightboxOpen && project.video && (
        <Lightbox
          images={[]}
          index={0}
          title={project.title}
          video={project.video}
          onClose={() => setVideoLightboxOpen(false)}
          onPrev={() => {}}
          onNext={() => {}}
        />
      )}
    </>
  );
}

export function ProjectsSection() {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id='projects' ref={sectionRef} className='py-24 md:py-32'>
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
                  {status && (
                    <div className='mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground'>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                      />
                      {status.label}
                    </div>
                  )}
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
                      <a
                        href={project.liveLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='group/link inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-foreground hover:text-primary'
                      >
                        Launch{' '}
                        <ArrowUpRight className='h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5' />
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground'
                      >
                        Source <Github className='h-4 w-4' />
                      </a>
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
