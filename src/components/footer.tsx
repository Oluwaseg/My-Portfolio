'use client';

import { useRoleContent } from '@/hooks/useRoleContent';
import { ExternalLink, Github, Linkedin, Mail, Twitter } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const { content } = useRoleContent();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com',
      label: 'GitHub',
      color: 'hover:text-white',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com',
      label: 'LinkedIn',
      color: 'hover:text-blue-400',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com',
      label: 'Twitter',
      color: 'hover:text-sky-400',
    },
    {
      icon: Mail,
      href: 'mailto:hello@example.com',
      label: 'Email',
      color: 'hover:text-primary',
    },
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className='relative border-t border-border/50 bg-background'>
      <div className='absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none' />

      <div className='relative max-w-6xl mx-auto px-6 py-16 md:py-24'>
        {/* Main Footer Grid */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 mb-16'>
          {/* Brand Section */}
          <div className='md:col-span-2'>
            <h3 className='text-2xl font-bold text-foreground mb-3'>
              Samuel Oluwasegun
            </h3>
            <p className='text-muted-foreground leading-relaxed mb-4'>
              {content.roleBadge || 'Full Stack Developer'} crafting elegant
              digital experiences.
            </p>
            <p className='text-sm text-muted-foreground'>
              Currently available for freelance work and exciting full-time
              opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-sm font-semibold text-foreground mb-4 uppercase tracking-wider'>
              Navigation
            </h4>
            <ul className='space-y-2'>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className='text-muted-foreground hover:text-primary transition-colors duration-300 text-sm'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Section */}
          <div>
            <h4 className='text-sm font-semibold text-foreground mb-4 uppercase tracking-wider'>
              Let's Connect
            </h4>
            <Link
              href='#contact'
              className='inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 text-sm font-medium group'
            >
              Get in Touch
              <ExternalLink className='h-4 w-4 group-hover:translate-x-0.5 transition-transform' />
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className='h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8' />

        {/* Social Links & Copyright */}
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          {/* Social Icons */}
          <div className='flex items-center gap-4'>
            {socialLinks.map(({ icon: Icon, href, label, color }) => (
              <Link
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className={`text-muted-foreground ${color} transition-colors duration-300 p-2 hover:bg-muted rounded-lg`}
              >
                <Icon className='h-5 w-5' />
              </Link>
            ))}
          </div>

          {/* Copyright & Links */}
          <div className='flex flex-col md:flex-row items-center gap-6 text-xs text-muted-foreground'>
            <span>&copy; 2025 Samuel Oluwasegun. All rights reserved.</span>
            <div className='flex gap-4'>
              <Link
                href='#'
                className='hover:text-foreground transition-colors'
              >
                Privacy
              </Link>
              <Link
                href='#'
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
