
import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from './useDebounce';

export interface SearchFilters {
  category?: string;
  location?: string;
  priceRange?: [number, number];
  dateRange?: [Date, Date];
  brand?: string;
  condition?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: 'event' | 'product';
  description: string;
  image?: string;
  price?: string;
  location?: string;
  category?: string;
}

const useAdvancedSearch = (initialQuery = '', initialFilters: SearchFilters = {}) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  const debouncedQuery = useDebounce(query, 300);
  
  // Carregar histórico do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nuflow-search-history');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);
  
  // Salvar no histórico quando a busca é executada
  const addToHistory = (searchTerm: string) => {
    if (searchTerm.trim() && !searchHistory.includes(searchTerm)) {
      const newHistory = [searchTerm, ...searchHistory.slice(0, 9)]; // máximo 10 itens
      setSearchHistory(newHistory);
      localStorage.setItem('nuflow-search-history', JSON.stringify(newHistory));
    }
  };
  
  // Query key para cache otimizado
  const queryKey = useMemo(() => [
    'search',
    debouncedQuery,
    filters
  ], [debouncedQuery, filters]);
  
  // Função de busca simulada (substituir pela API real)
  const searchFunction = async ({ queryKey }: { queryKey: any[] }) => {
    const [, searchTerm, searchFilters] = queryKey;
    
    if (!searchTerm && Object.keys(searchFilters).length === 0) {
      return [];
    }
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simular resultados de busca
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: 'Circuito Mantiqueira MTB',
        type: 'event',
        description: 'Trilha desafiadora na Serra da Mantiqueira',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        price: 'R$ 180',
        location: 'Serra da Mantiqueira, SP',
        category: 'MTB'
      },
      {
        id: '2',
        title: 'Specialized Epic Carbon',
        type: 'product',
        description: 'Mountain bike de alta performance',
        image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde',
        price: 'R$ 15.990',
        location: 'São Paulo, SP',
        category: 'MTB'
      }
    ];
    
    // Filtrar resultados baseado na busca e filtros
    return mockResults.filter(item => {
      const matchesQuery = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !searchFilters.category || item.category === searchFilters.category;
      const matchesLocation = !searchFilters.location || item.location?.includes(searchFilters.location);
      
      return matchesQuery && matchesCategory && matchesLocation;
    });
  };
  
  const {
    data: results = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey,
    queryFn: searchFunction,
    enabled: debouncedQuery.length > 0 || Object.keys(filters).length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
  
  // Sugestões baseadas no histórico e query atual
  const suggestions = useMemo(() => {
    if (!query) return searchHistory.slice(0, 5);
    
    return searchHistory
      .filter(item => item.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [query, searchHistory]);
  
  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('nuflow-search-history');
  };
  
  const executeSearch = () => {
    if (debouncedQuery) {
      addToHistory(debouncedQuery);
    }
    refetch();
  };
  
  return {
    query,
    setQuery,
    filters,
    setFilters,
    results,
    isLoading,
    error,
    suggestions,
    searchHistory,
    clearHistory,
    executeSearch,
    refetch
  };
};

export default useAdvancedSearch;
