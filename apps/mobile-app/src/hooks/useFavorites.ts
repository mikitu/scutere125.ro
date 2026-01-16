import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@scutere125_favorites';

export interface FavoriteScooter {
  id: number;
  slug: string;
  name: string;
  image: string | null;
  price: string;
  category: string;
  manufacturer: string;
  addedAt: number;
}

// Helper functions for AsyncStorage
const loadFavoritesFromStorage = async (): Promise<FavoriteScooter[]> => {
  try {
    const stored = await AsyncStorage.getItem(FAVORITES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

const saveFavoritesToStorage = async (favorites: FavoriteScooter[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export function useFavorites() {
  const queryClient = useQueryClient();

  // Query for favorites
  const { data: favorites = [], isLoading: loading } = useQuery({
    queryKey: ['favorites'],
    queryFn: loadFavoritesFromStorage,
    staleTime: Infinity, // Favorites don't go stale
  });

  // Mutation for adding favorite
  const addFavoriteMutation = useMutation({
    mutationFn: async (scooter: Omit<FavoriteScooter, 'addedAt'>) => {
      const newFavorite: FavoriteScooter = {
        ...scooter,
        addedAt: Date.now(),
      };
      const currentFavorites = queryClient.getQueryData<FavoriteScooter[]>(['favorites']) || [];
      const newFavorites = [newFavorite, ...currentFavorites];
      await saveFavoritesToStorage(newFavorites);
      return newFavorites;
    },
    onSuccess: (newFavorites) => {
      queryClient.setQueryData(['favorites'], newFavorites);
    },
  });

  // Mutation for removing favorite
  const removeFavoriteMutation = useMutation({
    mutationFn: async (id: number) => {
      const currentFavorites = queryClient.getQueryData<FavoriteScooter[]>(['favorites']) || [];
      const newFavorites = currentFavorites.filter(fav => fav.id !== id);
      await saveFavoritesToStorage(newFavorites);
      return newFavorites;
    },
    onSuccess: (newFavorites) => {
      queryClient.setQueryData(['favorites'], newFavorites);
    },
  });

  // Mutation for toggling favorite
  const toggleFavoriteMutation = useMutation({
    mutationFn: async (scooter: Omit<FavoriteScooter, 'addedAt'>) => {
      const currentFavorites = queryClient.getQueryData<FavoriteScooter[]>(['favorites']) || [];
      const isFav = currentFavorites.some(fav => fav.id === scooter.id);

      let newFavorites: FavoriteScooter[];
      if (isFav) {
        newFavorites = currentFavorites.filter(fav => fav.id !== scooter.id);
      } else {
        const newFavorite: FavoriteScooter = {
          ...scooter,
          addedAt: Date.now(),
        };
        newFavorites = [newFavorite, ...currentFavorites];
      }

      await saveFavoritesToStorage(newFavorites);
      return newFavorites;
    },
    onSuccess: (newFavorites) => {
      queryClient.setQueryData(['favorites'], newFavorites);
    },
  });

  const isFavorite = (id: number) => {
    return favorites.some(fav => fav.id === id);
  };

  const addFavorite = async (scooter: Omit<FavoriteScooter, 'addedAt'>) => {
    await addFavoriteMutation.mutateAsync(scooter);
  };

  const removeFavorite = async (id: number) => {
    await removeFavoriteMutation.mutateAsync(id);
  };

  const toggleFavorite = async (scooter: Omit<FavoriteScooter, 'addedAt'>) => {
    await toggleFavoriteMutation.mutateAsync(scooter);
  };

  const clearFavorites = async () => {
    await saveFavoritesToStorage([]);
    queryClient.setQueryData(['favorites'], []);
  };

  return {
    favorites,
    loading,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    clearFavorites,
  };
}

