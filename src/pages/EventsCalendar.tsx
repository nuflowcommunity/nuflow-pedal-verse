
import React, { useState, useEffect } from 'react';
import { DateRange } from "react-day-picker";
import { isWithinInterval, parse, compareAsc, compareDesc } from "date-fns";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsHero from '@/components/events/EventsHero';
import EventsBreadcrumb from '@/components/events/EventsBreadcrumb';
import EventsSearch from '@/components/events/EventsSearch';
import EventsCategoryFilter from '@/components/events/EventsCategoryFilter';
import EventsGrid from '@/components/events/EventsGrid';
import BackToTopButton from '@/components/BackToTopButton';
import { Button } from '@/components/ui/button';

// Helper function to parse date strings into Date objects
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

// Sample data for events
const events = [
  {
    id: '1',
    title: 'Circuito Mantiqueira',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600',
    date: '27 Mai, 2024',
    location: 'Serra da Mantiqueira, SP',
    price: 'R$ 180',
    category: 'MTB',
    status: 'active'
  },
  {
    id: '2',
    title: 'Pedal Costeiro Santos',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600',
    date: '03 Jun, 2024',
    location: 'Santos, SP',
    price: 'R$ 120',
    category: 'Speed',
    status: 'active'
  },
  {
    id: '3',
    title: 'Aurora Trail Experience',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600',
    date: '15 Jun, 2024',
    location: 'Campos do Jordão, SP',
    price: 'R$ 220',
    category: 'Gravel',
    status: 'active'
  },
  {
    id: '4',
    title: 'São Paulo Night Ride',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600',
    date: '22 Jun, 2024',
    location: 'São Paulo, SP',
    price: 'R$ 90',
    category: 'Urbano',
    status: 'active'
  },
  {
    id: '5',
    title: 'Vale do Paraíba Tour',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600',
    date: '05 Jul, 2024',
    location: 'Vale do Paraíba, SP',
    price: 'R$ 160',
    category: 'Gravel',
    status: 'active'
  },
  {
    id: '6',
    title: 'Trilhas de Itatiaia',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=600',
    date: '12 Jul, 2024',
    location: 'Itatiaia, RJ',
    price: 'R$ 200',
    category: 'MTB',
    status: 'active'
  },
  {
    id: '7',
    title: 'Cicloturismo Litoral Norte',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=600',
    date: '19 Jul, 2024',
    location: 'Ubatuba, SP',
    price: 'R$ 280',
    category: 'Speed',
    status: 'active'
  },
  {
    id: '8',
    title: 'Serra do Mar Adventure',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=600',
    date: '26 Jul, 2024',
    location: 'Cubatão, SP',
    price: 'R$ 190',
    category: 'MTB',
    status: 'active'
  }
];

const categories = ['Todos', 'MTB', 'Speed', 'Gravel', 'Urbano'];

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  price: string;
  category: string;
  status?: string;
}

const EventsCalendar = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [sortOption, setSortOption] = useState('');
  const [viewMode, setViewMode] = useState<'all' | 'upcoming' | 'past'>('all');

  // Filter events based on all active filters
  useEffect(() => {
    filterEvents();
  }, [activeCategory, searchQuery, sortOption, viewMode]);

  const filterEvents = () => {
    let result = events.filter(event => {
      // Filter by category
      const matchesCategory = activeCategory === 'Todos' || event.category === activeCategory;
      
      // Filter by search query
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by date range if applicable
      let matchesDateRange = true;
      if (dateRange && dateRange.from) {
        const eventDate = parseEventDate(event.date);
        
        if (dateRange.to) {
          // If we have both from and to dates
          matchesDateRange = isWithinInterval(eventDate, { 
            start: dateRange.from, 
            end: dateRange.to 
          });
        } else {
          // If we only have a from date
          matchesDateRange = eventDate >= dateRange.from;
        }
      }

      // Filter by view mode (past/upcoming)
      let matchesViewMode = true;
      if (viewMode !== 'all') {
        const eventDate = parseEventDate(event.date);
        const today = new Date();
        
        if (viewMode === 'upcoming') {
          matchesViewMode = eventDate >= today;
        } else if (viewMode === 'past') {
          matchesViewMode = eventDate < today;
        }
      }
      
      return matchesCategory && matchesSearch && matchesDateRange && matchesViewMode;
    });
    
    // Apply sorting
    if (sortOption) {
      result = sortEvents(result, sortOption);
    }
    
    setFilteredEvents(result);
  };

  // Function to sort events based on the selected option
  const sortEvents = (eventsToSort: Event[], option: string) => {
    const sortedEvents = [...eventsToSort];
    
    switch (option) {
      case 'date-asc':
        return sortedEvents.sort((a, b) => compareAsc(parseEventDate(a.date), parseEventDate(b.date)));
      case 'date-desc':
        return sortedEvents.sort((a, b) => compareDesc(parseEventDate(a.date), parseEventDate(b.date)));
      case 'price-asc':
        return sortedEvents.sort((a, b) => parsePriceToNumber(a.price) - parsePriceToNumber(b.price));
      case 'price-desc':
        return sortedEvents.sort((a, b) => parsePriceToNumber(b.price) - parsePriceToNumber(a.price));
      case 'name-asc':
        return sortedEvents.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return sortedEvents.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sortedEvents;
    }
  };

  // Function to handle sort option change
  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  // Function to apply date filter
  const handleFilterByDate = () => {
    filterEvents();
  };

  // Function to clear date filter
  const handleClearDateFilter = () => {
    setDateRange(undefined);
    setTimeout(() => {
      filterEvents();
    }, 0);
  };

  // Function to export events to CSV or XLS
  const handleExport = (format: 'csv' | 'xls') => {
    // This would be implemented with a real export library
    // For now we'll just show an alert
    alert(`Exportando eventos para ${format.toUpperCase()}...`);
    
    // In a real implementation, we'd use a library like xlsx or create a CSV string
    // and trigger a download
    
    // Example for CSV:
    // const headers = 'ID,Title,Date,Location,Price,Category\n';
    // const csvContent = headers + filteredEvents.map(event => 
    //   `${event.id},"${event.title}",${event.date},"${event.location}",${event.price},${event.category}`
    // ).join('\n');
    // 
    // const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.setAttribute('href', url);
    // link.setAttribute('download', `events-export-${new Date().toISOString().split('T')[0]}.csv`);
    // link.click();
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
                  onClick={() => setViewMode('all')}
                >
                  Todos
                </Button>
                <Button 
                  variant={viewMode === 'upcoming' ? "default" : "outline"}
                  className={viewMode === 'upcoming' ? 
                    "bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90" : 
                    "border-white text-white hover:bg-white/10"}
                  onClick={() => setViewMode('upcoming')}
                >
                  Próximos eventos
                </Button>
                <Button 
                  variant={viewMode === 'past' ? "default" : "outline"}
                  className={viewMode === 'past' ? 
                    "bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90" : 
                    "border-white text-white hover:bg-white/10"}
                  onClick={() => setViewMode('past')}
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
        
        <EventsGrid events={filteredEvents} />
        <BackToTopButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsCalendar;
