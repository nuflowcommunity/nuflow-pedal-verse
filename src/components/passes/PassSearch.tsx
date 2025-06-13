
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface PassSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoading?: boolean;
}

export const PassSearch: React.FC<PassSearchProps> = ({
  searchQuery,
  onSearchChange,
  isLoading = false
}) => {
  return (
    <div className="relative max-w-md">
      <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Buscar por evento, participante ou parceiro..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        disabled={isLoading}
        className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-trailflow-green focus:ring-trailflow-green"
      />
    </div>
  );
};
