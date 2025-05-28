
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'success' | 'error' | 'pending' | 'loading';
  text?: string;
  className?: string;
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-100 text-green-800 border-green-200',
    defaultText: 'Concluído',
  },
  error: {
    icon: AlertCircle,
    className: 'bg-red-100 text-red-800 border-red-200',
    defaultText: 'Erro',
  },
  pending: {
    icon: Clock,
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    defaultText: 'Pendente',
  },
  loading: {
    icon: Loader2,
    className: 'bg-blue-100 text-blue-800 border-blue-200',
    defaultText: 'Processando',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  className,
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        'flex items-center gap-1.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon 
        className={cn(
          'h-3 w-3',
          status === 'loading' && 'animate-spin'
        )} 
      />
      {text || config.defaultText}
    </Badge>
  );
};
