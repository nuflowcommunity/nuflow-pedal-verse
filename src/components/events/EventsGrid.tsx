
import React from 'react';
import EventCard from '@/components/cards/EventCard';
import { Event } from '@/types/events';
import { EventCardSkeleton } from '@/components/ui/enhanced-skeleton';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventsGridProps {
  events: Event[];
  isLoading?: boolean;
  onClearFilters?: () => void;
}

const EventsGrid = ({ events, isLoading = false, onClearFilters }: EventsGridProps) => {
  if (isLoading) {
    return (
      <section className="py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-16">
        <div className="text-center max-w-lg mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Nenhum evento encontrado
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            Não encontramos eventos que correspondam aos seus critérios de busca. 
            Tente ajustar os filtros ou fazer uma nova pesquisa.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onClearFilters && (
              <Button 
                onClick={onClearFilters}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-trailflow-green bg-trailflow-green/10 rounded-lg hover:bg-trailflow-green/20 transition-colors"
              >
                <Filter className="w-4 h-4 mr-2" />
                Limpar filtros
              </Button>
            )}
            <Button 
              variant="outline"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Ver todos os eventos
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} {...event} showBuyButton={true} />
        ))}
      </div>
    </section>
  );
};

export default EventsGrid;
