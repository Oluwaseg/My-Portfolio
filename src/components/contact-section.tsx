'use client';

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
import {
  CheckCircle,
  Code,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Zap,
} from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'oluwasegunsam56@gmail.com',
      href: 'mailto:oluwasegunsam56@gmail.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+2349048095407',
      href: 'tel:+2349048095407',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Lagos, Nigeria',
      href: '#',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  return (
    <section
      id='contact'
      className='min-h-screen w-full bg-gradient-to-br from-background via-muted/20 to-background py-20 px-4 md:px-8 relative overflow-hidden'
    >
      {/* Enhanced Floating Background Elements */}
      <div className='absolute inset-0'>
        {/* Floating Particles */}
        <div className='absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm animate-float-slow opacity-60' />
        <div className='absolute top-40 right-20 w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full blur-sm animate-float-medium opacity-50' />
        <div className='absolute bottom-40 left-1/4 w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-sm animate-float-fast opacity-70' />
        <div className='absolute top-1/3 right-1/3 w-5 h-5 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full blur-sm animate-float-slow opacity-40' />
        <div className='absolute bottom-20 right-10 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-sm animate-float-medium opacity-60' />

        {/* Floating Icons */}
        <div className='absolute top-32 left-1/3 text-primary/20 animate-float-slow'>
          <Sparkles className='h-8 w-8' />
        </div>
        <div className='absolute bottom-32 right-1/4 text-blue-500/20 animate-float-medium'>
          <Zap className='h-10 w-10' />
        </div>
        <div className='absolute top-1/2 left-20 text-purple-500/20 animate-float-fast'>
          <Code className='h-6 w-6' />
        </div>

        {/* Animated Gradient Orbs */}
        <div className='absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow' />
        <div className='absolute bottom-1/4 right-1/3 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse-medium' />

        {/* Grid Pattern */}
        <div className='absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]' />
      </div>

      <div className='container mx-auto max-w-6xl relative z-10'>
        <div
          data-aos='fade-up'
          data-aos-duration='1200'
          data-aos-easing='ease-out-back'
          className='text-center mb-16'
        >
          <h2 className='text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent'>
            Let&apos;s Connect
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto rounded-full mb-6' />
          <p className='text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto'>
            Ready to bring your ideas to life? Let&apos;s discuss your next
            project
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto'>
          {/* Enhanced Contact Form */}
          <Card
            data-aos='fade-right'
            data-aos-delay='200'
            data-aos-duration='800'
            className='bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group'
          >
            <CardHeader className='pb-6'>
              <CardTitle className='text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-blue-600 transition-all duration-300'>
                Send Message
              </CardTitle>
              <CardDescription className='text-lg text-muted-foreground'>
                Fill out the form below and I&apos;ll get back to you within 24
                hours
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
                        onFocus={() => setFocusedField('firstName')}
                        onBlur={() => setFocusedField(null)}
                        className={`h-12 bg-background/50 border-border/50 transition-all duration-300 ${
                          focusedField === 'firstName'
                            ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                            : 'hover:border-primary/50'
                        }`}
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
                        onFocus={() => setFocusedField('lastName')}
                        onBlur={() => setFocusedField(null)}
                        className={`h-12 bg-background/50 border-border/50 transition-all duration-300 ${
                          focusedField === 'lastName'
                            ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                            : 'hover:border-primary/50'
                        }`}
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
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`h-12 bg-background/50 border-border/50 transition-all duration-300 ${
                        focusedField === 'email'
                          ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                          : 'hover:border-primary/50'
                      }`}
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
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      className={`h-12 bg-background/50 border-border/50 transition-all duration-300 ${
                        focusedField === 'subject'
                          ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                          : 'hover:border-primary/50'
                      }`}
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
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`bg-background/50 border-border/50 transition-all duration-300 resize-none ${
                        focusedField === 'message'
                          ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]'
                          : 'hover:border-primary/50'
                      }`}
                    />
                  </div>
                  <Button
                    type='submit'
                    className='w-full h-12 text-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:shadow-primary/30 group'
                  >
                    <Send className='h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-300' />
                    Send Message
                  </Button>
                </form>
              ) : (
                <div className='text-center py-12 animate-fade-in'>
                  <CheckCircle className='h-16 w-16 text-green-500 mx-auto mb-4 animate-bounce' />
                  <h3 className='text-2xl font-bold text-green-600 mb-2'>
                    Message Sent!
                  </h3>
                  <p className='text-muted-foreground'>
                    Thank you for reaching out. I&apos;ll get back to you soon!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Contact Information */}
          <div
            data-aos='fade-left'
            data-aos-delay='200'
            data-aos-duration='800'
            className='space-y-8'
          >
            <Card className='bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]'>
              <CardHeader>
                <CardTitle className='text-2xl font-bold'>
                  Get in Touch
                </CardTitle>
                <CardDescription>
                  Prefer direct contact? Reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                {contactInfo.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className='flex items-center space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg group border border-transparent hover:border-primary/20'
                  >
                    <div
                      className={`p-3 rounded-full bg-gradient-to-r ${item.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 group-hover:scale-110`}
                    >
                      <item.icon className='h-6 w-6 text-primary group-hover:text-white transition-colors duration-300' />
                    </div>
                    <div className='flex-1'>
                      <p className='font-medium text-foreground group-hover:text-primary transition-colors duration-300'>
                        {item.label}
                      </p>
                      <p className='text-muted-foreground group-hover:text-foreground transition-colors duration-300'>
                        {item.value}
                      </p>
                    </div>
                    <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <Send className='h-4 w-4 text-primary' />
                    </div>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card className='bg-gradient-to-br from-primary/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group'>
              <CardContent className='p-8 text-center'>
                <h3 className='text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300'>
                  Let&apos;s Build Something Amazing
                </h3>
                <p className='text-muted-foreground mb-6 group-hover:text-foreground transition-colors duration-300'>
                  Whether you have a project in mind or just want to chat about
                  technology, I&apos;m always excited to connect with fellow
                  innovators.
                </p>
                <div className='flex justify-center space-x-8'>
                  <div className='text-center group/stat hover:scale-110 transition-transform duration-300'>
                    <div className='text-3xl font-bold text-primary group-hover/stat:text-blue-600 transition-colors duration-300'>
                      50+
                    </div>
                    <div className='text-sm text-muted-foreground group-hover/stat:text-foreground transition-colors duration-300'>
                      Projects
                    </div>
                  </div>
                  <div className='text-center group/stat hover:scale-110 transition-transform duration-300'>
                    <div className='text-3xl font-bold text-primary group-hover/stat:text-green-600 transition-colors duration-300'>
                      5+
                    </div>
                    <div className='text-sm text-muted-foreground group-hover/stat:text-foreground transition-colors duration-300'>
                      Years
                    </div>
                  </div>
                  <div className='text-center group/stat hover:scale-110 transition-transform duration-300'>
                    <div className='text-3xl font-bold text-primary group-hover/stat:text-purple-600 transition-colors duration-300'>
                      100%
                    </div>
                    <div className='text-sm text-muted-foreground group-hover/stat:text-foreground transition-colors duration-300'>
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
