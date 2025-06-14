
import React from 'react';
import EventCard from '@/components/cards/EventCard';
import { Event } from '@/types/events';
import { EventCardSkeleton } from '@/components/ui/enhanced-skeleton';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventsGridProps {
  events: Event[];
  isLoading?: boolean;
  onClearFilters?: () => void;
}

const EventsGrid = ({ events, isLoading = false, onClearFilters }: EventsGridProps) => {
  if (isLoading) {
    return (
      <section className="py-12">
        <div className="polymer-grid-editorial grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={`polymer-stagger-${(index % 5) + 1}`}>
              <EventCardSkeleton />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-24">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-32 h-32 mx-auto mb-8 bg-trailflow-accent/30 flex items-center justify-center polymer-interactive">
            <Search className="w-16 h-16 text-trailflow-medium" />
          </div>
          
          <h3 className="polymer-heading-sm text-trailflow-dark mb-6">
            Nenhum evento encontrado
          </h3>
          
          <p className="polymer-body text-trailflow-medium mb-8 leading-relaxed max-w-lg mx-auto">
            Não encontramos eventos que correspondam aos seus critérios de busca. 
            Tente ajustar os filtros ou explorar outras opções.
          </p>
          
          <div className="polymer-editorial-line mb-8"></div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {onClearFilters && (
              <Button 
                onClick={onClearFilters}
                className="polymer-btn inline-flex items-center px-6 py-3 text-sm font-light text-trailflow-green bg-trailflow-green/10 hover:bg-trailflow-green hover:text-white transition-all duration-300 rounded-none border border-trailflow-green"
              >
                <Filter className="w-4 h-4 mr-2" />
                Limpar filtros
              </Button>
            )}
            <Button 
              variant="outline"
              className="polymer-btn inline-flex items-center px-6 py-3 text-sm font-light text-trailflow-dark bg-trailflow-white hover:bg-trailflow-accent transition-all duration-300 rounded-none border border-trailflow-light"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Ver todos os eventos
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="polymer-grid-editorial grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event, index) => (
          <div key={event.id} className={`polymer-stagger-${(index % 5) + 1} polymer-interactive`}>
            <EventCard {...event} showBuyButton={true} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsGrid;
