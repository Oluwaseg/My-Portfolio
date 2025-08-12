'use client';

import { AboutSection } from '@/components/about-section';
import { Navbar } from '@/components/common/Navbar';
import { ContactSection } from '@/components/contact-section';
import { ExperienceSection } from '@/components/experience-section';
import { HeroSection } from '@/components/hero-section';
import { ProjectsSection } from '@/components/projects-section';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function Page() {
  return (
    <ThemeProvider>
      <div className='relative min-h-screen bg-background text-foreground'>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
        </main>
      </div>
    </ThemeProvider>
  );
}
