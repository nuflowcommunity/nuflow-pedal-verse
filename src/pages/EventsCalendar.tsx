
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
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-4xl font-light text-gray-900 mb-16 text-center uppercase tracking-widest">
              Eventos Disponíveis
            </h1>
            
            {/* Search and Filters Section */}
            <div className="max-w-4xl mx-auto mb-16">
              {/* Search Bar */}
              <div className="relative mb-8">
                <div className="relative">
                  <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Buscar evento..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-4 py-4 text-base border-0 border-b border-gray-200 rounded-none bg-transparent focus:border-gray-400 focus:ring-0 placeholder:text-gray-400"
                  />
                </div>
              </div>
              
              {/* Filter Row */}
              <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-center">
                <div className="flex flex-col items-center">
                  <label className="text-xs font-normal text-gray-600 mb-3 uppercase tracking-wider">
                    Cidade
                  </label>
                  <CityFilter 
                    selectedCity={selectedCity}
                    onCityChange={setSelectedCity}
                  />
                </div>
                
                <div className="flex flex-col items-center">
                  <label className="text-xs font-normal text-gray-600 mb-3 uppercase tracking-wider">
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
                      className="text-xs text-gray-500 hover:text-gray-700 transition-colors mt-6 uppercase tracking-wide"
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
