
import React from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SortFilterProps {
  onChange?: (value: string) => void;
  sortOptions?: {value: string, label: string}[];
  placeholder?: string;
  className?: string;
  showFilterButton?: boolean;
  onFilterClick?: () => void;
}

const SortFilter = ({ 
  onChange, 
  sortOptions = [
    {value: "", label: "Ordenar por"},
    {value: "recent", label: "Mais recentes"},
    {value: "price-asc", label: "Menor preço"},
    {value: "price-desc", label: "Maior preço"}
  ],
  placeholder = "Ordenar por",
  className = "",
  showFilterButton = false,
  onFilterClick
}: SortFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showFilterButton && (
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border border-nuflow-mineral/30 hover:bg-nuflow-moss hover:text-white hover:border-nuflow-moss"
          onClick={onFilterClick}
        >
          <Filter size={18} />
          Filtros
        </Button>
      )}
      
      <select 
        className={`px-4 py-3 border border-nuflow-mineral/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-nuflow-moss ${className}`}
        onChange={handleChange}
      >
        {sortOptions.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SortFilter;
