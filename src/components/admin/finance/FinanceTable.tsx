
// This file now exports all components from the new files
import { FinanceTableCore } from './table/FinanceTableCore';
import { FinanceTableColumn, FinanceTableProps } from './table/FinanceTableTypes';
import { getStatusBadge } from './table/StatusBadge';

// Re-export the components for backwards compatibility
export { FinanceTableCore as FinanceTable, getStatusBadge };
export type { FinanceTableColumn, FinanceTableProps };
