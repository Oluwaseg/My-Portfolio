'use client';

import { useEffect, useState } from 'react';

interface AutoTypingTextProps {
  roles: string[];
  typingSpeed?: number; // Milliseconds per character
  deletingSpeed?: number; // Milliseconds per character
  pauseDelay?: number; // Milliseconds to pause after typing/deleting a word
}

export function AutoTypingText({
  roles,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDelay = 1500,
}: AutoTypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentRole.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        // Word fully deleted, transition to next word
        const nextRoleIndex = (roleIndex + 1) % roles.length;
        const nextRole = roles[nextRoleIndex];

        // Immediately set to the first character of the next word
        // This prevents the empty string flicker
        setDisplayedText(nextRole.substring(0, 1));
        setCharIndex(1); // Start typing from the second character
        setIsDeleting(false);
        setRoleIndex(nextRoleIndex);
      }
    } else {
      if (charIndex < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentRole.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Word fully typed, pause then delete
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    }

    return () => clearTimeout(timer);
  }, [
    charIndex,
    isDeleting,
    roleIndex,
    roles,
    typingSpeed,
    deletingSpeed,
    pauseDelay,
  ]);

  return <>{displayedText}</>;
}
