
import React, { useState, useEffect } from 'react';
import { DateRange } from "react-day-picker";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsHero from '@/components/events/EventsHero';
import EventsBreadcrumb from '@/components/events/EventsBreadcrumb';
import EventsSearch from '@/components/events/EventsSearch';
import EventsCategoryFilter from '@/components/events/EventsCategoryFilter';
import EventsGrid from '@/components/events/EventsGrid';
import BackToTopButton from '@/components/BackToTopButton';
import { Button } from '@/components/ui/button';
import { Event } from '@/types/events';
import { 
  getAllEvents, 
  filterAndSortEvents,
  getUpcomingEvents,
  getPastEvents,
  downloadEvents,
  parseEventDate
} from '@/services/events';
import { useToast } from '@/components/ui/use-toast';

const categories = ['Todos', 'MTB', 'Speed', 'Gravel', 'Urbano', 'Outro'];

const EventsCalendar = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [sortOption, setSortOption] = useState('');
  const [viewMode, setViewMode] = useState<'all' | 'upcoming' | 'past'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch all events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Apply filters and view mode when they change
  useEffect(() => {
    applyFilters();
  }, [activeCategory, searchQuery, sortOption, viewMode, dateRange, allEvents]);

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

  // Apply filters to events
  const applyFilters = async () => {
    // If no events loaded yet, don't try to filter
    if (allEvents.length === 0 && !isLoading) return;
    
    setIsLoading(true);
    
    try {
      // If we have all events loaded locally, filter in-memory
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
        results = results.filter(event => {
          const eventDate = new Date(parseEventDate(event.date));
          
          if (dateRange.to) {
            return eventDate >= dateRange.from && eventDate <= dateRange.to;
          } else {
            return eventDate >= dateRange.from;
          }
        });
      }
      
      // Apply view mode filter
      if (viewMode !== 'all') {
        const today = new Date();
        
        if (viewMode === 'upcoming') {
          results = results.filter(event => {
            const eventDate = new Date(parseEventDate(event.date));
            return eventDate >= today;
          });
        } else if (viewMode === 'past') {
          results = results.filter(event => {
            const eventDate = new Date(parseEventDate(event.date));
            return eventDate < today;
          });
        }
      }
      
      // Apply sorting if needed
      if (sortOption) {
        results = sortEvents(results, sortOption);
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

  // Function to sort events based on selected option
  const sortEvents = (eventsToSort: Event[], option: string): Event[] => {
    const sorted = [...eventsToSort];
    
    switch (option) {
      case 'date-asc':
        return sorted.sort((a, b) => {
          const dateA = new Date(parseEventDate(a.date));
          const dateB = new Date(parseEventDate(b.date));
          return dateA.getTime() - dateB.getTime();
        });
      case 'date-desc':
        return sorted.sort((a, b) => {
          const dateA = new Date(parseEventDate(a.date));
          const dateB = new Date(parseEventDate(b.date));
          return dateB.getTime() - dateA.getTime();
        });
      case 'price-asc':
        return sorted.sort((a, b) => parsePriceToNumber(a.price) - parsePriceToNumber(b.price));
      case 'price-desc':
        return sorted.sort((a, b) => parsePriceToNumber(b.price) - parsePriceToNumber(a.price));
      case 'name-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  // Helper function to parse date strings
  const parseEventDate = (dateStr: string): Date => {
    const [day, month, year] = dateStr.split(' ')[0].split(',')[0].split(' ');
    const monthMap: Record<string, number> = {
      'Jan': 0, 'Fev': 1, 'Mar': 2, 'Abr': 3, 'Mai': 4, 'Jun': 5,
      'Jul': 6, 'Ago': 7, 'Set': 8, 'Out': 9, 'Nov': 10, 'Dez': 11
    };
    return new Date(parseInt(year), monthMap[month], parseInt(day));
  };

  // Helper function to parse price string to number
  const parsePriceToNumber = (priceStr: string): number => {
    return parseFloat(priceStr.replace('R$ ', '').replace(',', '.'));
  };

  // Function to handle sort option change
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  // Function to apply date filter
  const handleFilterByDate = () => {
    applyFilters();
  };

  // Function to clear date filter
  const handleClearDateFilter = () => {
    setDateRange(undefined);
  };

  // Function to handle view mode change
  const handleViewModeChange = (mode: 'all' | 'upcoming' | 'past') => {
    setViewMode(mode);
    // We'll re-fetch events based on the new mode
    fetchEvents();
  };

  // Function to export events to CSV or XLS
  const handleExport = (format: 'csv' | 'xls') => {
    try {
      downloadEvents(filteredEvents, format);
      toast({
        title: "Download iniciado",
        description: `Os eventos foram exportados para ${format.toUpperCase()}.`,
      });
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error);
      toast({
        title: "Erro ao exportar eventos",
        description: "Houve um problema ao exportar os eventos. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <EventsHero />
        <EventsBreadcrumb />
        
        <div className="py-4 bg-nuflow-moss text-white">
          <div className="container-custom">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-medium">Visualizar:</h2>
              <div className="flex gap-2">
                <Button 
                  variant={viewMode === 'all' ? "default" : "outline"}
                  className={viewMode === 'all' ? 
                    "bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90" : 
                    "border-white text-white hover:bg-white/10"}
                  onClick={() => handleViewModeChange('all')}
                >
                  Todos
                </Button>
                <Button 
                  variant={viewMode === 'upcoming' ? "default" : "outline"}
                  className={viewMode === 'upcoming' ? 
                    "bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90" : 
                    "border-white text-white hover:bg-white/10"}
                  onClick={() => handleViewModeChange('upcoming')}
                >
                  Próximos eventos
                </Button>
                <Button 
                  variant={viewMode === 'past' ? "default" : "outline"}
                  className={viewMode === 'past' ? 
                    "bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90" : 
                    "border-white text-white hover:bg-white/10"}
                  onClick={() => handleViewModeChange('past')}
                >
                  Eventos passados
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <EventsSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          dateRange={dateRange}
          setDateRange={setDateRange}
          onFilterByDate={handleFilterByDate}
          onClearDateFilter={handleClearDateFilter}
          onSortChange={handleSortChange}
          onExport={handleExport}
        />
        
        <EventsCategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        
        <EventsGrid 
          events={filteredEvents} 
          isLoading={isLoading} 
        />
        
        <BackToTopButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsCalendar;
