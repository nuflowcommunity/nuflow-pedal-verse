
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: 1,
    },
  },
});

// Cache específico para diferentes tipos de dados
export const cacheConfig = {
  events: {
    staleTime: 2 * 60 * 1000, // 2 minutos para eventos (mudam mais frequentemente)
    gcTime: 5 * 60 * 1000,
  },
  products: {
    staleTime: 5 * 60 * 1000, // 5 minutos para produtos
    gcTime: 10 * 60 * 1000,
  },
  featuredContent: {
    staleTime: 10 * 60 * 1000, // 10 minutos para conteúdo em destaque
    gcTime: 20 * 60 * 1000,
  },
};
