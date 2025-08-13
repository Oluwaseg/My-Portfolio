'use client';

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
import { ExternalLink, Github, Star } from 'lucide-react';
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
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!API_URL) {
          throw new Error('API URL not configured');
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

  // useEffect(() => {
  //   if (!loading && projects.length > 0) {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: 'top 75%',
  //         end: 'bottom top',
  //         toggleActions: 'play none none reverse',
  //       },
  //     });

  //     tl.fromTo(
  //       titleRef.current,
  //       { opacity: 0, y: 100 },
  //       { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
  //     );
  //     tl.fromTo(
  //       cardsRef.current,
  //       { opacity: 0, y: 80, scale: 0.9 },
  //       {
  //         opacity: 1,
  //         y: 0,
  //         scale: 1,
  //         duration: 0.8,
  //         ease: 'power3.out',
  //         stagger: 0.15,
  //       },
  //       '-=0.5'
  //     );
  //   }

  //   return () => {
  //     ScrollTrigger.getAll().forEach((st) => st.kill());
  //   };
  // }, [loading, projects]);

  if (loading) {
    return (
      <section
        id='projects'
        className='min-h-screen w-full bg-gradient-to-br from-muted/30 via-background to-muted/50 py-20 px-4 md:px-8 relative overflow-hidden flex items-center justify-center'
      >
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
          <p className='text-xl text-muted-foreground'>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id='projects'
        className='min-h-screen w-full bg-gradient-to-br from-muted/30 via-background to-muted/50 py-20 px-4 md:px-8 relative overflow-hidden flex items-center justify-center'
      >
        <div className='text-center'>
          <p className='text-xl text-red-500 mb-4'>{error}</p>
          <Button
            className='bg-blue-600'
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section
      id='projects'
      ref={sectionRef}
      className='min-h-screen w-full bg-gradient-to-br from-muted/30 via-background to-muted/50 py-20 px-4 md:px-8 relative overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]' />
      <div className='absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl' />
      <div className='absolute bottom-1/3 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-7xl relative z-10'>
        <div ref={titleRef} className='text-center mb-20'>
          <h2 className='text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent'>
            Featured Work
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full mb-6' />
          <p className='text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto'>
            A showcase of projects that push boundaries and deliver exceptional
            user experiences
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className='mb-16'>
            <h3 className='text-2xl font-bold mb-8 text-center'>
              🌟 Featured Projects
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
              {featuredProjects.map((project, index) => (
                <Card
                  key={project._id}
                  ref={(el) => (cardsRef.current[index] = el as HTMLDivElement)}
                  className='group relative overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2'
                >
                  <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                  <div className='relative w-full h-64 bg-gradient-to-br from-muted to-muted/50 overflow-hidden'>
                    <Image
                      src={
                        project.image ||
                        '/placeholder.svg?height=300&width=500&text=' +
                          encodeURIComponent(project.title)
                      }
                      alt={project.title}
                      width={500}
                      height={300}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                      priority={index < 2}
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />

                    {/* Stats Overlay */}
                    {project.stats && (
                      <div className='absolute top-4 right-4 flex gap-2'>
                        <div className='bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-white text-sm'>
                          <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                          {project.stats.stars}
                        </div>
                      </div>
                    )}
                  </div>

                  <CardHeader className='pb-4'>
                    <div className='flex items-center justify-between'>
                      <CardTitle className='text-2xl font-bold group-hover:text-primary transition-colors duration-300'>
                        {project.title}
                      </CardTitle>
                      <Badge
                        variant='secondary'
                        className='bg-primary/10 text-primary border-primary/20'
                      >
                        Featured
                      </Badge>
                    </div>
                    <CardDescription className='text-base leading-relaxed'>
                      {project.description}
                    </CardDescription>
                    {project.longDescription && (
                      <p className='text-sm text-muted-foreground italic'>
                        {project.longDescription}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className='pb-4'>
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {project.technologies
                        .flatMap((tech) =>
                          tech.split(',').map((item) => item.trim())
                        )
                        .map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant='outline'
                            className='text-xs px-2 py-1 bg-secondary/50 hover:bg-secondary transition-colors duration-300'
                          >
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </CardContent>

                  <CardFooter className='flex justify-between pt-0'>
                    <Link
                      href={project.liveLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Button variant='default' size='sm' className='group/btn'>
                        <ExternalLink className='h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300' />
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
                        size='sm'
                        className='group/btn bg-transparent'
                      >
                        <Github className='h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300' />
                        Source Code
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className='text-2xl font-bold mb-8 text-center'>
              💼 More Projects
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {otherProjects.map((project, index) => (
                <Card
                  key={project._id}
                  ref={(el) =>
                    (cardsRef.current[featuredProjects.length + index] =
                      el as HTMLDivElement)
                  }
                  className='group relative overflow-hidden bg-card/60 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                >
                  <div className='relative w-full h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden'>
                    <Image
                      src={
                        project.image ||
                        '/placeholder.svg?height=250&width=400&text=' +
                          encodeURIComponent(project.title)
                      }
                      alt={project.title}
                      width={400}
                      height={250}
                      unoptimized={project.image?.startsWith(
                        'https://res.cloudinary.com'
                      )}
                      className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                    {project.stats && (
                      <div className='absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-white text-xs'>
                        <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                        {project.stats.stars}
                      </div>
                    )}
                  </div>

                  <CardHeader className='pb-3'>
                    <CardTitle className='text-lg font-semibold group-hover:text-primary transition-colors duration-300'>
                      {project.title}
                    </CardTitle>
                    <CardDescription className='text-sm line-clamp-2'>
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className='pb-3'>
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
                            className='text-xs px-2 py-0.5 bg-secondary/70'
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
                    <Link
                      href={project.liveLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Button
                        variant='outline'
                        size='sm'
                        className='text-xs bg-transparent'
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
                      <Button variant='ghost' size='sm' className='text-xs'>
                        <Github className='h-3 w-3 mr-1' />
                        Code
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No projects message */}
        {projects.length === 0 && (
          <div className='text-center py-20'>
            <p className='text-xl text-muted-foreground'>No projects found.</p>
          </div>
        )}
      </div>
    </section>
  );
}
