
import { FinanceTableColumn } from '@/components/admin/finance/FinanceTable';
import { Entity } from './types';
import { getBaseColumns } from './table/BaseColumns';
import { getEventColumns } from './table/EventColumns';
import { getMensalidadeColumns } from './table/MensalidadeColumns';
import { getDayUseColumns } from './table/DayUseColumns';
import { getCreditColumns } from './table/CreditColumns';

// Get columns based on entity type
export const getTypeSpecificColumns = (
  activeTab: string
): FinanceTableColumn<Entity>[] => {
  switch (activeTab) {
    case 'evento':
      return getEventColumns();
    case 'mensalidade':
      return getMensalidadeColumns();
    case 'dayUse':
      return getDayUseColumns();
    case 'credito':
      return getCreditColumns();
    default:
      return getBaseColumns();
  }
};

// Re-export the format utility functions
export { formatCurrency } from './table/FormatUtils';
