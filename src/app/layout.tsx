import { SmoothScrollProvider } from '@/components/SmoothScrollProvider';
import type { Metadata } from 'next';
import { Poppins, Roboto } from 'next/font/google';
import type React from 'react';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Samuel Oluwasegun - Full Stack Developer Portfolio',
  description:
    'Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my projects, skills, and professional experience.',
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'Node.js Developer',
    'Frontend Developer',
    'Backend Developer',
    'Web Developer',
    'JavaScript Developer',
    'TypeScript Developer',
    'Portfolio',
    'Samuel Oluwasegun',
    'Software Engineer',
    'Web Development',
    'UI/UX Design',
    'API Development',
    'Database Design',
    'DevOps',
    'GitHub',
    'LinkedIn',
  ],
  authors: [{ name: 'Samuel Oluwasegun' }],
  creator: 'Samuel Oluwasegun',
  publisher: 'Samuel Oluwasegun',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.samuel-oluwasegun.bio'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.samuel-oluwasegun.bio',
    siteName: 'Samuel Oluwasegun Portfolio',
    title: 'Samuel Oluwasegun - Full Stack Developer Portfolio',
    description:
      'Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies. View my projects, skills, and professional experience.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Samuel Oluwasegun - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samuel Oluwasegun - Full Stack Developer Portfolio',
    description:
      'Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies.',
    images: ['/og-image.png'],
    creator: '@samuel_oluwasegun',
    site: '@samuel_oluwasegun',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'Sbn2VOLiuxeaTXI7Xr0wOoObKTqTtFPE4tq0u__gQ-k',
    yandex: '44df016949096fd8',
    other: {
      'msvalidate.01': '2817FA8E9580ED50CB3A80C6964A30B0',
    },
  },
  category: 'technology',
  classification: 'Portfolio',
  other: {
    'theme-color': '#3b82f6',
    'msapplication-TileColor': '#3b82f6',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Samuel Oluwasegun Portfolio',
    'application-name': 'Samuel Oluwasegun Portfolio',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#3b82f6' />
        <meta name='msapplication-TileColor' content='#3b82f6' />
        <meta name='theme-color' content='#3b82f6' />

        {/* Structured Data Schema */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Samuel Oluwasegun',
              jobTitle: 'Full Stack Developer',
              description:
                'Experienced Full Stack Developer specializing in React, Next.js, Node.js, and modern web technologies',
              url: 'https://www.samuel-oluwasegun.bio',
              image: 'https://www.samuel-oluwasegun.bio/og-image.png',
              sameAs: [
                'https://github.com/oluwaseg',
                'https://www.linkedin.com/in/samuel-oluwasegun-39ab37253',
              ],
              email: 'oluwasegunsam56@gmail.com',
              telephone: '+2349048095407',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'Nigeria',
              },
              knowsAbout: [
                'React',
                'Next.js',
                'Node.js',
                'TypeScript',
                'JavaScript',
                'PostgreSQL',
                'MongoDB',
                'Redis',
                'Docker',
                'GitHub Actions',
                'Web Development',
                'API Development',
                'Database Design',
                'UI/UX Design',
              ],
              worksFor: [
                {
                  '@type': 'Organization',
                  name: 'Finchat',
                  jobTitle: 'Full Stack Engineer',
                  startDate: '2021-01',
                  endDate: '2022-08',
                },
                {
                  '@type': 'Organization',
                  name: 'Noma Gaming',
                  jobTitle: 'Full Stack Developer',
                  startDate: '2019-06',
                  endDate: '2020-12',
                },
              ],
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'HNG Virtual Program',
              },
              hasCredential: [
                {
                  '@type': 'EducationalOccupationalCredential',
                  credentialCategory: 'Web Development',
                  recognizedBy: 'HNG Virtual Program',
                },
              ],
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Samuel Oluwasegun Portfolio',
              url: 'https://www.samuel-oluwasegun.bio',
              logo: 'https://www.samuel-oluwasegun.bio/logo.png',
              description:
                'Professional portfolio showcasing web development projects and skills',
              founder: {
                '@type': 'Person',
                name: 'Samuel Oluwasegun',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'oluwasegunsam56@gmail.com',
                telephone: '+2349048095407',
              },
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Samuel Oluwasegun Portfolio',
              url: 'https://www.samuel-oluwasegun.bio',
              description:
                'Professional portfolio website showcasing web development projects, skills, and experience',
              author: {
                '@type': 'Person',
                name: 'Samuel Oluwasegun',
              },
              publisher: {
                '@type': 'Person',
                name: 'Samuel Oluwasegun',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target:
                  'https://www.samuel-oluwasegun.bio?search={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} ${roboto.variable} font-sans`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
