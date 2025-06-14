
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
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
        Ordenar por:
      </span>
      <Select value={sortBy || 'relevance'} onValueChange={onSortChange}>
        <SelectTrigger className="w-auto min-w-[200px] border-gray-200 focus:border-trailflow-green">
          <SelectValue placeholder="Selecione a ordenação" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
          {sortOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
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
