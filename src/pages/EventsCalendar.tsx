
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsGrid from '@/components/events/EventsGrid';
import CityFilter from '@/components/events/CityFilter';
import SimpleDateFilter from '@/components/events/SimpleDateFilter';
import BackToTopButton from '@/components/BackToTopButton';
import { useEventsData } from '@/hooks/useEventsData';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const EventsCalendar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    selectedDate,
    setSelectedDate,
    filteredEvents,
    isLoading,
    handleClearDateFilter
  } = useEventsData();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-12 bg-trailflow-accent">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-heading font-bold text-trailflow-dark mb-8 text-center">
              Eventos Disponíveis
            </h1>
            
            {/* Filters Section */}
            <div className="max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-trailflow-medium h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Busque por nome do evento..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              
              {/* Filter Row */}
              <div className="flex flex-wrap gap-4 items-center justify-center">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-trailflow-dark mb-2">
                    Cidade
                  </label>
                  <CityFilter 
                    selectedCity={selectedCity}
                    onCityChange={setSelectedCity}
                  />
                </div>
                
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-trailflow-dark mb-2">
                    Data
                  </label>
                  <SimpleDateFilter
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    mode="select"
                  />
                </div>
                
                {(selectedCity !== 'Todas as cidades' || selectedDate) && (
                  <div className="flex flex-col justify-end">
                    <button
                      onClick={() => {
                        setSelectedCity('Todas as cidades');
                        handleClearDateFilter();
                      }}
                      className="text-sm text-trailflow-green hover:text-trailflow-green-dark underline mt-6"
                    >
                      Limpar filtros
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Events Grid */}
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
