
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useComparison } from '@/contexts/ComparisonContext';
import { cn } from '@/lib/utils';

const ComparisonFloatingIndicator = () => {
  const navigate = useNavigate();
  const { comparisonProducts, removeFromComparison, clearComparison } = useComparison();

  if (comparisonProducts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-72">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Compare size={20} className="text-blue-600" />
            <span className="font-semibold text-gray-900">Comparar produtos</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {comparisonProducts.length}
            </Badge>
          </div>
          <button
            onClick={clearComparison}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Limpar comparação"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
          {comparisonProducts.map((product) => (
            <div key={product.id} className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                <img
                  src={product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1544191696-15693be56c23?auto=format&fit=crop&w=800'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="flex-1 text-gray-900 line-clamp-1">{product.title}</span>
              <button
                onClick={() => removeFromComparison(product.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remover produto"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/marketplace')}
            className="flex-1"
          >
            Continuar comprando
          </Button>
          <Button
            size="sm"
            onClick={() => navigate('/marketplace/comparacao')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            disabled={comparisonProducts.length < 2}
          >
            <Compare size={16} className="mr-1" />
            Comparar
          </Button>
        </div>

        {comparisonProducts.length < 2 && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Adicione pelo menos 2 produtos para comparar
          </p>
        )}
      </div>
    </div>
  );
};

export default ComparisonFloatingIndicator;
