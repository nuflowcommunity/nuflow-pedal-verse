
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
    <section className="py-8 lg:py-12">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-nuflow-darkForest">
            {title}
          </h2>
          {!isLoading && products.length > 0 && (
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              {products.length} {products.length === 1 ? 'produto' : 'produtos'}
            </span>
          )}
        </div>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-2xl">📦</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar os filtros ou fazer uma nova busca
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Load More Button */}
        {showLoadMore && !isLoading && products.length > 0 && onLoadMore && (
          <div className="mt-8 lg:mt-12 text-center">
            <Button 
              variant="outline" 
              className="border-nuflow-forest text-nuflow-forest hover:bg-nuflow-forest hover:text-white px-6 py-2 min-h-[44px]"
              onClick={onLoadMore}
            >
              Carregar mais produtos
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;
