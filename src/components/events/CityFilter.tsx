
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
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecione a cidade" />
      </SelectTrigger>
      <SelectContent>
        {cities.map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CityFilter;
