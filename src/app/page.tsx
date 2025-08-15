'use client';

import { AboutSection } from '@/components/About';
import { Navbar } from '@/components/common/Navbar';
import { ContactSection } from '@/components/Contact';
import { ExperienceSection } from '@/components/Experience';
import { HeroSection } from '@/components/Hero';
import { ProjectsSection } from '@/components/Projects';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ScrollProgress } from '@/components/ScrollProgress';
import { useRoleContent } from '@/hooks/useRoleContent';
import Head from 'next/head';

export default function Page() {
  const { content, roleKey } = useRoleContent();
  
  return (
    <ThemeProvider>
      <Head>
        <title>{`Samuel Oluwasegun - ${content.roleBadge} Portfolio`}</title>
        <meta name="description" content={content.aboutText} />
        <meta name="keywords" content={`${content.roleBadge}, ${content.expertiseFocus} developer, web development, React, Next.js, Node.js, portfolio`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Samuel Oluwasegun - ${content.roleBadge} Portfolio`} />
        <meta property="og:description" content={content.aboutText} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.samuel-oluwasegun.bio" />
        <meta property="og:image" content="/og-image.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Samuel Oluwasegun - ${content.roleBadge} Portfolio`} />
        <meta name="twitter:description" content={content.aboutText} />
        <meta name="twitter:image" content="/og-image.png" />
        
        {/* Role-specific structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Samuel Oluwasegun",
              "jobTitle": content.roleBadge,
              "description": content.aboutText,
              "url": "https://www.samuel-oluwasegun.bio",
              "image": "https://www.samuel-oluwasegun.bio/og-image.png",
              "sameAs": [
                "https://github.com/oluwaseg",
                "https://www.linkedin.com/in/samuel-oluwasegun-39ab37253"
              ],
              "email": "oluwasegunsam56@gmail.com",
              "telephone": "+2349048095407",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Nigeria"
              },
              "knowsAbout": content.skills ? Object.values(content.skills).flat() : [
                "React", "Next.js", "Node.js", "TypeScript", "JavaScript"
              ],
              "worksFor": content.experience ? content.experience.map(exp => ({
                "@type": "Organization",
                "name": exp.company,
                "jobTitle": exp.position,
                "startDate": exp.duration.split(' – ')[0],
                "endDate": exp.duration.split(' – ')[1] || "Present"
              })) : [],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "HNG Virtual Program"
              }
            })
          }}
        />
      </Head>
      
      <div className='relative min-h-screen bg-background text-foreground'>
        <ScrollProgress />
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
