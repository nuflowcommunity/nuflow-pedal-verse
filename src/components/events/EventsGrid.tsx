
import React from 'react';
import EventCard from '@/components/cards/EventCard';
import { Event } from '@/types/events';
import { EventCardSkeleton } from '@/components/ui/enhanced-skeleton';

interface EventsGridProps {
  events: Event[];
  isLoading?: boolean;
}

const EventsGrid = ({ events, isLoading = false }: EventsGridProps) => {
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} {...event} showBuyButton={true} />
          ))}
        </div>
        
        {events.length === 0 && !isLoading && (
          <div className="text-center py-20">
            <h3 className="text-xl font-light text-gray-600 mb-2 uppercase tracking-wide">
              Nenhum evento encontrado no momento
            </h3>
            <p className="text-gray-500 text-sm">
              Tente ajustar seus filtros ou faça uma nova busca.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsGrid;
