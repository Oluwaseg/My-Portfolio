'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // useEffect(() => {
  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top 75%",
  //       end: "bottom top",
  //       toggleActions: "play none none reverse",
  //     },
  //   })

  //   tl.fromTo(
  //     [formRef.current, contactInfoRef.current],
  //     { opacity: 0, y: 80, scale: 0.95 },
  //     { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out", stagger: 0.2 },
  //   )

  //   return () => {
  //     tl.kill()
  //   }
  // }, [])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'sage@example.com',
      href: 'mailto:sage@example.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: '#',
    },
  ];

  return (
    <section
      id='contact'
      ref={sectionRef}
      className='min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background py-20 px-4 md:px-8 relative overflow-hidden'
    >
      {/* Background Elements */}
      <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]' />
      <div className='absolute top-1/4 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl' />
      <div className='absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl' />

      <div className='container mx-auto max-w-6xl relative z-10'>
        <div className='text-center mb-16'>
          <h2 className='text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent'>
            Let's Connect
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full mb-6' />
          <p className='text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto'>
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto'>
          {/* Contact Form */}
          <Card
            ref={formRef}
            className='bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl'
          >
            <CardHeader className='pb-6'>
              <CardTitle className='text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent'>
                Send Message
              </CardTitle>
              <CardDescription className='text-lg text-muted-foreground'>
                Fill out the form below and I'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='firstName'
                        className='text-sm font-medium'
                      >
                        First Name
                      </Label>
                      <Input
                        id='firstName'
                        type='text'
                        placeholder='John'
                        required
                        className='h-12 bg-background/50 border-border/50 focus:border-primary transition-colors duration-300'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='lastName' className='text-sm font-medium'>
                        Last Name
                      </Label>
                      <Input
                        id='lastName'
                        type='text'
                        placeholder='Doe'
                        required
                        className='h-12 bg-background/50 border-border/50 focus:border-primary transition-colors duration-300'
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='email' className='text-sm font-medium'>
                      Email
                    </Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='john@example.com'
                      required
                      className='h-12 bg-background/50 border-border/50 focus:border-primary transition-colors duration-300'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='subject' className='text-sm font-medium'>
                      Subject
                    </Label>
                    <Input
                      id='subject'
                      type='text'
                      placeholder='Project Discussion'
                      required
                      className='h-12 bg-background/50 border-border/50 focus:border-primary transition-colors duration-300'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='message' className='text-sm font-medium'>
                      Message
                    </Label>
                    <Textarea
                      id='message'
                      placeholder='Tell me about your project...'
                      rows={6}
                      required
                      className='bg-background/50 border-border/50 focus:border-primary transition-colors duration-300 resize-none'
                    />
                  </div>
                  <Button
                    type='submit'
                    className='w-full h-12 text-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 hover:scale-[1.02]'
                  >
                    <Send className='h-5 w-5 mr-2' />
                    Send Message
                  </Button>
                </form>
              ) : (
                <div className='text-center py-12'>
                  <CheckCircle className='h-16 w-16 text-green-500 mx-auto mb-4' />
                  <h3 className='text-2xl font-bold text-green-600 mb-2'>
                    Message Sent!
                  </h3>
                  <p className='text-muted-foreground'>
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div ref={contactInfoRef} className='space-y-8'>
            <Card className='bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Prefer direct contact? Reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className='flex items-center space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 hover:scale-[1.02] group'
                  >
                    <div className='p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300'>
                      <item.icon className='h-6 w-6 text-primary' />
                    </div>
                    <div>
                      <p className='font-medium text-foreground'>
                        {item.label}
                      </p>
                      <p className='text-muted-foreground group-hover:text-foreground transition-colors duration-300'>
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card className='bg-gradient-to-br from-primary/10 via-blue-500/10 to-orange-500/10 backdrop-blur-sm border-border/50 shadow-2xl'>
              <CardContent className='p-8 text-center'>
                <h3 className='text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent'>
                  Let's Build Something Amazing
                </h3>
                <p className='text-muted-foreground mb-6'>
                  Whether you have a project in mind or just want to chat about
                  technology, I'm always excited to connect with fellow
                  innovators.
                </p>
                <div className='flex justify-center space-x-4'>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-primary'>50+</div>
                    <div className='text-sm text-muted-foreground'>
                      Projects
                    </div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-primary'>5+</div>
                    <div className='text-sm text-muted-foreground'>Years</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-2xl font-bold text-primary'>100%</div>
                    <div className='text-sm text-muted-foreground'>
                      Satisfaction
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
