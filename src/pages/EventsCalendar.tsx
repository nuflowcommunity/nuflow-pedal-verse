
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
        {/* Polymer-style Hero Section */}
        <section className="polymer-dark-section relative overflow-hidden">
          <div className="container-editorial py-32 lg:py-40">
            <div className="polymer-text-reveal animate">
              <div className="polymer-text-reveal-inner">
                <h1 className="polymer-heading-lg text-trailflow-white mb-8">
                  Eventos
                </h1>
              </div>
            </div>
            
            <div className="polymer-editorial-line mb-12 opacity-30"></div>
            
            <div className="max-w-2xl">
              <p className="polymer-body-large text-trailflow-white/80 mb-8">
                Descubra experiências únicas no mundo do ciclismo. 
                Cada evento é uma oportunidade de superar limites e conectar-se com a comunidade.
              </p>
              
              <div className="flex items-center gap-8 polymer-specs text-trailflow-white/60">
                <span>Eventos Ativos</span>
                <span className="text-trailflow-accent font-medium">{stats.totalEvents}</span>
                <span>Cidades</span>
                <span className="text-trailflow-accent font-medium">{stats.citiesCount}</span>
              </div>
            </div>
          </div>
          
          {/* Polymer geometric overlay */}
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
            <div className="w-full h-full bg-gradient-to-bl from-trailflow-accent to-transparent"></div>
          </div>
        </section>

        <div className="container-editorial py-16 lg:py-24">
          {/* Statistics in Polymer style */}
          <section className="mb-16">
            <div className="polymer-grid-editorial grid-cols-2 lg:grid-cols-4 mb-12">
              {[
                { label: 'Eventos', value: stats.totalEvents, unit: '' },
                { label: 'Preço Médio', value: stats.averagePrice > 0 ? Math.round(stats.averagePrice) : 0, unit: stats.averagePrice > 0 ? 'R$' : 'Grátis' },
                { label: 'Cidades', value: stats.citiesCount, unit: '' },
                { label: 'Participantes', value: `${stats.totalParticipants}+`, unit: '' }
              ].map((stat, index) => (
                <div key={index} className="text-center polymer-stagger-1 polymer-interactive">
                  <div className="polymer-heading-sm text-trailflow-dark mb-2">
                    {typeof stat.value === 'number' ? stat.value : stat.value}
                  </div>
                  <div className="polymer-specs text-trailflow-medium uppercase tracking-wider">
                    {stat.unit && stat.unit !== 'Grátis' && stat.unit}{stat.label}
                    {stat.unit === 'Grátis' && <span className="block text-trailflow-green">Grátis</span>}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="polymer-editorial-line"></div>
          </section>

          {/* Filters in Polymer editorial style */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="polymer-heading-sm text-trailflow-dark mb-4">
                Filtros
              </h2>
              <p className="polymer-body text-trailflow-medium max-w-2xl">
                Encontre o evento perfeito utilizando nossos filtros inteligentes.
              </p>
            </div>

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
          </section>

          {/* Results header in Polymer style */}
          <section className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h3 className="polymer-heading-sm text-trailflow-dark mb-2">
                  Resultados
                </h3>
                <p className="polymer-body text-trailflow-medium">
                  {finalFilteredEvents.length === 0 && !isLoading ? 
                    'Nenhum evento encontrado' : 
                    `${finalFilteredEvents.length} evento${finalFilteredEvents.length !== 1 ? 's' : ''} encontrado${finalFilteredEvents.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
              
              <div className="polymer-interactive">
                <EventSortOptions
                  sortBy={filters.sortBy}
                  onSortChange={(value) => updateFilter('sortBy', value)}
                />
              </div>
            </div>
            
            <div className="polymer-editorial-line mt-8"></div>
          </section>

          {/* Events Grid */}
          <EventsGrid 
            events={finalFilteredEvents} 
            isLoading={isLoading}
            onClearFilters={clearAllFilters}
          />
        </div>
        
        <BackToTopButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsCalendar;
