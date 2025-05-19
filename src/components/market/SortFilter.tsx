
import React from 'react';

interface SortFilterProps {
  onChange?: (value: string) => void;
  sortOptions?: {value: string, label: string}[];
  placeholder?: string;
  className?: string;
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
  className = ""
}: SortFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <select 
      className={`px-4 py-3 border border-nuflow-mineral/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-nuflow-moss ${className}`}
      onChange={handleChange}
    >
      {sortOptions.map((option, index) => (
        <option key={index} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
};

export default SortFilter;
