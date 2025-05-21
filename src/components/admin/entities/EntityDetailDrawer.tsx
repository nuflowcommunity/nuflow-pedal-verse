import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle 
} from '@/components/ui/drawer';
import { Entity, EventoEntity, MensalidadeEntity, DayUseEntity, CreditoEntity } from './types';
import { entityTypeLabels } from './types';
import { entityTypeIcons, getValidationStatusIcon } from './EntityIcons';
import { getStatusBadge } from '@/components/admin/finance/FinanceTable';

interface EntityDetailDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  entity: Entity | null;
  onEditEntity: (entity: Entity) => void;
  toast: any;
}

export const EntityDetailDrawer: React.FC<EntityDetailDrawerProps> = ({
  isOpen,
  onOpenChange,
  entity,
  onEditEntity,
  toast
}) => {
  if (!entity) return null;
  
  // Common details for all entity types
  const commonDetails = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Parceiro</h4>
          <p>{entity.partner}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Status</h4>
          <p>{getStatusBadge(entity.status === 'ativo' ? 'Ativo' : entity.status === 'pendente' ? 'Pendente' : 'Cancelado')}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Criado em</h4>
          <p>{entity.createdAt}</p>
        </div>
      </div>
    </>
  );
  
  // Type-specific details
  const renderTypeSpecificDetails = () => {
    switch (entity.type) {
      case 'evento': {
        const event = entity as EventoEntity;
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Data</h4>
                <p>{event.date || '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Local</h4>
                <p>{event.location || '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Capacidade</h4>
                <p>{event.capacity || '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Inscritos</h4>
                <p>{event.registrations || '0'}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Gerenciamento de Inscrições</h3>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => toast({
                  title: "Exportar lista",
                  description: "Exportando lista de inscritos"
                })}>
                  Exportar lista
                </Button>
                <Button onClick={() => toast({
                  title: "Gerenciar inscrições",
                  description: "Abrindo gerenciamento de inscrições"
                })}>
                  Gerenciar inscrições
                </Button>
              </div>
            </div>
          </>
        );
      }
      case 'mensalidade': {
        const plan = entity as MensalidadeEntity;
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Duração</h4>
                <p>{plan.duration || '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Renovação</h4>
                <p>{plan.renewalDate || '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Créditos Incluídos</h4>
                <p>{plan.includedCredits !== undefined ? plan.includedCredits : '-'}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Gerenciamento de Mensalidade</h3>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => toast({
                  title: "Histórico de cobranças",
                  description: "Visualizando histórico de cobranças"
                })}>
                  Histórico de cobranças
                </Button>
                <Button onClick={() => toast({
                  title: "Gerenciar renovações",
                  description: "Abrindo gerenciamento de renovações"
                })}>
                  Gerenciar renovações
                </Button>
              </div>
            </div>
          </>
        );
      }
      case 'dayUse': {
        const dayUse = entity as DayUseEntity;
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Validade</h4>
                <p>{dayUse.validFor || '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Data de Acesso</h4>
                <p>{dayUse.accessDate || '-'}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Gerenciamento de Day Use</h3>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => toast({
                  title: "Gerar QR Code",
                  description: "Gerando QR Code para acesso"
                })}>
                  Gerar QR Code
                </Button>
                <Button onClick={() => toast({
                  title: "Histórico de acessos",
                  description: "Visualizando histórico de acessos"
                })}>
                  Histórico de acessos
                </Button>
              </div>
            </div>
          </>
        );
      }
      case 'credito': {
        const credit = entity as CreditoEntity;
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Total de Créditos</h4>
                <p>{credit.totalCredits !== undefined ? credit.totalCredits : '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Créditos Usados</h4>
                <p>{credit.usedCredits !== undefined ? credit.usedCredits : '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Validade</h4>
                <p>{credit.expiryDate || '-'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status de Validação</h4>
                <div className="flex items-center">
                  {getValidationStatusIcon(credit.validationStatus)}
                  <span className="ml-2">
                    {credit.validationStatus === 'validated' ? 'Validado' : 
                     credit.validationStatus === 'pending' ? 'Pendente' : 
                     credit.validationStatus === 'failed' ? 'Falhou' : '-'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Gerenciamento de Créditos</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  className={credit.validationStatus === 'validated' ? 'bg-green-100' : ''}
                  onClick={() => toast({
                    title: "Validar créditos",
                    description: "Abrindo validação de créditos via QR Code"
                  })}
                >
                  {credit.validationStatus === 'validated' ? 'Revalidar' : 'Validar créditos'}
                </Button>
                <Button onClick={() => toast({
                  title: "Histórico de uso",
                  description: "Visualizando histórico de uso de créditos"
                })}>
                  Histórico de uso
                </Button>
              </div>
            </div>
          </>
        );
      }
      default:
        return null;
    }
  };
  
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="p-4 sm:p-6">
        <DrawerHeader>
          <DrawerTitle>{entity.name}</DrawerTitle>
          <DrawerDescription>
            Detalhes da entidade
          </DrawerDescription>
        </DrawerHeader>
        <div className="py-4">
          <div className="flex items-center gap-2 mb-6">
            {entityTypeIcons[entity.type]}
            <span className="text-sm text-muted-foreground">{entityTypeLabels[entity.type]}</span>
          </div>
          
          {commonDetails}
          {renderTypeSpecificDetails()}
        </div>
        <DrawerFooter className="pt-2">
          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              onClick={() => {
                if (entity) {
                  onEditEntity(entity);
                }
              }}
            >
              Editar
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost">Fechar</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
