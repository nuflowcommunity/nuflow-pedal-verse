
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsGrid from '@/components/events/EventsGrid';
import BackToTopButton from '@/components/BackToTopButton';
import { EventFiltersPanel } from '@/components/events/EventFiltersPanel';
import { EventSortOptions } from '@/components/events/EventSortOptions';
import { EventsStats } from '@/components/events/EventsStats';
import { useEventsData } from '@/hooks/useEventsData';
import { useAdvancedEventFilters } from '@/hooks/useAdvancedEventFilters';

const EventsCalendar = () => {
  const { filteredEvents, isLoading } = useEventsData();
  
  const {
    filters,
    filteredEvents: finalFilteredEvents,
    activeFilters,
    stats,
    updateFilter,
    clearFilter,
    clearAllFilters
  } = useAdvancedEventFilters(filteredEvents);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Modern Header Section */}
        <section className="bg-gradient-to-br from-trailflow-green to-trailflow-green-dark py-20">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Descubra Eventos
                <span className="block text-trailflow-accent">Incríveis</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
                Encontre o evento perfeito para você com nossos filtros inteligentes.
                Explore, compare e participe dos melhores eventos de ciclismo.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 max-w-7xl py-8">
          {/* Statistics */}
          <EventsStats {...stats} />

          {/* Advanced Filters Panel */}
          <EventFiltersPanel
            searchQuery={filters.searchQuery}
            onSearchChange={(value) => updateFilter('searchQuery', value)}
            selectedCity={filters.selectedCity}
            onCityChange={(value) => updateFilter('selectedCity', value)}
            selectedCategory={filters.selectedCategory}
            onCategoryChange={(value) => updateFilter('selectedCategory', value)}
            selectedPriceRange={filters.selectedPriceRange}
            onPriceRangeChange={(value) => updateFilter('selectedPriceRange', value)}
            selectedDifficulty={filters.selectedDifficulty}
            onDifficultyChange={(value) => updateFilter('selectedDifficulty', value)}
            selectedDistance={filters.selectedDistance}
            onDistanceChange={(value) => updateFilter('selectedDistance', value)}
            activeFilters={activeFilters}
            onClearFilter={clearFilter}
            onClearAllFilters={clearAllFilters}
            resultsCount={finalFilteredEvents.length}
            isLoading={isLoading}
          />

          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-lg font-semibold text-gray-900">
              {finalFilteredEvents.length === 0 && !isLoading ? 
                'Nenhum evento encontrado' : 
                `${finalFilteredEvents.length} evento${finalFilteredEvents.length !== 1 ? 's' : ''} encontrado${finalFilteredEvents.length !== 1 ? 's' : ''}`
              }
            </div>
            <EventSortOptions
              sortBy={filters.sortBy}
              onSortChange={(value) => updateFilter('sortBy', value)}
            />
          </div>

          {/* Events Grid */}
          <EventsGrid 
            events={finalFilteredEvents} 
            isLoading={isLoading} 
          />
        </div>
        
        <BackToTopButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsCalendar;
