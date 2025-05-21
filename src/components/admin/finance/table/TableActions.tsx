
import React from 'react';
import { Button } from '@/components/ui/button';
import { TableCell } from '@/components/ui/table';
import { Eye } from 'lucide-react';

interface TableActionsProps<T> {
  item: T;
  actions: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
    custom?: Array<{
      label: string;
      icon: React.ReactNode;
      onClick: (item: T) => void;
    }>;
  } | ((item: T) => {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
    custom?: Array<{
      label: string;
      icon: React.ReactNode;
      onClick: (item: T) => void;
    }>;
  });
}

export function TableActions<T>({ item, actions }: TableActionsProps<T>) {
  const actionConfig = typeof actions === 'function' ? actions(item) : actions;
  
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        {actionConfig.view && (
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
            <span className="sr-only">Ver</span>
          </Button>
        )}
        {actionConfig.custom && actionConfig.custom.map((action, i) => (
          <Button
            key={i}
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              action.onClick(item);
            }}
          >
            {action.icon}
            <span className="sr-only">{action.label}</span>
          </Button>
        ))}
      </div>
    </TableCell>
  );
}
