
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X, Heart, MessageCircle, GitCompare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useComparison } from '@/contexts/ComparisonContext';
import LazyImage from '@/components/ui/lazy-image';
import { cn } from '@/lib/utils';

const ProductComparison = () => {
  const navigate = useNavigate();
  const { comparisonProducts, removeFromComparison, clearComparison } = useComparison();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'novo': return 'bg-emerald-600 text-white';
      case 'usado': return 'bg-blue-600 text-white';
      case 'seminovo': return 'bg-amber-600 text-white';
      default: return 'bg-gray-700 text-white';
    }
  };

  const renderFieldValue = (value: any, field: any) => {
    if (!value) return <span className="text-gray-400">-</span>;
    
    if (field.isPrice && typeof value === 'number') {
      return (
        <span className="font-bold text-nuflow-moss text-lg">
          {formatPrice(value)}
        </span>
      );
    }
    
    if (field.isBadge && typeof value === 'string') {
      return (
        <Badge className={cn("text-xs", getConditionColor(value))}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    }
    
    // Handle complex data types that shouldn't be displayed directly
    if (Array.isArray(value) || typeof value === 'object') {
      return <span className="text-gray-400">-</span>;
    }
    
    if (typeof value === 'string' || typeof value === 'number') {
      return <span className="text-gray-900">{value}</span>;
    }
    
    return <span className="text-gray-400">-</span>;
  };

  if (comparisonProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Nenhum produto para comparar</h2>
            <p className="text-gray-600 mb-4">Adicione produtos à comparação para ver as diferenças entre eles.</p>
            <Button onClick={() => navigate('/marketplace')} className="bg-nuflow-moss text-white">
              Ir ao marketplace
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const comparisonFields = [
    { key: 'title', label: 'Nome' },
    { key: 'price', label: 'Preço', isPrice: true },
    { key: 'brand', label: 'Marca' },
    { key: 'condition', label: 'Condição', isBadge: true },
    { key: 'category', label: 'Categoria' },
    { key: 'size', label: 'Tamanho' },
    { key: 'color', label: 'Cor' },
    { key: 'year', label: 'Ano' },
    { key: 'material', label: 'Material' },
    { key: 'weight', label: 'Peso' },
    { key: 'location', label: 'Localização' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container-custom py-4">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={() => navigate('/marketplace')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={16} />
                Voltar ao marketplace
              </Button>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {comparisonProducts.length} produto{comparisonProducts.length !== 1 ? 's' : ''} em comparação
                </span>
                <Button
                  variant="outline"
                  onClick={clearComparison}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Limpar tudo
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Comparação de Produtos</h1>

          {/* Desktop Comparison Table */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-4 font-semibold text-gray-900 w-48">Características</th>
                    {comparisonProducts.map((product) => (
                      <th key={product.id} className="text-center p-4 min-w-64">
                        <div className="relative">
                          <button
                            onClick={() => removeFromComparison(product.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X size={12} />
                          </button>
                          <div className="aspect-square w-32 mx-auto mb-3 rounded-lg overflow-hidden bg-gray-100">
                            <LazyImage
                              src={product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1544191696-15693be56c23?auto=format&fit=crop&w=800'}
                              alt={product.title}
                              className="w-full h-full object-cover"
                              containerClassName="h-full"
                            />
                          </div>
                          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
                            {product.title}
                          </h3>
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="sm"
                              onClick={() => navigate(`/marketplace/${product.id}`)}
                              className="bg-nuflow-moss text-white text-xs"
                            >
                              Ver detalhes
                            </Button>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFields.map((field) => (
                    <tr key={field.key} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700 bg-gray-50">
                        {field.label}
                      </td>
                      {comparisonProducts.map((product) => {
                        const value = product[field.key as keyof typeof product];
                        return (
                          <td key={product.id} className="p-4 text-center">
                            {renderFieldValue(value, field)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Comparison Cards */}
          <div className="lg:hidden space-y-6">
            {comparisonProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {product.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={cn("text-xs", getConditionColor(product.condition))}>
                        {product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-nuflow-moss mb-4">
                      {formatPrice(product.price)}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromComparison(product.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="aspect-[4/3] w-full mb-4 rounded-lg overflow-hidden bg-gray-100">
                  <LazyImage
                    src={product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1544191696-15693be56c23?auto=format&fit=crop&w=800'}
                    alt={product.title}
                    className="w-full h-full object-cover"
                    containerClassName="h-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  {comparisonFields.slice(2).map((field) => {
                    const value = product[field.key as keyof typeof product];
                    if (!value || Array.isArray(value) || typeof value === 'object') return null;
                    
                    return (
                      <div key={field.key}>
                        <span className="text-sm text-gray-600">{field.label}</span>
                        <p className="font-medium text-gray-900">{String(value)}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-nuflow-moss text-white"
                    onClick={() => navigate(`/marketplace/${product.id}`)}
                  >
                    Ver detalhes
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart size={16} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageCircle size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductComparison;
