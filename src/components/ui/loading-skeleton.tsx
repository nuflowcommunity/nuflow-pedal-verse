
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'card' | 'text' | 'avatar' | 'button';
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className, 
  variant = 'card',
  count = 1 
}) => {
  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={cn("bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden", className)}>
            <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse" />
              <div className="h-5 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
                <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
              </div>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div className={cn("space-y-2", className)}>
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
          </div>
        );
      
      case 'avatar':
        return (
          <div className={cn("w-10 h-10 bg-gray-200 rounded-full animate-pulse", className)} />
        );
      
      case 'button':
        return (
          <div className={cn("h-10 bg-gray-200 rounded-md animate-pulse", className)} />
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
