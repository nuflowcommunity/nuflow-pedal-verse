
import { useState, useEffect } from 'react';
import { DateRange } from "react-day-picker";
import { Event } from '@/types/events';
import { useToast } from '@/components/ui/use-toast';
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
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [sortOption, setSortOption] = useState('');
  const [viewMode, setViewMode] = useState<EventViewMode>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all events on component mount
  useEffect(() => {
    fetchEvents();
  }, [viewMode]);

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [activeCategory, searchQuery, sortOption, dateRange, allEvents]);

  // Fetch events based on view mode
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      let events: Event[];
      
      switch (viewMode) {
        case 'upcoming':
          events = await getUpcomingEvents();
          break;
        case 'past':
          events = await getPastEvents();
          break;
        default:
          events = await getAllEvents();
      }
      
      setAllEvents(events);
      setFilteredEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Erro ao carregar eventos",
        description: "Houve um problema ao buscar os eventos. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to apply filters to events
  const applyFilters = () => {
    // If no events loaded yet, don't try to filter
    if (allEvents.length === 0 && !isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Start with all events loaded locally, filter in-memory
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
      
      setFilteredEvents(results);
    } catch (error) {
      console.error("Error applying filters:", error);
      toast({
        title: "Erro ao filtrar eventos",
        description: "Houve um problema ao aplicar os filtros. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle filter by date
  const handleFilterByDate = () => {
    applyFilters();
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
    sortOption,
    viewMode,
    handleSortChange,
    handleFilterByDate,
    handleClearDateFilter,
    handleViewModeChange
  };
};
