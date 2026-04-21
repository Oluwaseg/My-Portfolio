'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Show after 1 second delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem('cookieConsent', 'denied');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 animate-slide-up'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/20 backdrop-blur-sm'
        onClick={handleDeny}
      />

      {/* Cookie Banner */}
      <div className='relative m-4 md:m-6 ml-4 mr-4 md:ml-6 md:mr-6 mb-8 md:mb-12 max-w-md md:max-w-2xl mx-auto rounded-lg border border-border/50 bg-card p-6 shadow-2xl'>
        <button
          onClick={handleDeny}
          className='absolute top-4 right-4 p-1 hover:bg-secondary/50 rounded-lg transition-colors'
          aria-label='Close'
        >
          <X className='w-5 h-5 text-muted-foreground' />
        </button>

        <div className='pr-8'>
          <h3 className='text-lg font-semibold text-foreground mb-2'>
            🍪 Cookie Consent
          </h3>
          <p className='text-sm text-muted-foreground mb-4 leading-relaxed'>
            We use cookies to enhance your browsing experience and analyze site
            traffic. By clicking "Accept All", you consent to our use of
            cookies. You can review our{' '}
            <Link
              href='/privacy-policy'
              className='text-primary hover:underline font-medium'
            >
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link
              href='/terms-and-conditions'
              className='text-primary hover:underline font-medium'
            >
              Terms & Conditions
            </Link>{' '}
            for more information.
          </p>

          <div className='flex gap-3'>
            <Button
              onClick={handleAccept}
              className='flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-all duration-300'
            >
              Accept All
            </Button>
            <Button
              onClick={handleDeny}
              variant='outline'
              className='flex-1 rounded-lg font-medium transition-all duration-300'
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
