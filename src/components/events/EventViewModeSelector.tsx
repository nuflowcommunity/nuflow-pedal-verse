
import React from 'react';
import { Button } from '@/components/ui/button';

interface EventViewModeSelectorProps {
  viewMode: 'all' | 'upcoming' | 'past';
  onViewModeChange: (mode: 'all' | 'upcoming' | 'past') => void;
}

const EventViewModeSelector = ({ viewMode, onViewModeChange }: EventViewModeSelectorProps) => {
  return (
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
              onClick={() => onViewModeChange('all')}
            >
              Todos
            </Button>
            <Button 
              variant={viewMode === 'upcoming' ? "default" : "outline"}
              className={viewMode === 'upcoming' ? 
                "bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90" : 
                "border-white text-white hover:bg-white/10"}
              onClick={() => onViewModeChange('upcoming')}
            >
              Próximos eventos
            </Button>
            <Button 
              variant={viewMode === 'past' ? "default" : "outline"}
              className={viewMode === 'past' ? 
                "bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90" : 
                "border-white text-white hover:bg-white/10"}
              onClick={() => onViewModeChange('past')}
            >
              Eventos passados
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventViewModeSelector;
