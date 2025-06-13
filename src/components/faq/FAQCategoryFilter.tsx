
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FAQCategory } from '@/types/faq';

interface FAQCategoryFilterProps {
  categories: FAQCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const FAQCategoryFilter: React.FC<FAQCategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="w-full mb-8">
      <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-1 bg-gray-100">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id}
              value={category.name}
              className="py-3 px-4 text-xs md:text-sm font-medium whitespace-nowrap data-[state=active]:bg-trailflow-green data-[state=active]:text-white"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
