'use client';

import { Logo } from '@/assets';
import { socialLinks } from '@/config/socialLinks';
import { useModal } from '@/contexts/ModalContext';
import { useRoleContent } from '@/hooks/useRoleContent';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const { content } = useRoleContent();
  const { isModalOpen, setIsModalOpen } = useModal();
  const quickLinks = [
    { label: 'About', href: '#about' },
    // { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const year = new Date().getFullYear();

  return (
    <footer className='relative border-t border-border/50 bg-background'>
      <div className='absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none' />

      <div className='relative max-w-6xl mx-auto px-6 py-16 md:py-24'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-16'>
          {/* Brand */}
          <div className='md:col-span-2'>
            <Link
              href='/'
              className='group flex items-center gap-3 mb-4 opacity-90 hover:opacity-100 transition'
            >
              <div className='relative'>
                <div className='w-10 h-10 rounded-lg overflow-hidden bg-secondary/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-105'>
                  <Image
                    src={Logo}
                    alt='Logo'
                    width={40}
                    height={40}
                    className='object-cover'
                  />
                </div>

                {/* Subtle glow (less aggressive than navbar) */}
                <div className='absolute inset-0 rounded-lg bg-primary/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10' />
              </div>

              <div>
                <p className='text-base font-semibold text-foreground leading-none'>
                  SAMUEL OLUWASEGUN
                </p>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  {content.roleBadge}
                </p>
              </div>
            </Link>

            <p className='text-muted-foreground leading-relaxed mb-4'>
              {content.roleBadge || 'Full Stack Developer'} crafting elegant
              digital experiences.
            </p>

            <p className='text-sm text-muted-foreground'>
              Available for freelance and full-time opportunities.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className='text-sm font-semibold text-foreground mb-4 uppercase tracking-wider'>
              Navigation
            </h4>

            <ul className='space-y-2'>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className='text-muted-foreground hover:text-primary transition-colors text-sm'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className='text-sm font-semibold text-foreground mb-4 uppercase tracking-wider'>
              Let's Connect
            </h4>

            <button
              onClick={() => setIsModalOpen(true)}
              className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium group'
            >
              Get in Touch
              <ExternalLink className='h-4 w-4 group-hover:translate-x-0.5 transition-transform' />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className='h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8' />

        {/* Bottom row */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          {/* Socials */}
          <div className='flex items-center gap-4'>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className='text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted rounded-lg'
              >
                <Icon className='h-5 w-5' />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className='flex flex-col md:flex-row items-center gap-6 text-xs text-muted-foreground'>
            <span>&copy; {year} Samuel Oluwasegun. All rights reserved.</span>

            <div className='flex gap-4'>
              <Link
                href='/privacy-policy'
                className='hover:text-foreground transition-colors'
              >
                Privacy
              </Link>
              <Link
                href='/terms-and-conditions'
                className='hover:text-foreground transition-colors'
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
