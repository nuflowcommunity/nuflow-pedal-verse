
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  loadingText,
  icon,
  children,
  disabled,
  className,
  ...props
}) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn(
        "relative transition-all duration-200",
        loading && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {!loading && icon && (
        <span className="mr-2">{icon}</span>
      )}
      {loading ? (loadingText || 'Processando...') : children}
    </Button>
  );
};
