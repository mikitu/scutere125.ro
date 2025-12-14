'use client';

import { Suspense } from 'react';
import { ScooterCatalog } from './ScooterCatalog';
import type { Scooter } from '@/data/scooters';

interface Category {
  id: number;
  name: string;
  slug: string;
  displayName: string;
  icon: string;
  order: number;
}

interface ScooterCatalogWrapperProps {
  scooters: Scooter[];
  categories: Category[];
}

export function ScooterCatalogWrapper({ scooters, categories }: ScooterCatalogWrapperProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ScooterCatalog scooters={scooters} categories={categories} />
    </Suspense>
  );
}

