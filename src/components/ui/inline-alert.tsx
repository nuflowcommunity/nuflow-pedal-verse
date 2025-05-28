
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InlineAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const alertConfig = {
  success: {
    icon: CheckCircle,
    className: 'border-green-200 bg-green-50 text-green-900',
    iconColor: 'text-green-600',
  },
  error: {
    icon: AlertCircle,
    className: 'border-red-200 bg-red-50 text-red-900',
    iconColor: 'text-red-600',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-200 bg-yellow-50 text-yellow-900',
    iconColor: 'text-yellow-600',
  },
  info: {
    icon: Info,
    className: 'border-blue-200 bg-blue-50 text-blue-900',
    iconColor: 'text-blue-600',
  },
};

export const InlineAlert: React.FC<InlineAlertProps> = ({
  type,
  title,
  message,
  dismissible = false,
  onDismiss,
  className,
}) => {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <Alert className={cn(config.className, 'relative', className)}>
      <Icon className={cn('h-4 w-4', config.iconColor)} />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
      {dismissible && onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute right-2 top-2 p-1 rounded-md hover:bg-black/10 transition-colors"
          aria-label="Fechar alerta"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </Alert>
  );
};
