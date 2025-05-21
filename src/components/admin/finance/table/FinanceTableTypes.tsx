
import React from 'react';

// Extracted type definitions
export interface FinanceTableColumn<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export interface FinanceTableProps<T> {
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
