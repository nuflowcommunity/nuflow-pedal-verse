
import React from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/cards/ProductCard';

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
}

const ProductsGrid = ({ 
  title, 
  products,
  onLoadMore,
  showLoadMore = true
}: ProductsGridProps) => {
  return (
    <section className="py-12">
      <div className="container-custom">
        <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
          {title} {products.length > 0 && `(${products.length})`}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {showLoadMore && (
          <div className="mt-12 text-center">
            <Button 
              variant="outline" 
              className="border-nuflow-moss text-nuflow-moss px-8"
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
