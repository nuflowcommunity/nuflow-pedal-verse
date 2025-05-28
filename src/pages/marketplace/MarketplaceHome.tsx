
import React, { useState } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/marketplace/ProductCard';
import FilterSidebar from '@/components/marketplace/FilterSidebar';
import { useProducts, ProductFilters } from '@/hooks/marketplace/useProducts';
import { useFeaturedProducts } from '@/hooks/marketplace/useProducts';

const MarketplaceHome = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({});

  // Combine search with filters
  const activeFilters = {
    ...filters,
    search: searchQuery || undefined
  };

  const { products, loading, error } = useProducts(activeFilters);
  const { products: featuredProducts, loading: featuredLoading } = useFeaturedProducts(4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled automatically by the useProducts hook
  };

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const hasActiveFilters = Object.keys(filters).length > 0 || searchQuery;

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
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-nuflow-moss to-nuflow-charcoal text-white py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Marketplace
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Encontre a bike dos seus sonhos ou venda a sua com segurança na maior comunidade de ciclistas do Brasil
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Buscar por marca, modelo, categoria..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg rounded-full border-0 shadow-lg"
                  />
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {!hasActiveFilters && featuredProducts.length > 0 && (
          <section className="py-12">
            <div className="container-custom">
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">
                Produtos em Destaque
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section className="py-8">
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
                {/* Toolbar */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Left: Results count and active filters */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {loading ? 'Carregando...' : `${sortedProducts.length} produtos encontrados`}
                        </h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowFilters(!showFilters)}
                          className="lg:hidden"
                        >
                          <SlidersHorizontal size={16} className="mr-2" />
                          Filtros
                        </Button>
                      </div>
                      
                      {/* Active Filters */}
                      {hasActiveFilters && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm text-gray-600">Filtros ativos:</span>
                          {searchQuery && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              Busca: "{searchQuery}"
                              <button onClick={() => setSearchQuery('')} className="ml-1">×</button>
                            </Badge>
                          )}
                          {filters.category && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              {filters.category}
                              <button onClick={() => setFilters({...filters, category: undefined})} className="ml-1">×</button>
                            </Badge>
                          )}
                          {filters.brand && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              {filters.brand}
                              <button onClick={() => setFilters({...filters, brand: undefined})} className="ml-1">×</button>
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-nuflow-moss">
                            Limpar todos
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Right: Sort and view options */}
                    <div className="flex items-center gap-3">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Mais recentes</SelectItem>
                          <SelectItem value="oldest">Mais antigos</SelectItem>
                          <SelectItem value="price-low">Menor preço</SelectItem>
                          <SelectItem value="price-high">Maior preço</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewMode('grid')}
                          className={`rounded-none ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                        >
                          <Grid size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewMode('list')}
                          className={`rounded-none ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                        >
                          <List size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse">
                        <div className="aspect-[4/3] bg-gray-200"></div>
                        <div className="p-4 space-y-3">
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                          <div className="h-6 bg-gray-200 rounded"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">{error}</p>
                  </div>
                ) : sortedProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Search size={24} className="text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Nenhum produto encontrado
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Tente ajustar os filtros ou fazer uma nova busca
                      </p>
                      {hasActiveFilters && (
                        <Button onClick={clearFilters} className="bg-nuflow-moss text-white">
                          Limpar filtros
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {sortedProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product}
                        className={viewMode === 'list' ? 'flex flex-row' : ''}
                      />
                    ))}
                  </div>
                )}
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
