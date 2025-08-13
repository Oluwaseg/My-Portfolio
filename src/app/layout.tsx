import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
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
    'An interactive developer portfolio showcasing projects and skills.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${roboto.variable} font-sans`}
        style={{
          fontFamily: 'var(--font-poppins), var(--font-roboto), sans-serif',
        }}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
