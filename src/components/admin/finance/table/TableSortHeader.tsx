
import React from 'react';
import { TableHead } from '@/components/ui/table';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { FinanceTableColumn } from './FinanceTableTypes';

interface TableSortHeaderProps<T> {
  column: FinanceTableColumn<T>;
  sortField?: keyof T;
  sortDirection: 'asc' | 'desc';
  onSort: (column: FinanceTableColumn<T>) => void;
}

export function TableSortHeader<T>({ 
  column, 
  sortField, 
  sortDirection, 
  onSort 
}: TableSortHeaderProps<T>) {
  return (
    <TableHead 
      key={column.id.toString()}
      className={column.sortable ? 'cursor-pointer hover:bg-muted/50' : ''}
      onClick={() => column.sortable && onSort(column)}
    >
      <div className="flex items-center space-x-1">
        <span>{column.header}</span>
        {column.sortable && sortField === column.accessorKey && (
          sortDirection === 'asc' 
            ? <ArrowUp className="h-3 w-3 ml-1" /> 
            : <ArrowDown className="h-3 w-3 ml-1" />
        )}
      </div>
    </TableHead>
  );
}
