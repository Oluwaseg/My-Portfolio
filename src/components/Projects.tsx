'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ExternalLink,
  Filter,
  Github,
  Grid,
  Info,
  List,
  Star,
  X,
  ZoomIn,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

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

const ImageModal = ({
  isOpen,
  onClose,
  imageSrc,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm'>
      <div className='relative max-w-4xl max-h-[90vh] w-full mx-4'>
        <button
          onClick={onClose}
          className='absolute -top-12 right-0 text-white hover:text-primary transition-colors duration-300 z-10'
        >
          <X className='h-8 w-8' />
        </button>
        <div className='relative bg-card/90 backdrop-blur-xl rounded-lg overflow-hidden shadow-2xl'>
          <Image
            src={imageSrc || '/placeholder.svg'}
            alt={title}
            width={800}
            height={600}
            className='w-full h-auto max-h-[80vh] object-contain'
          />
          <div className='p-4 bg-gradient-to-t from-black/60 to-transparent absolute bottom-0 left-0 right-0'>
            <h3 className='text-white text-xl font-semibold'>{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectDetailsModal = ({
  isOpen,
  onClose,
  project,
}: {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4'>
      <div className='relative max-w-4xl max-h-[90vh] w-full bg-card/95 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-muted-foreground hover:text-primary transition-colors duration-300 z-10 bg-background/80 backdrop-blur-sm rounded-full p-2'
        >
          <X className='h-6 w-6' />
        </button>

        <div className='overflow-y-auto max-h-[90vh]'>
          {/* Header with image */}
          <div className='relative h-64 bg-gradient-to-br from-muted to-muted/50 overflow-hidden'>
            <Image
              src={
                project.image ||
                `/placeholder.svg?height=300&width=800&text=${
                  encodeURIComponent(project.title) || '/placeholder.svg'
                }`
              }
              alt={project.title}
              width={800}
              height={300}
              className='w-full h-full object-cover'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `/placeholder.svg?height=300&width=800&text=${encodeURIComponent(
                  project.title
                )}`;
              }}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

            {/* Project stats and featured badge */}
            <div className='absolute top-4 left-4 flex gap-2'>
              {project.featured && (
                <Badge className='bg-gradient-to-r from-primary to-blue-600 text-white border-0 shadow-lg'>
                  Featured
                </Badge>
              )}
              {project.stats && (
                <div className='bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 text-white text-sm'>
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                  {project.stats.stars}
                </div>
              )}
            </div>

            {/* Title overlay */}
            <div className='absolute bottom-4 left-4 right-16'>
              <h2 className='text-3xl font-bold text-white mb-2'>
                {project.title}
              </h2>
              <Badge
                variant='secondary'
                className='bg-background/80 text-foreground'
              >
                {project.category}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className='p-6 space-y-6'>
            {/* Description */}
            <div>
              <h3 className='text-xl font-semibold mb-3 text-primary'>
                About This Project
              </h3>
              <p className='text-muted-foreground leading-relaxed mb-4'>
                {project.description}
              </p>
              {project.longDescription && (
                <p className='text-foreground leading-relaxed'>
                  {project.longDescription}
                </p>
              )}
            </div>

            {/* Technologies */}
            <div>
              <h3 className='text-xl font-semibold mb-3 text-primary'>
                Technologies Used
              </h3>
              <div className='flex flex-wrap gap-2'>
                {project.technologies
                  .flatMap((tech) => tech.split(',').map((item) => item.trim()))
                  .map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant='outline'
                      className='px-3 py-1 bg-secondary/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-blue-500/20 transition-all duration-300 border-primary/20'
                    >
                      {tech}
                    </Badge>
                  ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex flex-col sm:flex-row gap-4 pt-4 border-t border-border'>
              <Link
                href={project.liveLink}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1'
              >
                <Button className='w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/80 hover:to-blue-600/80 shadow-lg hover:shadow-xl transition-all duration-300'>
                  <ExternalLink className='h-4 w-4 mr-2' />
                  View Live Demo
                </Button>
              </Link>
              <Link
                href={project.githubLink}
                target='_blank'
                rel='noopener noreferrer'
                className='flex-1'
              >
                <Button
                  variant='outline'
                  className='w-full bg-transparent hover:bg-gradient-to-r hover:from-primary/10 hover:to-blue-500/10 border-primary/30 hover:border-primary transition-all duration-300'
                >
                  <Github className='h-4 w-4 mr-2' />
                  View Source Code
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [modalImage, setModalImage] = useState<{
    src: string;
    title: string;
  } | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!API_URL) {
          throw new Error(
            'API URL not configured. Please add NEXT_PUBLIC_API_URL to your environment variables.'
          );
        }

        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch projects');

        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!loading && projects.length > 0) {
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
        {
          opacity: 0,
          y: 100,
          rotationX: -90,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: 'back.out(1.7)',
        }
      );

      tl.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 120,
          rotationY: -45,
          scale: 0.8,
          transformPerspective: 1000,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
        },
        '-=0.6'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [loading, projects, filter]);

  const categories = ['all', ...new Set(projects.map((p) => p.category))];
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  const handleCardHover = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.1;
    const deltaY = (e.clientY - centerY) * 0.1;

    gsap.to(card, {
      x: deltaX,
      y: deltaY,
      rotationY: deltaX * 0.5,
      rotationX: -deltaY * 0.5,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const openImageModal = (imageSrc: string, title: string) => {
    setModalImage({ src: imageSrc, title });
  };

  const closeImageModal = () => {
    setModalImage(null);
  };

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <section className='min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background py-20 px-4 md:px-8 relative overflow-hidden flex items-center justify-center'>
        <div className='text-center'>
          <div className='relative'>
            <div className='animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary mx-auto mb-6'></div>
            <div className='absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-primary/40 mx-auto'></div>
          </div>
          <p className='text-2xl font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent'>
            Loading amazing projects...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background py-20 px-4 md:px-8 relative overflow-hidden flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>💥</div>
          <p className='text-xl text-red-500 mb-6'>{error}</p>
          <Button
            className='bg-gradient-to-r from-primary to-blue-600 hover:from-primary/80 hover:to-blue-600/80 transform hover:scale-105 transition-all duration-300'
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section
      id='projects'
      ref={sectionRef}
      className='min-h-screen w-full bg-gradient-to-br from-background via-background to-background py-20 px-4 md:px-8 relative overflow-hidden'
    >
      <div className='absolute inset-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5' />

        <div className='absolute top-20 left-10 text-primary/20 animate-float-slow'>
          <div className='w-8 h-8 rounded-full bg-gradient-to-r from-primary/30 to-blue-500/30 blur-sm'></div>
        </div>
        <div className='absolute top-40 right-20 text-blue-500/20 animate-float-reverse'>
          <div className='w-6 h-6 rotate-45 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-sm'></div>
        </div>
        <div className='absolute bottom-40 left-20 text-purple-500/20 animate-float-slow'>
          <div className='w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-sm'></div>
        </div>
        <div className='absolute top-60 left-1/3 text-green-500/20 animate-float-reverse'>
          <div className='w-4 h-4 rotate-12 bg-gradient-to-r from-green-500/30 to-teal-500/30 blur-sm'></div>
        </div>
        <div className='absolute bottom-60 right-1/3 text-orange-500/20 animate-float-slow'>
          <div className='w-7 h-7 rounded-full bg-gradient-to-r from-orange-500/30 to-red-500/30 blur-sm'></div>
        </div>
        <div className='absolute top-32 right-1/4 text-indigo-500/20 animate-float-reverse'>
          <div className='w-5 h-5 rotate-45 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-sm'></div>
        </div>
        <div className='absolute bottom-32 left-1/4 text-cyan-500/20 animate-float-slow'>
          <div className='w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-sm'></div>
        </div>
        <div className='absolute top-80 right-10 text-pink-500/20 animate-float-reverse'>
          <div className='w-6 h-6 rotate-12 bg-gradient-to-r from-pink-500/30 to-rose-500/30 blur-sm'></div>
        </div>

        <div className='absolute top-1/4 left-1/2 w-2 h-2 bg-primary/40 rounded-full animate-float-slow blur-sm'></div>
        <div className='absolute bottom-1/4 right-1/2 w-3 h-3 bg-blue-500/40 rounded-full animate-float-reverse blur-sm'></div>
        <div className='absolute top-3/4 left-1/4 w-1 h-1 bg-purple-500/40 rounded-full animate-float-slow blur-sm'></div>
        <div className='absolute bottom-1/2 right-1/4 w-2 h-2 bg-green-500/40 rounded-full animate-float-reverse blur-sm'></div>
      </div>

      <div className='container mx-auto max-w-7xl relative z-10'>
        <div ref={titleRef} className='text-center mb-16'>
          <div className='relative inline-block'>
            <h2 className='text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent relative'>
              Featured Work
              <div className='absolute -inset-4 bg-gradient-to-r from-primary/10 to-blue-600/10 blur-2xl -z-10 animate-pulse-gentle' />
            </h2>
          </div>

          <div className='flex items-center justify-center mb-8'>
            <div className='h-px bg-gradient-to-r from-transparent via-primary to-transparent w-32 animate-pulse' />
            <div className='w-3 h-3 bg-primary rounded-full mx-4 animate-ping' />
            <div className='h-px bg-gradient-to-r from-transparent via-primary to-transparent w-32 animate-pulse' />
          </div>

          <p className='text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed'>
            A showcase of projects that push boundaries and deliver exceptional
            user experiences
          </p>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-between mb-12 gap-4'>
          <div className='flex items-center gap-2 flex-wrap'>
            <Filter className='h-5 w-5 text-muted-foreground' />
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? 'default' : 'outline'}
                size='sm'
                onClick={() => setFilter(category)}
                className={`capitalize transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-primary to-blue-600 shadow-lg transform scale-105'
                    : 'hover:scale-105'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setViewMode('grid')}
              className='transition-all duration-300 hover:scale-105'
            >
              <Grid className='h-4 w-4' />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size='sm'
              onClick={() => setViewMode('list')}
              className='transition-all duration-300 hover:scale-105'
            >
              <List className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {featuredProjects.length > 0 && (
          <div className='mb-20'>
            <div className='text-center mb-12'>
              <h3 className='text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent'>
                ⭐ Featured Projects
              </h3>
              <div className='w-20 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full' />
            </div>

            <div
              className={`grid gap-8 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 lg:grid-cols-2'
                  : 'grid-cols-1'
              }`}
            >
              {featuredProjects.map((project, index) => (
                <Card
                  key={project._id}
                  ref={(el) => {
                    cardsRef.current[index] = el as HTMLDivElement;
                  }}
                  className='group relative overflow-hidden bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl hover:shadow-4xl transition-all duration-700 cursor-pointer'
                  style={{ transformStyle: 'preserve-3d' }}
                  onMouseMove={(e) => handleCardHover(index, e)}
                  onMouseLeave={handleCardLeave}
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-primary/50 via-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm' />
                  <div className='absolute inset-[1px] bg-card/90 backdrop-blur-xl rounded-lg' />

                  <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700' />

                  <div className='relative z-10'>
                    <div
                      className='relative w-full h-72 bg-gradient-to-br from-muted to-muted/50 overflow-hidden cursor-pointer group/image'
                      onClick={() =>
                        openImageModal(
                          project.image ||
                            `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
                              project.title
                            )}`,
                          project.title
                        )
                      }
                    >
                      <Image
                        src={
                          project.image ||
                          `/placeholder.svg?height=400&width=600&text=${
                            encodeURIComponent(project.title) ||
                            '/placeholder.svg'
                          }`
                        }
                        alt={project.title}
                        width={600}
                        height={400}
                        className='w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1'
                        priority={index < 2}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
                            project.title
                          )}`;
                        }}
                      />

                      <div className='absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <ZoomIn className='h-12 w-12 text-white animate-pulse' />
                      </div>

                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
                      <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                      {project.stats && (
                        <div className='absolute top-4 right-4 flex gap-2'>
                          <div className='bg-black/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm font-medium border border-yellow-400/30'>
                            <Star className='h-4 w-4 fill-yellow-400 text-yellow-400 animate-pulse' />
                            {project.stats.stars}
                          </div>
                        </div>
                      )}

                      <div className='absolute top-4 left-4'>
                        <Badge className='bg-gradient-to-r from-primary to-blue-600 text-white border-0 shadow-lg animate-pulse-gentle'>
                          Featured
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className='pb-4'>
                      <CardTitle
                        className='text-3xl font-bold group-hover:text-primary transition-all duration-300 group-hover:scale-105 origin-left cursor-pointer'
                        onClick={() => openProjectDetails(project)}
                      >
                        {project.title}
                      </CardTitle>
                      <CardDescription className='text-lg leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300'>
                        {project.description}
                      </CardDescription>
                      {project.longDescription && (
                        <p className='text-sm text-muted-foreground italic mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                          {project.longDescription}
                        </p>
                      )}
                    </CardHeader>

                    <CardContent className='pb-6'>
                      <div className='flex flex-wrap gap-2'>
                        {project.technologies
                          .flatMap((tech) =>
                            tech.split(',').map((item) => item.trim())
                          )
                          .map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant='outline'
                              className='text-xs px-3 py-1 bg-secondary/50 hover:bg-gradient-to-r hover:from-primary/20 hover:to-blue-500/20 transition-all duration-300 hover:scale-110 cursor-pointer border-primary/20'
                            >
                              {tech}
                            </Badge>
                          ))}
                      </div>
                    </CardContent>

                    <CardFooter className='flex justify-between pt-0'>
                      <div className='flex gap-2'>
                        <Link
                          href={project.liveLink}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Button className='group/btn bg-gradient-to-r from-primary to-blue-600 hover:from-primary/80 hover:to-blue-600/80 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
                            <ExternalLink className='h-4 w-4 mr-2 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300' />
                            Live Demo
                          </Button>
                        </Link>
                        <Link
                          href={project.githubLink}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Button
                            variant='outline'
                            className='group/btn bg-transparent hover:bg-gradient-to-r hover:from-primary/10 hover:to-blue-500/10 border-primary/30 hover:border-primary transition-all duration-300 hover:scale-105'
                          >
                            <Github className='h-4 w-4 mr-2 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300' />
                            Source Code
                          </Button>
                        </Link>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => openProjectDetails(project)}
                        className='group/btn hover:bg-primary/10 transition-all duration-300 hover:scale-105'
                      >
                        <Info className='h-4 w-4 mr-2 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-transform duration-300' />
                        Details
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {otherProjects.length > 0 && (
          <div>
            <div className='text-center mb-12'>
              <h3 className='text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent'>
                💼 More Projects
              </h3>
              <div className='w-16 h-1 bg-gradient-to-r from-primary to-blue-600 mx-auto rounded-full' />
            </div>

            <div
              className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}
            >
              {otherProjects.map((project, index) => (
                <Card
                  key={project._id}
                  ref={(el) => {
                    cardsRef.current[featuredProjects.length + index] =
                      el as HTMLDivElement;
                  }}
                  className='group relative overflow-hidden bg-card/70 backdrop-blur-lg border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:rotate-1'
                  style={{ transformStyle: 'preserve-3d' }}
                  onMouseMove={(e) =>
                    handleCardHover(featuredProjects.length + index, e)
                  }
                  onMouseLeave={handleCardLeave}
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-primary/30 via-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm' />
                  <div className='absolute inset-[1px] bg-card/90 backdrop-blur-lg rounded-lg' />

                  <div className='relative z-10'>
                    <div
                      className='relative w-full h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden cursor-pointer group/image'
                      onClick={() =>
                        openImageModal(
                          project.image ||
                            `/placeholder.svg?height=250&width=400&text=${encodeURIComponent(
                              project.title
                            )}`,
                          project.title
                        )
                      }
                    >
                      <Image
                        src={
                          project.image ||
                          `/placeholder.svg?height=250&width=400&text=${
                            encodeURIComponent(project.title) ||
                            '/placeholder.svg'
                          }`
                        }
                        alt={project.title}
                        width={400}
                        height={250}
                        className='w-full h-full object-cover transition-all duration-500 group-hover:scale-110'
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `/placeholder.svg?height=250&width=400&text=${encodeURIComponent(
                            project.title
                          )}`;
                        }}
                      />

                      <div className='absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                        <ZoomIn className='h-8 w-8 text-white animate-pulse' />
                      </div>

                      <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent' />

                      {project.stats && (
                        <div className='absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-white text-xs'>
                          <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                          {project.stats.stars}
                        </div>
                      )}
                    </div>

                    <CardHeader className='pb-3'>
                      <CardTitle
                        className='text-xl font-semibold group-hover:text-primary transition-colors duration-300 cursor-pointer'
                        onClick={() => openProjectDetails(project)}
                      >
                        {project.title}
                      </CardTitle>
                      <CardDescription className='text-sm line-clamp-2'>
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className='pb-4'>
                      <div className='flex flex-wrap gap-1'>
                        {project.technologies
                          .flatMap((tech) =>
                            tech.split(',').map((item) => item.trim())
                          )
                          .slice(0, 3)
                          .map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant='secondary'
                              className='text-xs px-2 py-0.5 bg-secondary/70 hover:bg-primary/20 transition-colors duration-300'
                            >
                              {tech}
                            </Badge>
                          ))}
                        {project.technologies.flatMap((tech) =>
                          tech.split(',').map((item) => item.trim())
                        ).length > 3 && (
                          <Badge
                            variant='secondary'
                            className='text-xs px-2 py-0.5 bg-secondary/70'
                          >
                            +
                            {project.technologies.flatMap((tech) =>
                              tech.split(',').map((item) => item.trim())
                            ).length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className='flex justify-between pt-0'>
                      <div className='flex gap-1'>
                        <Link
                          href={project.liveLink}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Button
                            variant='outline'
                            size='sm'
                            className='text-xs bg-transparent hover:bg-primary/10 transition-all duration-300 hover:scale-105'
                          >
                            <ExternalLink className='h-3 w-3 mr-1' />
                            Demo
                          </Button>
                        </Link>
                        <Link
                          href={project.githubLink}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Button
                            variant='ghost'
                            size='sm'
                            className='text-xs hover:bg-primary/10 transition-all duration-300 hover:scale-105'
                          >
                            <Github className='h-3 w-3 mr-1' />
                            Code
                          </Button>
                        </Link>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => openProjectDetails(project)}
                        className='text-xs hover:bg-primary/10 transition-all duration-300 hover:scale-105'
                      >
                        <Info className='h-3 w-3 mr-1' />
                        Details
                      </Button>
                    </CardFooter>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {filteredProjects.length === 0 && !loading && (
          <div className='text-center py-20'>
            <div className='text-8xl mb-6 animate-bounce'>🔍</div>
            <p className='text-2xl text-muted-foreground mb-4'>
              No projects found for &quot;{filter}&quot;
            </p>
            <Button
              onClick={() => setFilter('all')}
              className='bg-gradient-to-r from-primary to-blue-600 hover:from-primary/80 hover:to-blue-600/80'
            >
              Show All Projects
            </Button>
          </div>
        )}
      </div>

      <ImageModal
        isOpen={modalImage !== null}
        onClose={closeImageModal}
        imageSrc={modalImage?.src || ''}
        title={modalImage?.title || ''}
      />

      <ProjectDetailsModal
        isOpen={selectedProject !== null}
        onClose={closeProjectDetails}
        project={selectedProject}
      />

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(5deg);
          }
        }
        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-3deg);
          }
        }
        @keyframes pulse-gentle {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
        }
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes pulse-slowest {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.4;
          }
        }
        @keyframes slide-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes slide-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 10s ease-in-out infinite;
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 12s ease-in-out infinite;
        }
        .animate-pulse-slowest {
          animation: pulse-slowest 16s ease-in-out infinite;
        }
        .animate-slide-right {
          animation: slide-right 15s linear infinite;
        }
        .animate-slide-left {
          animation: slide-left 20s linear infinite;
        }
        .shadow-4xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.05);
        }
      `}</style>
    </section>
  );
}
