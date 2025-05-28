
import React from 'react';
import { Search } from 'lucide-react';
import ProductCard from '@/components/marketplace/ProductCard';
import LoadingSkeleton from '@/components/ui/loading-skeleton';
import { Button } from '@/components/ui/button';
import { Product } from '@/services/marketplace/products';

interface MarketplaceProductsGridProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  viewMode: 'grid' | 'list';
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

const MarketplaceProductsGrid: React.FC<MarketplaceProductsGridProps> = ({
  products,
  loading,
  error,
  viewMode,
  hasActiveFilters,
  onClearFilters
}) => {
  if (loading) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        <LoadingSkeleton variant="card" count={9} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-red-500 text-2xl" aria-hidden="true">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Erro ao carregar produtos
          </h3>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="btn-primary">
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Search size={24} className="text-gray-400" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-700 mb-4">
            Tente ajustar os filtros ou fazer uma nova busca
          </p>
          {hasActiveFilters && (
            <Button onClick={onClearFilters} className="btn-primary">
              Limpar filtros
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
      }`}
      role="list"
      aria-label="Lista de produtos"
    >
      {products.map((product) => (
        <div key={product.id} role="listitem">
          <ProductCard 
            product={product}
            className={viewMode === 'list' ? 'flex flex-row' : ''}
          />
        </div>
      ))}
    </div>
  );
};

export default MarketplaceProductsGrid;
