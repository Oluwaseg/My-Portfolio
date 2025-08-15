'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { roleContent, RoleKey } from '@/config/roleContent';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Award,
  Calendar,
  Check,
  Code,
  ExternalLink,
  MapPin,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

// Icon mapping for achievements
const iconMap = {
  TrendingUp,
  Award,
  Zap,
  Check,
  Users,
  Star,
};

interface ExperienceSectionProps {
  content: typeof roleContent[RoleKey];
}

export function ExperienceSection({ content }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);



  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-180deg);
          }
        }
        @keyframes floatFast {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(360deg);
          }
        }
        @keyframes sideFloat {
          0%,
          100% {
            transform: translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateX(10px) rotate(180deg);
          }
        }
        .float-1 {
          animation: float 4s ease-in-out infinite;
        }
        .float-2 {
          animation: floatSlow 5s ease-in-out infinite 0.5s;
        }
        .float-3 {
          animation: floatFast 3s ease-in-out infinite 1s;
        }
        .float-4 {
          animation: sideFloat 6s ease-in-out infinite 1.5s;
        }
      `}</style>

      <section
        id='experience'
        ref={sectionRef}
        className='min-h-screen w-full bg-gradient-to-br from-background via-muted/5 to-background py-20 px-4 md:px-8 relative overflow-hidden'
      >
        <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]' />
        <div className='absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse' />
        <div className='absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/3 rounded-full blur-3xl animate-pulse' />

        <div
          ref={(el) => {
            if (el) floatingElementsRef.current[0] = el;
          }}
          className='absolute top-20 left-10 text-primary/20 float-1'
        >
          <Sparkles className='h-6 w-6' />
        </div>
        <div
          ref={(el) => {
            if (el) floatingElementsRef.current[1] = el;
          }}
          className='absolute top-40 right-20 text-blue-500/20 float-2'
        >
          <Code className='h-8 w-8' />
        </div>
        <div
          ref={(el) => {
            if (el) floatingElementsRef.current[2] = el;
          }}
          className='absolute bottom-40 left-20 text-purple-500/20 float-3'
        >
          <Star className='h-7 w-7' />
        </div>
        <div
          ref={(el) => {
            if (el) floatingElementsRef.current[3] = el;
          }}
          className='absolute bottom-20 right-10 text-green-500/20 float-4'
        >
          <Zap className='h-6 w-6' />
        </div>

        <div className='container mx-auto max-w-7xl relative z-10'>
          <div ref={titleRef} className='text-center mb-20'>
            <div className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-8 shadow-lg shadow-primary/10'>
              <Calendar className='h-4 w-4' />
              Professional Journey
              <div className='w-2 h-2 bg-primary rounded-full animate-pulse' />
            </div>

            <h2 className='text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent drop-shadow-sm'>
              Experience
            </h2>

            <div className='w-32 h-1.5 bg-gradient-to-r from-primary via-blue-500 to-purple-500 mx-auto rounded-full mb-8 shadow-lg shadow-primary/20' />

            <p className='text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light'>
              A journey through innovative companies, impactful projects, and
              continuous growth in the ever-evolving world of technology
            </p>
          </div>

                      <div className='space-y-12'>
              {content.experience.map((exp, index) => (
              <Card
                key={exp.id}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el as HTMLDivElement;
                }}
                className='group relative overflow-hidden bg-card/60 backdrop-blur-sm border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 hover:rotate-1'
              >
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
                        {exp.achievements.map((achievement, i) => {
                          const IconComponent = iconMap[achievement.icon as keyof typeof iconMap];
                          return (
                          <div
                            key={i}
                            className='group/achievement flex items-start gap-4 p-4 rounded-2xl bg-background/30 backdrop-blur-sm border border-border/30 hover:bg-background/50 transition-all duration-300 hover:scale-105'
                          >
                            <div
                              className={`p-2 rounded-xl bg-gradient-to-br ${exp.color} bg-opacity-10 group-hover/achievement:bg-opacity-20 transition-all duration-300`}
                            >
                              {IconComponent && <IconComponent className='h-5 w-5 text-primary' />}
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
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className='text-center mt-20'>
            <Button
              size='lg'
              className='bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-2xl text-lg px-10 py-7 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl font-semibold'
            >
              <ExternalLink className='mr-3 h-5 w-5' />
              View Full Resume
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
