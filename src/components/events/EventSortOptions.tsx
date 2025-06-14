
import React from 'react';
import { ArrowUpDown, Calendar, DollarSign, MapPin, Zap } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EventSortOptionsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const sortOptions = [
  { value: 'relevance', label: 'Relevância', icon: Zap },
  { value: 'date-asc', label: 'Data: Mais próximos', icon: Calendar },
  { value: 'date-desc', label: 'Data: Mais distantes', icon: Calendar },
  { value: 'price-asc', label: 'Preço: Menor para maior', icon: DollarSign },
  { value: 'price-desc', label: 'Preço: Maior para menor', icon: DollarSign },
  { value: 'name-asc', label: 'Nome: A-Z', icon: ArrowUpDown },
  { value: 'name-desc', label: 'Nome: Z-A', icon: ArrowUpDown },
  { value: 'location', label: 'Localização', icon: MapPin }
];

export const EventSortOptions: React.FC<EventSortOptionsProps> = ({
  sortBy,
  onSortChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <span className="polymer-specs text-trailflow-medium uppercase tracking-wider whitespace-nowrap text-xs sm:text-sm text-center">
        Ordenar por:
      </span>
      <Select value={sortBy || 'relevance'} onValueChange={onSortChange}>
        <SelectTrigger className="w-full sm:w-auto min-w-[200px] sm:min-w-[250px] border-trailflow-light/30 focus:border-trailflow-green rounded-none polymer-body">
          <SelectValue placeholder="Selecione a ordenação" />
        </SelectTrigger>
        <SelectContent className="bg-trailflow-white border border-trailflow-light/30 shadow-xl z-50">
          {sortOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-3 polymer-body">
                  <IconComponent className="h-4 w-4 text-trailflow-medium" />
                  {option.label}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
