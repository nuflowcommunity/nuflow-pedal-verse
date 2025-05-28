
import React, { useState, useEffect } from 'react';
import { DateRange } from "react-day-picker";
import { Event } from '@/types/events';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { cacheConfig } from '@/lib/queryClient';
import { 
  getAllEvents, 
  getUpcomingEvents,
  getPastEvents
} from '@/services/events';

export type EventViewMode = 'all' | 'upcoming' | 'past';

export const useEventsData = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [sortOption, setSortOption] = useState('');
  const [viewMode, setViewMode] = useState<EventViewMode>('all');
  const { toast } = useToast();

  // Query otimizada para eventos
  const {
    data: allEvents = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['events', viewMode],
    queryFn: async () => {
      switch (viewMode) {
        case 'upcoming':
          return await getUpcomingEvents();
        case 'past':
          return await getPastEvents();
        default:
          return await getAllEvents();
      }
    },
    ...cacheConfig.events
  });

  // Handle errors using useEffect instead of onError
  useEffect(() => {
    if (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Erro ao carregar eventos",
        description: "Houve um problema ao buscar os eventos. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Filtrar eventos localmente para melhor performance
  const filteredEvents = React.useMemo(() => {
    let results = [...allEvents];
    
    // Filter by category
    if (activeCategory !== 'Todos') {
      results = results.filter(event => event.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(event => 
        event.title.toLowerCase().includes(query) || 
        event.location.toLowerCase().includes(query)
      );
    }
    
    // Filter by date range
    if (dateRange && dateRange.from) {
      const { parseEventDate } = require('@/services/events');
      results = results.filter(event => {
        const eventDate = new Date(parseEventDate(event.date));
        
        if (dateRange.to) {
          return eventDate >= dateRange.from && eventDate <= dateRange.to;
        } else {
          return eventDate >= dateRange.from;
        }
      });
    }
    
    return results;
  }, [allEvents, activeCategory, searchQuery, dateRange]);

  // Function to handle filter by date
  const handleFilterByDate = () => {
    // Filtering é feito automaticamente via useMemo
  };

  // Function to clear date filter
  const handleClearDateFilter = () => {
    setDateRange(undefined);
  };

  // Function to handle view mode change
  const handleViewModeChange = (mode: EventViewMode) => {
    setViewMode(mode);
  };

  // Function to handle sort option change
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    dateRange,
    setDateRange,
    filteredEvents,
    isLoading,
    error,
    sortOption,
    viewMode,
    handleSortChange,
    handleFilterByDate,
    handleClearDateFilter,
    handleViewModeChange,
    refetch
  };
};
