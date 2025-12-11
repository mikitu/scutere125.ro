'use client';

import { ReactNode } from 'react';
import { QuoteModalProvider } from '@/contexts/QuoteModalContext';
import { RequestQuoteModal } from '@/components/modals/RequestQuoteModal';
import { useQuoteModal } from '@/contexts/QuoteModalContext';

interface Scooter {
  id: number;
  name: string;
  slug: string;
}

function ModalRenderer({ scooters }: { scooters: Scooter[] }) {
  const { isOpen, closeModal, preselectedScooter } = useQuoteModal();
  
  return (
    <RequestQuoteModal
      isOpen={isOpen}
      onClose={closeModal}
      scooters={scooters}
      preselectedScooter={preselectedScooter}
    />
  );
}

function ProvidersContent({ children, scooters }: { children: ReactNode; scooters: Scooter[] }) {
  return (
    <>
      {children}
      <ModalRenderer scooters={scooters} />
    </>
  );
}

export function AppProviders({ children, scooters }: { children: ReactNode; scooters: Scooter[] }) {
  return (
    <QuoteModalProvider>
      <ProvidersContent scooters={scooters}>
        {children}
      </ProvidersContent>
    </QuoteModalProvider>
  );
}

