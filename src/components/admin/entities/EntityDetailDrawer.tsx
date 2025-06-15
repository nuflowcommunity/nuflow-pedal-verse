
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerDescription, 
  DrawerFooter, 
  DrawerHeader, 
  DrawerTitle 
} from '@/components/ui/drawer';
import { Entity } from './types';
import { entityTypeLabels } from './types';
import { entityTypeIcons } from './EntityIcons';
import { CommonDetails } from './detail/CommonDetails';
import { EntityTypeDetails } from './detail/EntityTypeDetails';

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
  
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="p-4 sm:p-6">
        <DrawerHeader>
          <DrawerTitle className="text-gray-900">{entity.name}</DrawerTitle>
          <DrawerDescription className="text-gray-600">
            Detalhes da entidade
          </DrawerDescription>
        </DrawerHeader>
        <div className="py-4">
          <div className="flex items-center gap-2 mb-6">
            {entityTypeIcons[entity.type]}
            <span className="text-sm text-gray-600">{entityTypeLabels[entity.type]}</span>
          </div>
          
          <CommonDetails entity={entity} />
          <EntityTypeDetails entity={entity} toast={toast} />
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
