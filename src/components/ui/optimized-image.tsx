
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { OptimizedLoading } from './optimized-loading';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  containerClassName?: string;
  showLoadingSpinner?: boolean;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallback = 'https://images.unsplash.com/photo-1544191696-15693be56c23?auto=format&fit=crop&w=800',
  className,
  containerClassName,
  showLoadingSpinner = true,
  aspectRatio,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && !imageSrc) {
      setImageSrc(hasError ? fallback : src);
    }
  }, [isInView, hasError, fallback, src, imageSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(fallback);
    } else {
      setIsLoaded(true); // Stop loading if fallback also fails
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-gray-100',
        aspectRatio && aspectRatioClasses[aspectRatio],
        containerClassName
      )}
    >
      {/* Loading state */}
      {showLoadingSpinner && !isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <OptimizedLoading variant="spinner" size="md" />
        </div>
      )}
      
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      
      {/* Actual image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};
