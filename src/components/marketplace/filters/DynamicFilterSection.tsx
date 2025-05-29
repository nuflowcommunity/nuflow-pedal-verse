
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { DynamicFilter } from '@/services/marketplace/dynamicFilters';

interface DynamicFilterSectionProps {
  filter: DynamicFilter;
  value: any;
  onChange: (value: any) => void;
}

const DynamicFilterSection: React.FC<DynamicFilterSectionProps> = ({
  filter,
  value,
  onChange
}) => {
  const renderFilterContent = () => {
    switch (filter.type) {
      case 'select':
        return (
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={`Selecione ${filter.name.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 shadow-lg max-h-60">
              <SelectItem value="">Todos</SelectItem>
              {filter.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {filter.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={`${filter.id}-${option}`}
                  checked={Array.isArray(value) ? value.includes(option) : false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onChange(Array.isArray(value) ? [...value, option] : [option]);
                    } else {
                      onChange(Array.isArray(value) ? value.filter(v => v !== option) : []);
                    }
                  }}
                />
                <Label 
                  htmlFor={`${filter.id}-${option}`}
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );

      case 'range':
        const rangeValue = Array.isArray(value) ? value : [0, 100];
        return (
          <div className="space-y-3">
            <Slider
              value={rangeValue}
              onValueChange={onChange}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{rangeValue[0]}</span>
              <span>{rangeValue[1]}</span>
            </div>
          </div>
        );

      case 'text':
      default:
        return (
          <Input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Digite ${filter.name.toLowerCase()}`}
            className="w-full"
          />
        );
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-700">
          {filter.name}
        </Label>
        {filter.is_ai_suggested && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            IA
          </span>
        )}
      </div>
      {renderFilterContent()}
    </div>
  );
};

export default DynamicFilterSection;
