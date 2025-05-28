
import React from 'react';
import ProductCard from '@/components/marketplace/ProductCard';
import LoadingSkeleton from '@/components/ui/loading-skeleton';
import { Product } from '@/services/marketplace/products';

interface MarketplaceFeaturedProductsProps {
  products: Product[];
  loading: boolean;
  hasActiveFilters: boolean;
}

const MarketplaceFeaturedProducts: React.FC<MarketplaceFeaturedProductsProps> = ({
  products,
  loading,
  hasActiveFilters
}) => {
  if (hasActiveFilters || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12" aria-labelledby="featured-heading">
      <div className="container-custom">
        <h2 id="featured-heading" className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">
          Produtos em Destaque
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <LoadingSkeleton variant="card" count={4} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketplaceFeaturedProducts;
