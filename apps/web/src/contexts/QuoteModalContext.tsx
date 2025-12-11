'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface QuoteModalContextType {
  isOpen: boolean;
  openModal: (preselectedScooter?: string) => void;
  closeModal: () => void;
  preselectedScooter?: string;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedScooter, setPreselectedScooter] = useState<string | undefined>();

  const openModal = (scooter?: string) => {
    setPreselectedScooter(scooter);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Clear preselected scooter after a delay to avoid visual glitch
    setTimeout(() => setPreselectedScooter(undefined), 300);
  };

  return (
    <QuoteModalContext.Provider value={{ isOpen, openModal, closeModal, preselectedScooter }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  if (context === undefined) {
    throw new Error('useQuoteModal must be used within a QuoteModalProvider');
  }
  return context;
}

