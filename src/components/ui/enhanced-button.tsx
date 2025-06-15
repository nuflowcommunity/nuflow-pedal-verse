
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnhancedButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  ripple?: boolean;
  gradient?: boolean;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  loading = false,
  loadingText,
  icon,
  ripple = true,
  gradient = false,
  children,
  disabled,
  className,
  onClick,
  ...props
}) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300);
    }
    onClick?.(e);
  };

  return (
    <Button
      disabled={loading || disabled}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        gradient && "bg-gradient-to-r from-trailflow-green to-trailflow-green-dark hover:from-trailflow-green-dark hover:to-trailflow-green",
        ripple && "transform-gpu",
        isClicked && ripple && "scale-95",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple effect */}
      {ripple && isClicked && (
        <div className="absolute inset-0 bg-white/20 rounded-lg animate-ping" />
      )}
      
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
      
      {/* Content */}
      <span className={cn(
        "flex items-center gap-2 transition-opacity duration-200",
        loading && "opacity-0"
      )}>
        {!loading && icon && icon}
        {loading ? (loadingText || 'Processando...') : children}
      </span>
    </Button>
  );
};
