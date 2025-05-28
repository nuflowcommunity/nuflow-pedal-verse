
import React from 'react';
import { Package2, Calendar, Clock, Users, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EntityEmptyStateProps {
  entityType?: string;
  onAddNew?: () => void;
}

export const EntityEmptyState: React.FC<EntityEmptyStateProps> = ({ 
  entityType = 'geral', 
  onAddNew 
}) => {
  const getEmptyStateConfig = (type: string) => {
    switch (type) {
      case 'evento':
        return {
          icon: Calendar,
          title: 'Nenhum evento encontrado',
          description: 'Crie seu primeiro evento para começar a organizar atividades.',
          actionText: 'Criar Evento'
        };
      case 'mensalidade':
        return {
          icon: Clock,
          title: 'Nenhuma mensalidade encontrada',
          description: 'Configure planos de mensalidade para seus serviços.',
          actionText: 'Criar Mensalidade'
        };
      case 'dayUse':
        return {
          icon: Users,
          title: 'Nenhum day use encontrado',
          description: 'Crie opções de day use para visitantes.',
          actionText: 'Criar Day Use'
        };
      case 'credito':
        return {
          icon: CreditCard,
          title: 'Nenhum crédito encontrado',
          description: 'Configure sistemas de crédito para seus usuários.',
          actionText: 'Criar Crédito'
        };
      default:
        return {
          icon: Package2,
          title: 'Nenhuma entidade encontrada',
          description: 'Tente ajustar os filtros ou adicione uma nova entidade.',
          actionText: 'Nova Entidade'
        };
    }
  };

  const config = getEmptyStateConfig(entityType);
  const IconComponent = config.icon;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <IconComponent size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
        {config.title}
      </h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {config.description}
      </p>
      {onAddNew && (
        <Button onClick={onAddNew} className="mt-2">
          {config.actionText}
        </Button>
      )}
    </div>
  );
};
