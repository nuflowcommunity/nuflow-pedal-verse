
import React from 'react';
import SortFilter from '../market/SortFilter';

interface EventsSortFilterProps {
  onSortChange: (value: string) => void;
}

const EventsSortFilter = ({ onSortChange }: EventsSortFilterProps) => {
  const eventSortOptions = [
    {value: "", label: "Ordenar por"},
    {value: "date-asc", label: "Próximos eventos"},
    {value: "date-desc", label: "Eventos passados"},
    {value: "price-asc", label: "Menor preço"},
    {value: "price-desc", label: "Maior preço"}
  ];

  return (
    <SortFilter 
      onChange={onSortChange}
      sortOptions={eventSortOptions}
      className="w-full md:w-auto"
    />
  );
};

export default EventsSortFilter;
