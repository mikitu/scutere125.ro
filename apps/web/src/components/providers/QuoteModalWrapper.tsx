'use client';

import { ReactNode, useEffect, useState } from 'react';
import { QuoteModalProvider, useQuoteModal } from '@/contexts/QuoteModalContext';
import { RequestQuoteModal } from '@/components/modals/RequestQuoteModal';

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

export function QuoteModalWrapper({ children, scooters }: { children: ReactNode; scooters: Scooter[] }) {
  return (
    <QuoteModalProvider>
      {children}
      <ModalRenderer scooters={scooters} />
    </QuoteModalProvider>
  );
}

