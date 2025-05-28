
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FilterItem {
  value: string;
  label: string;
}

interface CheckboxFilterGroupProps {
  items: string[] | FilterItem[];
  selectedValue?: string;
  onSelectionChange: (value: string, checked: boolean) => void;
  maxHeight?: string;
  idPrefix: string;
}

const CheckboxFilterGroup: React.FC<CheckboxFilterGroupProps> = ({
  items,
  selectedValue,
  onSelectionChange,
  maxHeight = "max-h-40",
  idPrefix
}) => {
  const renderItem = (item: string | FilterItem, index: number) => {
    const value = typeof item === 'string' ? item : item.value;
    const label = typeof item === 'string' ? item : item.label;
    const itemId = `${idPrefix}-${value}`;

    return (
      <div key={value} className="flex items-center space-x-2">
        <Checkbox
          id={itemId}
          checked={selectedValue === value}
          onCheckedChange={(checked) => onSelectionChange(value, checked as boolean)}
        />
        <Label htmlFor={itemId} className="text-sm cursor-pointer text-gray-700 hover:text-gray-900">
          {label}
        </Label>
      </div>
    );
  };

  return (
    <div className={`space-y-2 ${maxHeight} overflow-y-auto`}>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
};

export default CheckboxFilterGroup;
