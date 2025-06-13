
import React from 'react';
import { format, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SimpleDateFilterProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  mode?: 'datepicker' | 'select';
}

const SimpleDateFilter = ({ 
  selectedDate, 
  onDateChange, 
  mode = 'select' 
}: SimpleDateFilterProps) => {
  // Generate next 30 days for select mode
  const getNext30Days = () => {
    const days = ['Todas as datas'];
    for (let i = 0; i < 30; i++) {
      const date = addDays(new Date(), i);
      days.push(format(date, "dd/MM/yyyy - EEEE", { locale: ptBR }));
    }
    return days;
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return 'Todas as datas';
    return format(selectedDate, "dd/MM/yyyy - EEEE", { locale: ptBR });
  };

  const handleSelectChange = (value: string) => {
    if (value === 'Todas as datas') {
      onDateChange(undefined);
    } else {
      const dayIndex = getNext30Days().indexOf(value) - 1;
      if (dayIndex >= 0) {
        onDateChange(addDays(new Date(), dayIndex));
      }
    }
  };

  if (mode === 'select') {
    return (
      <Select value={formatSelectedDate()} onValueChange={handleSelectChange}>
        <SelectTrigger className="w-[250px] border-0 border-b border-gray-200 rounded-none bg-transparent focus:border-gray-400 focus:ring-0 text-sm">
          <SelectValue placeholder="Selecione a data" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 shadow-lg">
          {getNext30Days().map((day) => (
            <SelectItem key={day} value={day} className="text-sm hover:bg-gray-50">
              {day}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[250px] justify-start text-left font-normal border-0 border-b border-gray-200 rounded-none bg-transparent focus:border-gray-400 hover:bg-transparent",
            !selectedDate && "text-gray-400"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateChange}
          initialFocus
          className="p-3 pointer-events-auto"
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SimpleDateFilter;
