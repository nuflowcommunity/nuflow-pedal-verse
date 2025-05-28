
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingTransitionProps {
  className?: string;
}

const LoadingTransition = ({ className }: LoadingTransitionProps) => {
  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center",
      "bg-gradient-to-br from-nuflow-sand via-nuflow-sand/95 to-nuflow-mineral/20",
      "animate-fade-in",
      className
    )}>
      {/* Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Main Logo */}
        <div className="relative mb-4">
          <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 relative animate-logo-pulse">
            {/* Logo Background Circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-nuflow-moss to-nuflow-lime opacity-10 animate-pulse-gentle"></div>
            
            {/* Logo Icon - Using a cycling icon for the mountain/tech theme */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg 
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-nuflow-moss animate-float" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                <path d="M12 7L8 10v4l4 2 4-2v-4l-4-3z" className="opacity-60"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Brand Text */}
        <div className="text-center animate-fade-in-delayed">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-nuflow-moss mb-1">
            Nuflow
          </h3>
          <p className="text-sm text-nuflow-mineral font-medium tracking-wide">
            Montanha Tech
          </p>
        </div>

        {/* Subtle Progress Dots */}
        <div className="flex space-x-1 mt-6 animate-fade-in-delayed">
          <div className="w-1.5 h-1.5 bg-nuflow-lime rounded-full animate-dot-bounce-1"></div>
          <div className="w-1.5 h-1.5 bg-nuflow-lime rounded-full animate-dot-bounce-2"></div>
          <div className="w-1.5 h-1.5 bg-nuflow-lime rounded-full animate-dot-bounce-3"></div>
        </div>
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-nuflow-moss rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-nuflow-lime rounded-full blur-3xl animate-float-reverse"></div>
      </div>
    </div>
  );
};

export default LoadingTransition;
