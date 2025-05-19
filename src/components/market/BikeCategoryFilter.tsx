
import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface BikeCategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const BikeCategoryFilter = ({ categories, activeCategory, onCategoryChange }: BikeCategoryFilterProps) => {
  return (
    <section className="py-6 border-b border-nuflow-mineral/20">
      <div className="container-custom">
        <div className="flex items-center overflow-x-auto pb-2 hide-scrollbar">
          <button 
            onClick={() => onCategoryChange('all')}
            className={`px-5 py-2 rounded-full whitespace-nowrap mr-3 ${
              activeCategory === 'all' 
                ? 'bg-nuflow-moss text-white' 
                : 'bg-nuflow-sand text-nuflow-charcoal hover:bg-nuflow-mineral/20'
            }`}
          >
            Todas
          </button>
          
          {categories.map((category) => (
            <button 
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-5 py-2 rounded-full whitespace-nowrap mr-3 ${
                activeCategory === category.id 
                  ? 'bg-nuflow-moss text-white' 
                  : 'bg-nuflow-sand text-nuflow-charcoal hover:bg-nuflow-mineral/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BikeCategoryFilter;
