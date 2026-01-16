import { QueryClient } from '@tanstack/react-query';

// Create query client with default options
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache for 5 minutes
      gcTime: 1000 * 60 * 5,
      // Stale after 1 minute
      staleTime: 1000 * 60,
      // Retry failed requests
      retry: 2,
      // Refetch on window focus
      refetchOnWindowFocus: false,
      // Refetch on reconnect
      refetchOnReconnect: true,
    },
  },
});

