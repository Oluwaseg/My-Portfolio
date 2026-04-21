'use client';

import { createContext, useContext, useState } from 'react';

type ModalContextType = {
  isModalOpen: boolean;
  setIsModalOpen: (v: boolean) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used inside ModalProvider');
  return ctx;
}
