'use client';

import { Badge } from '@/components/ui/badge';
import type { roleContent, RoleKey } from '@/config/roleContent';
import { useRoleContent } from '@/hooks/useRoleContent';
import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase } from 'lucide-react';
import { useState } from 'react';

interface ExperienceSectionProps {
  content: (typeof roleContent)[RoleKey];
}

export function ExperienceSection({ content }: ExperienceSectionProps) {
  const { roleKey } = useRoleContent();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const resumeHref =
    roleKey === 'frontend'
      ? '/resumes/frontend-resume.pdf'
      : roleKey === 'backend'
      ? '/resumes/backend-resume.pdf'
      : '/resumes/fullstack-resume.pdf';

  return (
    <section
      id='experience'
      className='min-h-screen w-full bg-background py-24 px-6 md:px-12 lg:px-24'
    >
      <div className='max-w-5xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='mb-16'
        >
          <div className='flex items-center gap-4 mb-6'>
            <div className='h-px w-12 bg-primary' />
            <span className='text-primary text-sm font-medium tracking-wider uppercase'>
              Experience
            </span>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        {/* Experience List */}
        <div className='space-y-2'>
          {content.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className='group relative'
            >
              <a
                href='#'
                className='block p-6 md:p-8 -mx-6 md:-mx-8 rounded-lg transition-all duration-300 hover:bg-card/50'
              >
                {/* Hover highlight background */}
                <div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : ''
                  }`}
                />

                <div className='relative grid md:grid-cols-[180px_1fr] gap-4 md:gap-8'>
                  {/* Date Column */}
                  <div className='flex flex-col'>
                    <span className='text-sm text-muted-foreground font-medium tracking-wide'>
                      {exp.duration}
                    </span>
                    {exp.location && (
                      <span className='text-xs text-muted-foreground/70 mt-1'>
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {/* Content Column */}
                  <div className='space-y-4'>
                    {/* Title Row */}
                    <div className='flex items-start justify-between gap-4'>
                      <div>
                        <h3 className='text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-2'>
                          {exp.position}
                          <span className='text-muted-foreground'>·</span>
                          <span className='text-primary'>{exp.company}</span>
                          <ArrowUpRight
                            className={`h-4 w-4 text-primary transition-all duration-300 ${
                              hoveredIndex === index
                                ? 'opacity-100 translate-x-0.5 -translate-y-0.5'
                                : 'opacity-0'
                            }`}
                          />
                        </h3>
                        <Badge
                          variant='outline'
                          className='mt-2 text-xs bg-primary/10 text-primary border-primary/20'
                        >
                          {exp.type}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className='text-muted-foreground text-sm leading-relaxed max-w-2xl'>
                      {exp.description}
                    </p>

                    {/* Achievements - Compact List */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className='space-y-1.5 text-sm text-muted-foreground'>
                        {exp.achievements.slice(0, 3).map((achievement, i) => (
                          <li key={i} className='flex items-start gap-2'>
                            <span className='text-primary mt-1.5 text-[8px]'>
                              ●
                            </span>
                            <span>
                              {achievement.text}
                              {achievement.metric && (
                                <span className='text-primary font-medium ml-1'>
                                  ({achievement.metric})
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Technologies */}
                    <div className='flex flex-wrap gap-2 pt-2'>
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className='px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary'
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* View Full Resume Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mt-16'
        >
          <a
            href={resumeHref}
            className='group inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-colors duration-300'
          >
            <Briefcase className='h-4 w-4' />
            <span className='border-b border-transparent group-hover:border-primary transition-colors duration-300'>
              View Full Resume
            </span>
            <ArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
