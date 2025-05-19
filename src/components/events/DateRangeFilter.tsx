
import React from 'react';
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangeFilterProps {
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
  onFilterByDate: () => void;
  onClearDateFilter: () => void;
}

const DateRangeFilter = ({ 
  dateRange, 
  setDateRange, 
  onFilterByDate,
  onClearDateFilter
}: DateRangeFilterProps) => {
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "flex items-center gap-2 border-nuflow-mineral/30 hover:bg-nuflow-neon/10 hover:border-nuflow-neon hover:text-nuflow-moss",
              dateRange?.from && "text-nuflow-moss"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd/MM/y")} - {format(dateRange.to, "dd/MM/y")}
                </>
              ) : (
                format(dateRange.from, "dd/MM/y")
              )
            ) : (
              "Selecione datas"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            className="p-3 pointer-events-auto"
          />
          <div className="p-3 border-t border-nuflow-mineral/20 flex justify-between">
            <Button 
              variant="outline" 
              className="text-nuflow-charcoal hover:bg-nuflow-mineral/10"
              onClick={onClearDateFilter}
            >
              Limpar
            </Button>
            <Button 
              className="bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss"
              onClick={onFilterByDate}
            >
              Aplicar filtro
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangeFilter;
