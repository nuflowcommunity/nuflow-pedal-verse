
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CityFilterProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CityFilter = ({ selectedCity, onCityChange }: CityFilterProps) => {
  const cities = [
    'Todas as cidades',
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
    'Brasília',
    'Curitiba',
    'Porto Alegre',
    'Salvador',
    'Recife',
    'Fortaleza'
  ];

  return (
    <Select value={selectedCity} onValueChange={onCityChange}>
      <SelectTrigger className="w-[200px] border-0 border-b border-gray-200 rounded-none bg-transparent focus:border-gray-400 focus:ring-0 text-sm">
        <SelectValue placeholder="Selecione a cidade" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray-200 shadow-lg">
        {cities.map((city) => (
          <SelectItem key={city} value={city} className="text-sm hover:bg-gray-50">
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CityFilter;
