
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinanceAlertProps {
  title: string;
  description?: string;
  variant?: 'default' | 'info' | 'warning' | 'success' | 'danger';
  className?: string;
  icon?: React.ReactNode;
  onDismiss?: () => void;
}

export function FinanceAlert({
  title,
  description,
  variant = 'default',
  className,
  icon,
  onDismiss,
}: FinanceAlertProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      case 'warning':
        return 'border-amber-200 bg-amber-50 text-amber-800';
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800';
      case 'danger':
        return 'border-red-200 bg-red-50 text-red-800';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  const getIcon = () => {
    if (icon) return icon;
    
    switch (variant) {
      case 'info':
        return <Info className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'danger':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <Alert className={cn(getVariantStyles(), className)}>
      <div className="flex">
        {getIcon()}
        <div className="ml-3 flex-1">
          <AlertTitle>{title}</AlertTitle>
          {description && <AlertDescription>{description}</AlertDescription>}
        </div>
      </div>
    </Alert>
  );
}
