
import React from 'react';
import { Button } from '@/components/ui/button';
import { useComparison } from '@/contexts/ComparisonContext';
import { Product } from '@/services/marketplace/types';
import { Compare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComparisonButtonProps {
  product: Product;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const ComparisonButton: React.FC<ComparisonButtonProps> = ({
  product,
  variant = 'outline',
  size = 'sm',
  className
}) => {
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const inComparison = isInComparison(product.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inComparison) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  return (
    <Button
      variant={inComparison ? 'default' : variant}
      size={size}
      onClick={handleClick}
      className={cn(
        "transition-colors",
        inComparison && "bg-blue-600 hover:bg-blue-700 text-white",
        className
      )}
      aria-label={inComparison ? "Remover da comparação" : "Adicionar à comparação"}
    >
      <Compare size={16} className="mr-1" />
      {inComparison ? "Na comparação" : "Comparar"}
    </Button>
  );
};

export default ComparisonButton;
