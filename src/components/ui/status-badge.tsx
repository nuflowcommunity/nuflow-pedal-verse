
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'success' | 'error' | 'pending' | 'loading' | 'active' | 'completed' | 'cancelled' | 'draft' | 'paid';
  text?: string;
  className?: string;
}

const statusConfig = {
  success: {
    icon: CheckCircle,
    className: 'bg-trailflow-green/20 text-trailflow-green border-trailflow-green/30',
    defaultText: 'Sucesso',
  },
  active: {
    icon: CheckCircle,
    className: 'bg-trailflow-green/20 text-trailflow-green border-trailflow-green/30',
    defaultText: 'Ativo',
  },
  paid: {
    icon: CheckCircle,
    className: 'bg-trailflow-green/20 text-trailflow-green border-trailflow-green/30',
    defaultText: 'Pago',
  },
  error: {
    icon: AlertCircle,
    className: 'bg-red-500/20 text-red-600 border-red-500/30',
    defaultText: 'Erro',
  },
  cancelled: {
    icon: AlertCircle,
    className: 'bg-red-500/20 text-red-600 border-red-500/30',
    defaultText: 'Cancelado',
  },
  pending: {
    icon: Clock,
    className: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
    defaultText: 'Pendente',
  },
  draft: {
    icon: Clock,
    className: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
    defaultText: 'Rascunho',
  },
  loading: {
    icon: Loader2,
    className: 'bg-trailflow-light/20 text-trailflow-medium border-trailflow-light/30',
    defaultText: 'Processando',
  },
  completed: {
    icon: CheckCircle,
    className: 'bg-trailflow-light/20 text-trailflow-medium border-trailflow-light/30',
    defaultText: 'Encerrado',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  text,
  className,
}) => {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        'flex items-center gap-1.5 text-xs font-medium border',
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
