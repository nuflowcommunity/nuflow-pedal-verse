import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, FileDown, Filter, ArrowUp, ArrowDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface FinanceTableColumn<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface FinanceTableProps<T> {
  title: string;
  columns: FinanceTableColumn<T>[];
  data: T[];
  actions?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
    custom?: Array<{
      label: string;
      icon: React.ReactNode;
      onClick: (item: T) => void;
    }>;
  } | ((item: T) => {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
    custom?: Array<{
      label: string;
      icon: React.ReactNode;
      onClick: (item: T) => void;
    }>;
  });
  onRowClick?: (item: T) => void;
  filters?: React.ReactNode;
  pagination?: React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
  onSort?: (field: keyof T, direction: 'asc' | 'desc') => void;
  defaultSortField?: keyof T;
  defaultSortDirection?: 'asc' | 'desc';
}

export function FinanceTable<T extends Record<string, any>>({
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
  const sortedData = React.useMemo(() => {
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
                  <TableHead 
                    key={column.id.toString()}
                    className={column.sortable ? 'cursor-pointer hover:bg-muted/50' : ''}
                    onClick={() => column.sortable && handleSort(column)}
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
                    {actions && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {typeof actions === 'function' ? (
                            <>
                              {actions(item).view && (
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">Ver</span>
                                </Button>
                              )}
                              {actions(item).custom && actions(item).custom?.map((action, i) => (
                                <Button
                                  key={i}
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick(item);
                                  }}
                                >
                                  {action.icon}
                                  <span className="sr-only">{action.label}</span>
                                </Button>
                              ))}
                            </>
                          ) : (
                            <>
                              {actions.view && (
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">Ver</span>
                                </Button>
                              )}
                              {actions.custom && actions.custom.map((action, i) => (
                                <Button
                                  key={i}
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    action.onClick(item);
                                  }}
                                >
                                  {action.icon}
                                  <span className="sr-only">{action.label}</span>
                                </Button>
                              ))}
                            </>
                          )}
                        </div>
                      </TableCell>
                    )}
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

export function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pago':
    case 'recebido':
    case 'completo':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
    case 'pendente':
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{status}</Badge>;
    case 'atrasado':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>;
    case 'cancelado':
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{status}</Badge>;
    case 'em análise':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
