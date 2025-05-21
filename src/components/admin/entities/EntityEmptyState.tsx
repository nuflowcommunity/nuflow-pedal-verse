
import React from 'react';
import { Package2 } from 'lucide-react';

export const EntityEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Package2 size={48} className="text-gray-300 mb-3" />
      <h3 className="text-lg font-medium">Nenhuma entidade encontrada</h3>
      <p className="text-muted-foreground">Tente ajustar os filtros ou adicione uma nova entidade.</p>
    </div>
  );
};
