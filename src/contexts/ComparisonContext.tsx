
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/services/marketplace/types';
import { useToast } from '@/hooks/use-toast';

interface ComparisonContextType {
  comparisonProducts: Product[];
  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  isInComparison: (productId: string) => boolean;
  maxProducts: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

interface ComparisonProviderProps {
  children: React.ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const maxProducts = 3;

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('comparisonProducts');
    if (saved) {
      try {
        setComparisonProducts(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading comparison products:', error);
      }
    }
  }, []);

  // Save to localStorage whenever comparison changes
  useEffect(() => {
    localStorage.setItem('comparisonProducts', JSON.stringify(comparisonProducts));
  }, [comparisonProducts]);

  const addToComparison = (product: Product) => {
    if (comparisonProducts.length >= maxProducts) {
      toast({
        title: "Limite atingido",
        description: `Você pode comparar no máximo ${maxProducts} produtos por vez.`,
        variant: "destructive"
      });
      return;
    }

    if (isInComparison(product.id)) {
      toast({
        title: "Produto já adicionado",
        description: "Este produto já está na sua lista de comparação."
      });
      return;
    }

    setComparisonProducts(prev => [...prev, product]);
    toast({
      title: "Produto adicionado",
      description: "Produto adicionado à comparação com sucesso!"
    });
  };

  const removeFromComparison = (productId: string) => {
    setComparisonProducts(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Produto removido",
      description: "Produto removido da comparação."
    });
  };

  const clearComparison = () => {
    setComparisonProducts([]);
    toast({
      title: "Comparação limpa",
      description: "Todos os produtos foram removidos da comparação."
    });
  };

  const isInComparison = (productId: string) => {
    return comparisonProducts.some(p => p.id === productId);
  };

  return (
    <ComparisonContext.Provider value={{
      comparisonProducts,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison,
      maxProducts
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};
