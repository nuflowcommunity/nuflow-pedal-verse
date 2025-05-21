
import React from 'react';
import { Entity } from './types';
import { entityTypeLabels } from './types';
import { ToastAction } from '@/components/ui/toast';

// Type-specific action functions
export const getTypeSpecificActions = (item: Entity, toast: any) => {
  const baseActions = [
    {
      label: 'Editar',
      icon: <span className="material-icons text-blue-600">edit</span>,
      onClick: (entity: Entity) => {
        toast({
          title: "Editar entidade",
          description: `Editando ${entityTypeLabels[entity.type]}: ${entity.name}`,
        });
      }
    },
    {
      label: 'Clonar',
      icon: <span className="material-icons text-amber-600">content_copy</span>,
      onClick: (entity: Entity) => {
        toast({
          title: "Clonar entidade",
          description: `Clonando ${entityTypeLabels[entity.type]}: ${entity.name}`,
        });
      }
    }
  ];
  
  // Ações específicas por tipo
  switch (item.type) {
    case 'evento':
      return [
        ...baseActions,
        {
          label: 'Gerenciar inscrições',
          icon: <span className="material-icons text-green-600">group</span>,
          onClick: (entity: Entity) => {
            toast({
              title: "Gerenciar inscrições",
              description: `Gerenciando inscrições para ${entity.name}`,
            });
          }
        }
      ];
    case 'mensalidade':
      return [
        ...baseActions,
        {
          label: 'Gerenciar renovações',
          icon: <span className="material-icons text-purple-600">calendar_month</span>,
          onClick: (entity: Entity) => {
            toast({
              title: "Gerenciar renovações",
              description: `Gerenciando renovações para ${entity.name}`,
            });
          }
        }
      ];
    case 'credito':
      return [
        ...baseActions,
        {
          label: 'Validar créditos',
          icon: <span className="material-icons text-green-600">qr_code_scanner</span>,
          onClick: (entity: Entity) => {
            toast({
              title: "Validar créditos",
              description: `Validando créditos para ${entity.name}`,
            });
          }
        }
      ];
    default:
      return baseActions;
  }
};
