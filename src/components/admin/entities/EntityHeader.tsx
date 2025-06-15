
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { entityTypeIcons } from './EntityIcons';

interface EntityHeaderProps {
  onNewEntity?: (type: string) => void;
  onRefresh?: () => void;
}

export const EntityHeader: React.FC<EntityHeaderProps> = ({ onNewEntity, onRefresh }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Entidades</h1>
        <p className="text-gray-600">
          Gerencie todos os tipos de produtos e serviços oferecidos
        </p>
      </div>
      
      <div className="flex gap-2">
        {onRefresh && (
          <Button variant="outline" onClick={onRefresh} className="flex items-center gap-2 text-gray-900">
            <RefreshCw size={16} />
            <span>Atualizar</span>
          </Button>
        )}
        
        {onNewEntity && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 text-white">
                <Plus size={16} />
                <span>Nova Entidade</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onNewEntity('evento')} className="text-gray-900">
                {entityTypeIcons.evento}
                Novo Evento
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNewEntity('mensalidade')} className="text-gray-900">
                {entityTypeIcons.mensalidade}
                Nova Mensalidade
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNewEntity('dayUse')} className="text-gray-900">
                {entityTypeIcons.dayUse}
                Novo Day Use
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onNewEntity('credito')} className="text-gray-900">
                {entityTypeIcons.credito}
                Novo Crédito
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
