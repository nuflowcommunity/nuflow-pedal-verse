
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DateRangeFilterProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (start: Date | undefined, end: Date | undefined) => void;
}

export const DateRangeFilter = ({ startDate, endDate, onDateChange }: DateRangeFilterProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const handleSelect = (type: 'period' | 'month' | 'quarter' | 'year', value?: string) => {
    const today = new Date();
    let start: Date | undefined;
    let end: Date | undefined;
    
    switch(type) {
      case 'period':
        switch(value) {
          case 'today':
            start = today;
            end = today;
            break;
          case 'yesterday':
            const yesterday = new Date();
            yesterday.setDate(today.getDate() - 1);
            start = yesterday;
            end = yesterday;
            break;
          case 'thisWeek':
            start = new Date(today);
            start.setDate(today.getDate() - today.getDay());
            end = today;
            break;
          case 'lastWeek':
            start = new Date(today);
            start.setDate(today.getDate() - today.getDay() - 7);
            end = new Date(start);
            end.setDate(start.getDate() + 6);
            break;
          case 'thisMonth':
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = today;
            break;
          case 'lastMonth':
            start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            end = new Date(today.getFullYear(), today.getMonth(), 0);
            break;
          case 'thisYear':
            start = new Date(today.getFullYear(), 0, 1);
            end = today;
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    
    onDateChange(start, end);
    setIsOpen(false);
  };

  let buttonText = "Selecionar período";
  
  if (startDate && endDate) {
    if (format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')) {
      buttonText = format(startDate, 'dd MMM yyyy', { locale: ptBR });
    } else {
      buttonText = `${format(startDate, 'dd MMM', { locale: ptBR })} - ${format(endDate, 'dd MMM yyyy', { locale: ptBR })}`;
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarIcon className="h-4 w-4" />
          {buttonText}
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Tabs defaultValue="quick">
          <TabsList className="w-full">
            <TabsTrigger className="flex-1" value="quick">Rápidos</TabsTrigger>
            <TabsTrigger className="flex-1" value="custom">Personalizado</TabsTrigger>
          </TabsList>
          <div className="p-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => handleSelect('period', 'today')}
              >
                Hoje
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => handleSelect('period', 'yesterday')}
              >
                Ontem
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => handleSelect('period', 'thisWeek')}
              >
                Esta semana
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => handleSelect('period', 'lastWeek')}
              >
                Semana passada
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => handleSelect('period', 'thisMonth')}
              >
                Este mês
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => handleSelect('period', 'lastMonth')}
              >
                Mês passado
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => handleSelect('period', 'thisYear')}
              >
                Este ano
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs font-medium mb-1">De</p>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => onDateChange(date, endDate || date)}
                  className={cn("rounded-md border pointer-events-auto", "max-w-full")}
                />
              </div>
              <div>
                <p className="text-xs font-medium mb-1">Até</p>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => onDateChange(startDate || date, date)}
                  fromDate={startDate}
                  className={cn("rounded-md border pointer-events-auto", "max-w-full")}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button 
                size="sm" 
                onClick={() => {
                  if (startDate && endDate) {
                    setIsOpen(false);
                  }
                }}
                disabled={!startDate || !endDate}
              >
                Aplicar
              </Button>
            </div>
          </div>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
  categories: { value: string; label: string }[];
}

export const CategoryFilter = ({ value, onChange, categories }: CategoryFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Categoria" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas categorias</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

interface StatusFilterProps {
  value: string;
  onChange: (value: string) => void;
  statuses: { value: string; label: string }[];
}

export const StatusFilter = ({ value, onChange, statuses }: StatusFilterProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todos status</SelectItem>
        {statuses.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
