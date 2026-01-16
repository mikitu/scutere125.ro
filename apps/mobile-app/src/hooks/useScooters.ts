import { useQuery } from '@tanstack/react-query';
import { 
  getAllScooters, 
  getFeaturedScooters, 
  getLatestScooters, 
  getScooterBySlug,
  getCategories,
  getBrands,
} from '../lib/strapi';
import { adaptStrapiScooters, adaptStrapiScooter } from '../lib/scooter-adapter';

// Query keys
export const scooterKeys = {
  all: ['scooters'] as const,
  lists: () => [...scooterKeys.all, 'list'] as const,
  list: (filters: string) => [...scooterKeys.lists(), filters] as const,
  details: () => [...scooterKeys.all, 'detail'] as const,
  detail: (slug: string) => [...scooterKeys.details(), slug] as const,
  categories: ['categories'] as const,
  brands: ['brands'] as const,
};

// Get all scooters
export function useAllScooters(limit: number = 100) {
  return useQuery({
    queryKey: scooterKeys.list(`all-${limit}`),
    queryFn: async () => {
      const data = await getAllScooters(limit);
      return adaptStrapiScooters(data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Get featured scooters
export function useFeaturedScooters() {
  return useQuery({
    queryKey: scooterKeys.list('featured'),
    queryFn: async () => {
      const data = await getFeaturedScooters();
      return adaptStrapiScooters(data);
    },
    staleTime: 1000 * 60 * 5,
  });
}

// Get latest scooters
export function useLatestScooters(limit: number = 20) {
  return useQuery({
    queryKey: scooterKeys.list(`latest-${limit}`),
    queryFn: async () => {
      const data = await getLatestScooters(limit);
      return adaptStrapiScooters(data);
    },
    staleTime: 1000 * 60 * 5,
  });
}

// Get scooter by slug
export function useScooter(slug: string) {
  return useQuery({
    queryKey: scooterKeys.detail(slug),
    queryFn: async () => {
      const data = await getScooterBySlug(slug);
      return data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// Get categories
export function useCategories() {
  return useQuery({
    queryKey: scooterKeys.categories,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30, // 30 minutes - categories don't change often
  });
}

// Get brands
export function useBrands() {
  return useQuery({
    queryKey: scooterKeys.brands,
    queryFn: getBrands,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

