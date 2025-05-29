
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterSidebar from '@/components/marketplace/FilterSidebar';
import SEOHead from '@/components/seo/SEOHead';
import { useProducts, useFeaturedProducts } from '@/hooks/marketplace/useProducts';
import { ProductFilters } from '@/hooks/marketplace/useProductsFilter';
import MarketplaceHero from './components/MarketplaceHero';
import MarketplaceFeaturedProducts from './components/MarketplaceFeaturedProducts';
import MarketplaceToolbar from './components/MarketplaceToolbar';
import MarketplaceProductsGrid from './components/MarketplaceProductsGrid';

const MarketplaceHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({});

  console.log('MarketplaceHome - Current filters:', filters);
  console.log('MarketplaceHome - Search query:', searchQuery);

  // Combine search with filters
  const activeFilters = {
    ...filters,
    search: searchQuery || undefined
  };

  console.log('MarketplaceHome - Active filters:', activeFilters);

  const { products, loading, error } = useProducts(activeFilters);
  const { products: featuredProducts, loading: featuredLoading } = useFeaturedProducts(4);

  console.log('MarketplaceHome - Products loaded:', products?.length || 0);
  console.log('MarketplaceHome - Loading state:', loading);
  console.log('MarketplaceHome - Error state:', error);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('MarketplaceHome - Search submitted:', searchQuery);
    // Search is handled automatically by the useProducts hook
  };

  const handleFilterChange = (newFilters: ProductFilters) => {
    console.log('MarketplaceHome - Filters changed:', newFilters);
    setFilters(newFilters);
  };

  const clearFilters = () => {
    console.log('MarketplaceHome - Clearing all filters');
    setFilters({});
    setSearchQuery('');
  };

  const hasActiveFilters = Boolean(Object.keys(filters).length > 0 || searchQuery);

  const getSortedProducts = () => {
    if (!products) return [];
    
    const sorted = [...products];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      default: // newest
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SEOHead 
        title="Marketplace - Compre e Venda Bikes"
        description="Encontre a bike dos seus sonhos ou venda a sua com segurança na maior comunidade de ciclistas do Brasil"
        keywords={['marketplace', 'bikes', 'comprar', 'vender', 'ciclismo', 'mountain bike', 'speed']}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        <MarketplaceHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={handleSearch}
        />

        <MarketplaceFeaturedProducts
          products={featuredProducts}
          loading={featuredLoading}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Main Content */}
        <section className="py-8" aria-labelledby="products-heading">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filter Sidebar */}
              <FilterSidebar
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
                filters={filters}
                onFiltersChange={handleFilterChange}
                className="lg:w-80 flex-shrink-0"
              />

              {/* Products Content */}
              <div className="flex-1 min-w-0">
                <MarketplaceToolbar
                  productsCount={sortedProducts.length}
                  loading={loading}
                  hasActiveFilters={hasActiveFilters}
                  searchQuery={searchQuery}
                  filters={filters}
                  sortBy={sortBy}
                  viewMode={viewMode}
                  onShowFilters={() => setShowFilters(!showFilters)}
                  onSearchClear={() => setSearchQuery('')}
                  onFiltersClear={setFilters}
                  onClearAll={clearFilters}
                  onSortChange={setSortBy}
                  onViewModeChange={setViewMode}
                />

                <MarketplaceProductsGrid
                  products={sortedProducts}
                  loading={loading}
                  error={error}
                  viewMode={viewMode}
                  hasActiveFilters={hasActiveFilters}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketplaceHome;
