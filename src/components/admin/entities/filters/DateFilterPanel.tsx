
import React from 'react';
import { Button } from '@/components/ui/button';
import { DateRangeFilter } from '@/components/admin/finance/FinanceFilters';

interface DateFilterPanelProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (start: Date | undefined, end: Date | undefined) => void;
  onFilterLast24Hours: () => void;
  onFilterCurrentMonth: () => void;
  onFilterAllTime: () => void;
}

export const DateFilterPanel: React.FC<DateFilterPanelProps> = ({
  startDate,
  endDate,
  onDateChange,
  onFilterLast24Hours,
  onFilterCurrentMonth,
  onFilterAllTime
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <DateRangeFilter 
        startDate={startDate} 
        endDate={endDate} 
        onDateChange={onDateChange} 
      />
      <Button 
        variant="outline" 
        size="sm"
        onClick={onFilterLast24Hours}
        className="h-10"
      >
        Últimas 24h
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onFilterCurrentMonth}
        className="h-10"
      >
        Mês Atual
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onFilterAllTime}
        className="h-10"
      >
        Todo Período
      </Button>
    </div>
  );
};
