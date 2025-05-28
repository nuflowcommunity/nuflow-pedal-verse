
import React from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/cards/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/enhanced-skeleton';

interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  location: string;
  condition: string;
  brand: string;
}

interface ProductsGridProps {
  title: string;
  products: Product[];
  onLoadMore?: () => void;
  showLoadMore?: boolean;
  isLoading?: boolean;
}

const ProductsGrid = ({ 
  title, 
  products,
  onLoadMore,
  showLoadMore = true,
  isLoading = false
}: ProductsGridProps) => {
  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-nuflow-darkForest">
          {title} {!isLoading && products.length > 0 && `(${products.length})`}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          )}
        </div>
        
        {showLoadMore && !isLoading && products.length > 0 && (
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              className="border-nuflow-forest text-nuflow-forest hover:bg-nuflow-forest hover:text-white px-8"
              onClick={onLoadMore}
            >
              Carregar mais
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;
