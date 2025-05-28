
import React from 'react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
  className = ""
}) => {
  return (
    <>
      <div className={`space-y-3 ${className}`}>
        <Label className="text-sm font-medium text-gray-900">{title}</Label>
        {children}
      </div>
      <Separator className="bg-gray-200" />
    </>
  );
};

export default FilterSection;
