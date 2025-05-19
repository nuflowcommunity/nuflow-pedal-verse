
import React from 'react';

interface SortFilterProps {
  onChange?: (value: string) => void;
}

const SortFilter = ({ onChange }: SortFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <select 
      className="px-4 py-3 border border-nuflow-mineral/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-nuflow-moss"
      onChange={handleChange}
    >
      <option value="">Ordenar por</option>
      <option value="recent">Mais recentes</option>
      <option value="price-asc">Menor preço</option>
      <option value="price-desc">Maior preço</option>
    </select>
  );
};

export default SortFilter;
