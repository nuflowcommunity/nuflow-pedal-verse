
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface YearFilterProps {
  selectedYear?: number;
  onYearChange: (year: number | undefined) => void;
}

const YearFilter: React.FC<YearFilterProps> = ({
  selectedYear,
  onYearChange
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2009 }, (_, i) => currentYear - i)
    .filter(year => year <= 2025 && year >= 2010);

  const handleValueChange = (value: string) => {
    if (value === "all" || value === "") {
      onYearChange(undefined);
    } else {
      onYearChange(parseInt(value));
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium text-gray-700">
        Ano de Fabricação
      </Label>
      <Select 
        value={selectedYear ? selectedYear.toString() : "all"} 
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione o ano" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60">
          <SelectItem value="all">Todos os anos</SelectItem>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearFilter;
