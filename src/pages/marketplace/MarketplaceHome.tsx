
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
import LoadingSkeleton from '@/components/ui/loading-skeleton';
import SEOHead from '@/components/seo/SEOHead';
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
      <SEOHead 
        title="Marketplace - Compre e Venda Bikes"
        description="Encontre a bike dos seus sonhos ou venda a sua com segurança na maior comunidade de ciclistas do Brasil"
        keywords={['marketplace', 'bikes', 'comprar', 'vender', 'ciclismo', 'mountain bike', 'speed']}
      />
      
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section - Fixed contrast with strong gradient */}
        <section className="bg-gradient-to-br from-nuflow-darkForest via-nuflow-forest to-nuflow-charcoal text-white py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white drop-shadow-lg">
                Marketplace
              </h1>
              <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-md">
                Encontre a bike dos seus sonhos ou venda a sua com segurança na maior comunidade de ciclistas do Brasil
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
                  <Input
                    type="search"
                    placeholder="Buscar por marca, modelo, categoria..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 text-lg rounded-full border-0 shadow-lg text-gray-900 bg-white"
                    aria-label="Buscar produtos no marketplace"
                  />
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        {!hasActiveFilters && featuredProducts.length > 0 && (
          <section className="py-12" aria-labelledby="featured-heading">
            <div className="container-custom">
              <h2 id="featured-heading" className="text-3xl font-heading font-bold text-gray-900 mb-8 text-center">
                Produtos em Destaque
              </h2>
              {featuredLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <LoadingSkeleton variant="card" count={4} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

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
                {/* Toolbar */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Left: Results count and active filters */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h2 id="products-heading" className="text-lg font-semibold text-gray-900">
                          {loading ? 'Carregando...' : `${sortedProducts.length} produtos encontrados`}
                        </h2>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowFilters(!showFilters)}
                          className="lg:hidden"
                          aria-label="Abrir filtros"
                        >
                          <SlidersHorizontal size={16} className="mr-2" aria-hidden="true" />
                          Filtros
                        </Button>
                      </div>
                      
                      {/* Active Filters */}
                      {hasActiveFilters && (
                        <div className="flex flex-wrap items-center gap-2" role="list" aria-label="Filtros ativos">
                          <span className="text-sm text-gray-700">Filtros ativos:</span>
                          {searchQuery && (
                            <Badge variant="secondary" className="flex items-center gap-1" role="listitem">
                              Busca: "{searchQuery}"
                              <button 
                                onClick={() => setSearchQuery('')} 
                                className="ml-1 hover:text-gray-700"
                                aria-label="Remover filtro de busca"
                              >
                                ×
                              </button>
                            </Badge>
                          )}
                          {filters.category && (
                            <Badge variant="secondary" className="flex items-center gap-1" role="listitem">
                              {filters.category}
                              <button 
                                onClick={() => setFilters({...filters, category: undefined})} 
                                className="ml-1 hover:text-gray-700"
                                aria-label="Remover filtro de categoria"
                              >
                                ×
                              </button>
                            </Badge>
                          )}
                          {filters.brand && (
                            <Badge variant="secondary" className="flex items-center gap-1" role="listitem">
                              {filters.brand}
                              <button 
                                onClick={() => setFilters({...filters, brand: undefined})} 
                                className="ml-1 hover:text-gray-700"
                                aria-label="Remover filtro de marca"
                              >
                                ×
                              </button>
                            </Badge>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={clearFilters} 
                            className="text-nuflow-moss hover:text-nuflow-darkForest"
                          >
                            Limpar todos
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Right: Sort and view options */}
                    <div className="flex items-center gap-3">
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-48" aria-label="Ordenar produtos">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 shadow-lg z-50">
                          <SelectItem value="newest">Mais recentes</SelectItem>
                          <SelectItem value="oldest">Mais antigos</SelectItem>
                          <SelectItem value="price-low">Menor preço</SelectItem>
                          <SelectItem value="price-high">Maior preço</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="flex items-center border border-gray-300 rounded-lg" role="group" aria-label="Modo de visualização">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewMode('grid')}
                          className={`rounded-none ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                          aria-label="Visualização em grade"
                          aria-pressed={viewMode === 'grid'}
                        >
                          <Grid size={16} aria-hidden="true" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setViewMode('list')}
                          className={`rounded-none ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                          aria-label="Visualização em lista"
                          aria-pressed={viewMode === 'list'}
                        >
                          <List size={16} aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    <LoadingSkeleton variant="card" count={9} />
                  </div>
                ) : error ? (
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
                ) : sortedProducts.length === 0 ? (
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
                        <Button onClick={clearFilters} className="btn-primary">
                          Limpar filtros
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`grid gap-6 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                        : 'grid-cols-1'
                    }`}
                    role="list"
                    aria-label="Lista de produtos"
                  >
                    {sortedProducts.map((product) => (
                      <div key={product.id} role="listitem">
                        <ProductCard 
                          product={product}
                          className={viewMode === 'list' ? 'flex flex-row' : ''}
                        />
                      </div>
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
