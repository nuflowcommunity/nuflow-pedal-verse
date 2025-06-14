
import { useState, useMemo } from 'react';
import { Event } from '@/types/events';

interface AdvancedFilters {
  searchQuery: string;
  selectedCity: string;
  selectedCategory: string;
  selectedPriceRange: string;
  selectedDifficulty: string;
  selectedDistance: string;
  sortBy: string;
}

interface FilterOption {
  key: string;
  value: string;
  label: string;
}

export const useAdvancedEventFilters = (events: Event[]) => {
  const [filters, setFilters] = useState<AdvancedFilters>({
    searchQuery: '',
    selectedCity: 'Todas as cidades',
    selectedCategory: 'all',
    selectedPriceRange: 'all',
    selectedDifficulty: 'all',
    selectedDistance: 'all',
    sortBy: ''
  });

  // Extract price value from price string
  const extractPrice = (priceStr: string): number => {
    if (priceStr.toLowerCase().includes('gratuito') || priceStr.toLowerCase().includes('grátis')) {
      return 0;
    }
    const match = priceStr.match(/[\d,]+/);
    return match ? parseFloat(match[0].replace(',', '.')) : 0;
  };

  // Extract distance value from distance string
  const extractDistance = (distanceStr?: string): number => {
    if (!distanceStr) return 0;
    const match = distanceStr.match(/(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Filter events based on active filters
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.organizer?.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query)
      );
    }

    // City filter
    if (filters.selectedCity !== 'Todas as cidades') {
      result = result.filter(event =>
        event.location.toLowerCase().includes(filters.selectedCity.toLowerCase())
      );
    }

    // Category filter
    if (filters.selectedCategory !== 'all') {
      result = result.filter(event => event.category === filters.selectedCategory);
    }

    // Price range filter
    if (filters.selectedPriceRange !== 'all') {
      result = result.filter(event => {
        const price = extractPrice(event.price);
        switch (filters.selectedPriceRange) {
          case 'free':
            return price === 0;
          case '0-50':
            return price > 0 && price <= 50;
          case '50-100':
            return price > 50 && price <= 100;
          case '100-200':
            return price > 100 && price <= 200;
          case '200+':
            return price > 200;
          default:
            return true;
        }
      });
    }

    // Difficulty filter
    if (filters.selectedDifficulty !== 'all') {
      result = result.filter(event =>
        event.difficulty?.toLowerCase() === filters.selectedDifficulty.toLowerCase()
      );
    }

    // Distance filter
    if (filters.selectedDistance !== 'all') {
      result = result.filter(event => {
        const distance = extractDistance(event.distance);
        switch (filters.selectedDistance) {
          case '0-10':
            return distance <= 10;
          case '10-25':
            return distance > 10 && distance <= 25;
          case '25-50':
            return distance > 25 && distance <= 50;
          case '50-100':
            return distance > 50 && distance <= 100;
          case '100+':
            return distance > 100;
          default:
            return true;
        }
      });
    }

    // Sorting
    if (filters.sortBy) {
      result.sort((a, b) => {
        switch (filters.sortBy) {
          case 'date-asc':
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          case 'date-desc':
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          case 'price-asc':
            return extractPrice(a.price) - extractPrice(b.price);
          case 'price-desc':
            return extractPrice(b.price) - extractPrice(a.price);
          case 'name-asc':
            return a.title.localeCompare(b.title);
          case 'name-desc':
            return b.title.localeCompare(a.title);
          case 'location':
            return a.location.localeCompare(b.location);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [events, filters]);

  // Get active filters for display
  const activeFilters = useMemo((): FilterOption[] => {
    const active: FilterOption[] = [];

    if (filters.selectedCity !== 'Todas as cidades') {
      active.push({
        key: 'city',
        value: filters.selectedCity,
        label: `Cidade: ${filters.selectedCity}`
      });
    }

    if (filters.selectedCategory !== 'all') {
      const categoryLabels: Record<string, string> = {
        'MTB': 'Mountain Bike',
        'Speed': 'Speed/Road',
        'Gravel': 'Gravel',
        'Urbano': 'Ciclismo Urbano',
        'Outro': 'Outros'
      };
      active.push({
        key: 'category',
        value: filters.selectedCategory,
        label: `Categoria: ${categoryLabels[filters.selectedCategory] || filters.selectedCategory}`
      });
    }

    if (filters.selectedPriceRange !== 'all') {
      const priceLabels: Record<string, string> = {
        'free': 'Gratuito',
        '0-50': 'Até R$ 50',
        '50-100': 'R$ 50 - R$ 100',
        '100-200': 'R$ 100 - R$ 200',
        '200+': 'Acima de R$ 200'
      };
      active.push({
        key: 'price',
        value: filters.selectedPriceRange,
        label: `Preço: ${priceLabels[filters.selectedPriceRange]}`
      });
    }

    if (filters.selectedDifficulty !== 'all') {
      active.push({
        key: 'difficulty',
        value: filters.selectedDifficulty,
        label: `Dificuldade: ${filters.selectedDifficulty.charAt(0).toUpperCase() + filters.selectedDifficulty.slice(1)}`
      });
    }

    if (filters.selectedDistance !== 'all') {
      const distanceLabels: Record<string, string> = {
        '0-10': 'Até 10km',
        '10-25': '10km - 25km',
        '25-50': '25km - 50km',
        '50-100': '50km - 100km',
        '100+': 'Acima de 100km'
      };
      active.push({
        key: 'distance',
        value: filters.selectedDistance,
        label: `Distância: ${distanceLabels[filters.selectedDistance]}`
      });
    }

    return active;
  }, [filters]);

  // Calculate stats
  const stats = useMemo(() => {
    const prices = filteredEvents.map(event => extractPrice(event.price)).filter(price => price > 0);
    const averagePrice = prices.length > 0 ? prices.reduce((sum, price) => sum + price, 0) / prices.length : 0;
    const cities = new Set(filteredEvents.map(event => event.location.split(',')[0].trim()));
    const totalParticipants = filteredEvents.reduce((sum, event) => sum + (event.registeredParticipants || 0), 0);

    return {
      totalEvents: filteredEvents.length,
      averagePrice,
      citiesCount: cities.size,
      totalParticipants
    };
  }, [filteredEvents]);

  // Update functions
  const updateFilter = (key: keyof AdvancedFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key: string) => {
    const filterKey = key as keyof AdvancedFilters;
    const defaultValues: AdvancedFilters = {
      searchQuery: '',
      selectedCity: 'Todas as cidades',
      selectedCategory: 'all',
      selectedPriceRange: 'all',
      selectedDifficulty: 'all',
      selectedDistance: 'all',
      sortBy: ''
    };
    setFilters(prev => ({ ...prev, [filterKey]: defaultValues[filterKey] }));
  };

  const clearAllFilters = () => {
    setFilters({
      searchQuery: '',
      selectedCity: 'Todas as cidades',
      selectedCategory: 'all',
      selectedPriceRange: 'all',
      selectedDifficulty: 'all',
      selectedDistance: 'all',
      sortBy: ''
    });
  };

  return {
    filters,
    filteredEvents,
    activeFilters,
    stats,
    updateFilter,
    clearFilter,
    clearAllFilters
  };
};
