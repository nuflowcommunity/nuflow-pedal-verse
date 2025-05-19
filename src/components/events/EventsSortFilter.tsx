
import React from 'react';
import SortFilter from '../market/SortFilter';

interface EventsSortFilterProps {
  onSortChange: (value: string) => void;
  onFilterClick?: () => void;
  showFilterButton?: boolean;
  className?: string;
}

const EventsSortFilter = ({ 
  onSortChange, 
  onFilterClick, 
  showFilterButton = false,
  className = ""
}: EventsSortFilterProps) => {
  const eventSortOptions = [
    {value: "", label: "Ordenar por"},
    {value: "date-asc", label: "Próximos eventos"},
    {value: "date-desc", label: "Eventos passados"},
    {value: "price-asc", label: "Menor preço"},
    {value: "price-desc", label: "Maior preço"},
    {value: "name-asc", label: "A-Z"},
    {value: "name-desc", label: "Z-A"},
    {value: "popularity", label: "Mais populares"}
  ];

  return (
    <SortFilter 
      onChange={onSortChange}
      sortOptions={eventSortOptions}
      className={`w-full md:w-auto ${className}`}
      showFilterButton={showFilterButton}
      onFilterClick={onFilterClick}
    />
  );
};

export default EventsSortFilter;
