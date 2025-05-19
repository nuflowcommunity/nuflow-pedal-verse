
import React from 'react';
import { Button } from "@/components/ui/button";
import { Filter } from 'lucide-react';

interface EventsCategoryFilterProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const EventsCategoryFilter = ({ categories, activeCategory, setActiveCategory }: EventsCategoryFilterProps) => {
  return (
    <section className="py-4 bg-nuflow-sand">
      <div className="container-custom">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button 
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category 
                  ? "bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss" 
                  : "border-nuflow-moss text-nuflow-moss hover:bg-nuflow-moss/10"
              }
            >
              {category}
            </Button>
          ))}
          
          <Button 
            variant="outline" 
            className="ml-auto border-nuflow-moss text-nuflow-moss hover:bg-nuflow-moss/10 flex items-center"
          >
            <Filter size={16} className="mr-2" />
            Mais Filtros
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsCategoryFilter;
