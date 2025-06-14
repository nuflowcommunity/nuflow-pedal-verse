
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
    <div className="min-h-screen bg-trailflow-white">
      <Navbar />
      
      <main>
        {/* Polymer-style Hero Section with Fixed Scaling */}
        <section className="polymer-dark-section relative overflow-hidden">
          <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-20 sm:py-24 lg:py-32 xl:py-40">
            <div className="text-center space-y-8 lg:space-y-12">
              <div className="polymer-text-reveal animate">
                <div className="polymer-text-reveal-inner">
                  <h1 className="polymer-heading-lg text-trailflow-white leading-none tracking-[0.2em] font-light text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                    EVENTOS
                  </h1>
                </div>
              </div>
              
              <div className="w-full max-w-md mx-auto">
                <div className="h-px bg-gradient-to-r from-transparent via-trailflow-green to-transparent opacity-30"></div>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <p className="polymer-body-large text-trailflow-white/80 text-lg sm:text-xl lg:text-2xl leading-relaxed font-light">
                  Descubra experiências únicas no mundo do ciclismo. 
                  Cada evento é uma oportunidade de superar limites e conectar-se com a comunidade.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 pt-8">
                <div className="text-center">
                  <span className="polymer-specs text-trailflow-white/60 uppercase tracking-wider text-xs sm:text-sm">Eventos Ativos</span>
                  <div className="text-trailflow-accent font-medium text-lg sm:text-xl mt-1">{stats.totalEvents}</div>
                </div>
                <div className="text-center">
                  <span className="polymer-specs text-trailflow-white/60 uppercase tracking-wider text-xs sm:text-sm">Cidades</span>
                  <div className="text-trailflow-accent font-medium text-lg sm:text-xl mt-1">{stats.citiesCount}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Polymer geometric overlay - Fixed positioning */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-bl from-trailflow-accent to-transparent"></div>
          </div>
        </section>

        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-20 xl:py-24">
          {/* Statistics in Polymer style - Better Responsive Design */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
              {[
                { label: 'Eventos', value: stats.totalEvents, unit: '' },
                { label: 'Preço Médio', value: stats.averagePrice > 0 ? Math.round(stats.averagePrice) : 0, unit: stats.averagePrice > 0 ? 'R$' : 'Grátis' },
                { label: 'Cidades', value: stats.citiesCount, unit: '' },
                { label: 'Participantes', value: `${stats.totalParticipants}+`, unit: '' }
              ].map((stat, index) => (
                <div key={index} className="text-center polymer-stagger-1 polymer-interactive">
                  <div className="polymer-heading-sm text-trailflow-dark mb-2 text-2xl sm:text-3xl lg:text-4xl font-light tracking-wider">
                    {typeof stat.value === 'number' ? stat.value : stat.value}
                  </div>
                  <div className="polymer-specs text-trailflow-medium uppercase tracking-wider text-xs sm:text-sm">
                    {stat.unit && stat.unit !== 'Grátis' && stat.unit}{stat.label}
                    {stat.unit === 'Grátis' && <span className="block text-trailflow-green font-medium">Grátis</span>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="w-full max-w-md mx-auto">
              <div className="h-px bg-gradient-to-r from-transparent via-trailflow-green to-transparent"></div>
            </div>
          </section>

          {/* Filters in Polymer editorial style - Improved Layout */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="polymer-heading-sm text-trailflow-dark mb-4 text-xl sm:text-2xl lg:text-3xl font-light tracking-wider uppercase">
                Filtros
              </h2>
              <p className="polymer-body text-trailflow-medium max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
                Encontre o evento perfeito utilizando nossos filtros inteligentes.
              </p>
            </div>

            <div className="w-full">
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
            </div>
          </section>

          {/* Results header in Polymer style - Better Responsive Design */}
          <section className="mb-8 sm:mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
              <div className="text-center lg:text-left">
                <h3 className="polymer-heading-sm text-trailflow-dark mb-2 text-lg sm:text-xl lg:text-2xl font-light tracking-wider uppercase">
                  Resultados
                </h3>
                <p className="polymer-body text-trailflow-medium text-sm sm:text-base">
                  {finalFilteredEvents.length === 0 && !isLoading ? 
                    'Nenhum evento encontrado' : 
                    `${finalFilteredEvents.length} evento${finalFilteredEvents.length !== 1 ? 's' : ''} encontrado${finalFilteredEvents.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
              
              <div className="flex justify-center lg:justify-end">
                <EventSortOptions
                  sortBy={filters.sortBy}
                  onSortChange={(value) => updateFilter('sortBy', value)}
                />
              </div>
            </div>
            
            <div className="w-full max-w-md mx-auto lg:mx-0 mt-6 sm:mt-8">
              <div className="h-px bg-gradient-to-r from-transparent via-trailflow-green to-transparent"></div>
            </div>
          </section>

          {/* Events Grid - Improved Responsive Layout */}
          <div className="w-full">
            <EventsGrid 
              events={finalFilteredEvents} 
              isLoading={isLoading}
              onClearFilters={clearAllFilters}
            />
          </div>
        </div>
        
        <BackToTopButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsCalendar;
