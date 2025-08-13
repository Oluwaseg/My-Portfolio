'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function Switch() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={toggleTheme}
      className='rounded-xl bg-background/50 backdrop-blur-sm border-border/50 hover:bg-accent/50 transition-all duration-300 group relative overflow-hidden'
    >
      <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all duration-500 ease-out dark:scale-0 dark:-rotate-90 group-hover:rotate-12' />
      <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all duration-500 ease-out dark:scale-100 dark:rotate-0 group-hover:rotate-12' />

      <div className='absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl' />

      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}

export { Switch as ModeToggle };
