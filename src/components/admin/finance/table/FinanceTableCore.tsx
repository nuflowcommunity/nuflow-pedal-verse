
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FinanceTableColumn, FinanceTableProps } from './FinanceTableTypes';
import { TableSortHeader } from './TableSortHeader';
import { TableActions } from './TableActions';

export function FinanceTableCore<T extends Record<string, any>>({
  title,
  columns,
  data,
  actions,
  onRowClick,
  filters,
  pagination,
  emptyState,
  className,
  onSort,
  defaultSortField,
  defaultSortDirection = 'asc',
}: FinanceTableProps<T>) {
  const [sortField, setSortField] = useState<keyof T | undefined>(defaultSortField);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(defaultSortDirection);

  // Handle column header click for sorting
  const handleSort = (column: FinanceTableColumn<T>) => {
    if (!column.sortable) return;
    
    const field = column.accessorKey;
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    
    setSortField(field);
    setSortDirection(direction);
    
    if (onSort) {
      onSort(field, direction);
    }
  };

  // Sort data locally if no external sort handler is provided
  const sortedData = useMemo(() => {
    if (!sortField || !onSort) {
      return data;
    }
    
    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === undefined || aValue === null) return sortDirection === 'asc' ? -1 : 1;
      if (bValue === undefined || bValue === null) return sortDirection === 'asc' ? 1 : -1;
      
      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === 'asc' 
        ? (aValue > bValue ? 1 : -1) 
        : (aValue > bValue ? -1 : 1);
    });
  }, [data, sortField, sortDirection, onSort]);

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {filters && (
            <div className="flex items-center gap-2">
              {filters}
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-1" />
                Filtros
              </Button>
              <Button variant="outline" size="sm">
                <FileDown className="h-4 w-4 mr-1" />
                Exportar
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableSortHeader
                    key={column.id.toString()}
                    column={column}
                    sortField={sortField}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                ))}
                {actions && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length > 0 ? (
                sortedData.map((item, index) => (
                  <TableRow
                    key={index}
                    className={onRowClick ? 'cursor-pointer' : ''}
                    onClick={() => onRowClick && onRowClick(item)}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id.toString()}>
                        {column.cell
                          ? column.cell(item)
                          : item[column.accessorKey]}
                      </TableCell>
                    ))}
                    {actions && <TableActions item={item} actions={actions} />}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="h-24 text-center"
                  >
                    {emptyState || "Nenhum dado encontrado."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {pagination && (
          <div className="flex items-center justify-end p-4">
            {pagination}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
