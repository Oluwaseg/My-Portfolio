'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import emailjs from '@emailjs/browser';
import {
  ArrowUpRight,
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const autoReplyTemplateId =
        process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID ||
        'template_24krlbk';
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS configuration is missing');
      }

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`.trim(),
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Samuel Oluwasegun',
      };

      const autoReplyParams = {
        to_name: `${formData.firstName} ${formData.lastName}`.trim(),
        to_email: formData.email,
        from_name: 'Samuel Oluwasegun',
        reply_to: 'samueloluwasegun999@gmail.com',
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      try {
        await emailjs.send(
          serviceId,
          autoReplyTemplateId,
          autoReplyParams,
          publicKey
        );
      } catch {}

      setStatus('success');
      setStatusMessage("Message sent! I'll get back to you soon.");
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch {
      setStatus('error');
      setStatusMessage(
        'Failed to send. Please try again or email me directly.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'oluwasegunsam56@gmail.com',
      href: 'mailto:oluwasegunsam56@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+234 904 809 5407',
      href: 'tel:+2349048095407',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Lagos, Nigeria',
      href: '#',
    },
  ];

  return (
    <section
      id='contact'
      ref={sectionRef}
      className='min-h-screen px-6 py-24 lg:py-32'
    >
      <div className='max-w-5xl mx-auto'>
        {/* Section Header */}
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className='text-primary font-mono text-sm block mb-4'>
            04. What&apos;s Next?
          </span>
          <h2 className='text-4xl md:text-5xl font-bold text-foreground mb-6'>
            Get In Touch
          </h2>
          <p className='text-muted-foreground max-w-lg mx-auto leading-relaxed'>
            I&apos;m currently open to new opportunities. Whether you have a
            project in mind or just want to chat, my inbox is always open.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-16'>
          {/* Contact Info Side */}
          <div
            className={`space-y-8 transition-all duration-700 delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div>
              <h3 className='text-xl font-semibold text-foreground mb-6'>
                Contact Information
              </h3>
              <div className='space-y-4'>
                {contactLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className='group flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card hover:border-primary/30 transition-all'
                  >
                    <div className='p-2 rounded-lg bg-secondary/50 group-hover:bg-primary/10 transition-colors'>
                      <item.icon className='h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors' />
                    </div>
                    <div className='flex-1'>
                      <p className='text-xs text-muted-foreground uppercase tracking-wider'>
                        {item.label}
                      </p>
                      <p className='text-foreground font-medium'>
                        {item.value}
                      </p>
                    </div>
                    <ArrowUpRight className='h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity' />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick CTA */}
            <div className='p-6 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20'>
              <h4 className='text-lg font-semibold text-foreground mb-2'>
                Let&apos;s Build Something
              </h4>
              <p className='text-sm text-muted-foreground mb-4'>
                Available for freelance projects, full-time roles, and exciting
                collaborations.
              </p>
              <div className='flex gap-6 text-center'>
                <div>
                  <p className='text-2xl font-bold text-primary'>50+</p>
                  <p className='text-xs text-muted-foreground'>Projects</p>
                </div>
                <div>
                  <p className='text-2xl font-bold text-primary'>5+</p>
                  <p className='text-xs text-muted-foreground'>Years Exp</p>
                </div>
                <div>
                  <p className='text-2xl font-bold text-primary'>100%</p>
                  <p className='text-xs text-muted-foreground'>Dedication</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Side */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className='p-6 lg:p-8 rounded-xl border border-border/50 bg-card'>
              <h3 className='text-xl font-semibold text-foreground mb-2'>
                Send a Message
              </h3>
              <p className='text-sm text-muted-foreground mb-6'>
                Fill out the form and I&apos;ll get back to you within 24 hours.
              </p>

              {status === 'success' ? (
                <div className='text-center py-12'>
                  <div className='w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4'>
                    <CheckCircle className='h-8 w-8 text-green-500' />
                  </div>
                  <h4 className='text-xl font-semibold text-foreground mb-2'>
                    Message Sent!
                  </h4>
                  <p className='text-muted-foreground text-sm'>
                    {statusMessage}
                  </p>
                  <Button
                    variant='outline'
                    className='mt-6 bg-transparent'
                    onClick={() => setStatus('idle')}
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-5'>
                  <div className='grid sm:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='firstName'
                        className='text-sm text-muted-foreground'
                      >
                        First Name
                      </Label>
                      <Input
                        id='firstName'
                        type='text'
                        placeholder='John'
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        className='bg-background border-border/50 focus:border-primary'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='lastName'
                        className='text-sm text-muted-foreground'
                      >
                        Last Name
                      </Label>
                      <Input
                        id='lastName'
                        type='text'
                        placeholder='Doe'
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className='bg-background border-border/50 focus:border-primary'
                      />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label
                      htmlFor='email'
                      className='text-sm text-muted-foreground'
                    >
                      Email
                    </Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='john@example.com'
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className='bg-background border-border/50 focus:border-primary'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label
                      htmlFor='subject'
                      className='text-sm text-muted-foreground'
                    >
                      Subject
                    </Label>
                    <Input
                      id='subject'
                      type='text'
                      placeholder='Project Discussion'
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className='bg-background border-border/50 focus:border-primary'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label
                      htmlFor='message'
                      className='text-sm text-muted-foreground'
                    >
                      Message
                    </Label>
                    <Textarea
                      id='message'
                      placeholder='Tell me about your project...'
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className='bg-background border-border/50 focus:border-primary resize-none'
                    />
                  </div>

                  {status === 'error' && (
                    <div className='p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm'>
                      {statusMessage}
                    </div>
                  )}

                  <Button type='submit' disabled={isLoading} className='w-full'>
                    {isLoading ? (
                      <>
                        <Loader2 className='h-4 w-4 mr-2 animate-spin' />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div
          className={`mt-24 text-center transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className='text-muted-foreground mb-6'>
            Prefer email? Reach out directly at{' '}
            <a
              href='mailto:oluwasegunsam56@gmail.com'
              className='text-primary hover:underline'
            >
              oluwasegunsam56@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
