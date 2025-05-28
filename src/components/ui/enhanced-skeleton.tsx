
import React from 'react';
import { cn } from '@/lib/utils';

interface EnhancedSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
  animation?: 'pulse' | 'wave' | 'none';
}

const EnhancedSkeleton = ({ 
  className, 
  variant = 'default',
  animation = 'pulse'
}: EnhancedSkeletonProps) => {
  const baseClasses = "bg-nuflow-sage/10 rounded-md";
  
  const variantClasses = {
    default: "",
    card: "w-full h-48",
    text: "h-4 w-full",
    avatar: "h-12 w-12 rounded-full",
    button: "h-10 w-24"
  };
  
  const animationClasses = {
    pulse: "animate-pulse",
    wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
    none: ""
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
    />
  );
};

// Skeleton específico para card de produto
export const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border border-nuflow-sage/10 overflow-hidden">
    <EnhancedSkeleton variant="card" animation="wave" />
    <div className="p-4">
      <EnhancedSkeleton className="h-6 w-3/4 mb-2" animation="wave" />
      <EnhancedSkeleton className="h-4 w-1/2 mb-1" animation="wave" />
      <EnhancedSkeleton className="h-4 w-2/3 mb-4" animation="wave" />
      <div className="flex justify-between items-center">
        <EnhancedSkeleton className="h-5 w-1/4" animation="wave" />
        <div className="flex space-x-2">
          <EnhancedSkeleton variant="button" animation="wave" />
          <EnhancedSkeleton variant="button" animation="wave" />
        </div>
      </div>
    </div>
  </div>
);

// Skeleton específico para card de evento
export const EventCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border border-nuflow-sage/10 overflow-hidden">
    <EnhancedSkeleton variant="card" animation="wave" />
    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <EnhancedSkeleton className="h-6 w-2/3" animation="wave" />
        <EnhancedSkeleton className="h-5 w-16 rounded-full" animation="wave" />
      </div>
      <EnhancedSkeleton className="h-4 w-1/2 mb-1" animation="wave" />
      <EnhancedSkeleton className="h-4 w-3/4 mb-4" animation="wave" />
      <div className="flex justify-between items-center">
        <EnhancedSkeleton className="h-5 w-1/4" animation="wave" />
        <div className="flex space-x-2">
          <EnhancedSkeleton variant="button" animation="wave" />
          <EnhancedSkeleton variant="button" animation="wave" />
        </div>
      </div>
    </div>
  </div>
);

export { EnhancedSkeleton };
