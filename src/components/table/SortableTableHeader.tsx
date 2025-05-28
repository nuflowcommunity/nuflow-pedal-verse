
import React from 'react';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TableHead } from '@/components/ui/table';

interface SortableTableHeaderProps {
  children: React.ReactNode;
  field: string;
  currentSort?: string;
  currentDirection?: 'asc' | 'desc';
  onSort: (field: string, direction: 'asc' | 'desc') => void;
  className?: string;
}

export const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  children,
  field,
  currentSort,
  currentDirection,
  onSort,
  className = ""
}) => {
  const isActive = currentSort === field;
  
  const handleClick = () => {
    if (!isActive) {
      onSort(field, 'asc');
    } else if (currentDirection === 'asc') {
      onSort(field, 'desc');
    } else {
      onSort(field, 'asc');
    }
  };

  const getSortIcon = () => {
    if (!isActive) {
      return <ArrowUpDown size={14} className="opacity-50" />;
    }
    return currentDirection === 'asc' 
      ? <ArrowUp size={14} className="text-blue-600" />
      : <ArrowDown size={14} className="text-blue-600" />;
  };

  return (
    <TableHead className={className}>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClick}
        className={`h-auto p-0 font-medium justify-start hover:bg-transparent ${
          isActive ? 'text-blue-600' : 'text-gray-700 hover:text-gray-900'
        }`}
      >
        <span className="flex items-center gap-1">
          {children}
          {getSortIcon()}
        </span>
      </Button>
    </TableHead>
  );
};
