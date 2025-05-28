
import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Archive, 
  Download, 
  Trash2, 
  Copy, 
  MoreHorizontal,
  CheckSquare,
  Square
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { ExtendedEventForManagement } from '@/types/eventManagement';

interface BatchActionsBarProps {
  selectedEvents: string[];
  events: ExtendedEventForManagement[];
  onSelectAll: (selected: boolean) => void;
  onClearSelection: () => void;
  onBatchApprove: (eventIds: string[]) => void;
  onBatchReject: (eventIds: string[]) => void;
  onBatchArchive: (eventIds: string[]) => void;
  onBatchExport: (eventIds: string[]) => void;
  onBatchDelete: (eventIds: string[]) => void;
  onBatchClone: (eventIds: string[]) => void;
}

export const BatchActionsBar: React.FC<BatchActionsBarProps> = ({
  selectedEvents,
  events,
  onSelectAll,
  onClearSelection,
  onBatchApprove,
  onBatchReject,
  onBatchArchive,
  onBatchExport,
  onBatchDelete,
  onBatchClone
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState<{
    action: string;
    title: string;
    message: string;
    callback: () => void;
  } | null>(null);

  const allSelected = selectedEvents.length === events.length && events.length > 0;
  const someSelected = selectedEvents.length > 0 && selectedEvents.length < events.length;

  const handleSelectAll = () => {
    onSelectAll(!allSelected);
  };

  const getSelectedEventsSummary = () => {
    const selected = events.filter(event => selectedEvents.includes(event.id));
    const statusCounts = selected.reduce((acc, event) => {
      acc[event.status] = (acc[event.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusCounts).map(([status, count]) => (
      <Badge key={status} variant="outline" className="text-xs">
        {status}: {count}
      </Badge>
    ));
  };

  const confirmAction = (action: string, title: string, message: string, callback: () => void) => {
    setShowConfirmDialog({ action, title, message, callback });
  };

  const executeConfirmedAction = () => {
    if (showConfirmDialog) {
      showConfirmDialog.callback();
      setShowConfirmDialog(null);
    }
  };

  if (selectedEvents.length === 0) {
    return null;
  }

  return (
    <>
      <Card className="mb-4 border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                className="p-1"
              >
                {allSelected ? (
                  <CheckSquare className="h-4 w-4" />
                ) : someSelected ? (
                  <Square className="h-4 w-4 opacity-50" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
              </Button>
              
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {selectedEvents.length} evento{selectedEvents.length !== 1 ? 's' : ''} selecionado{selectedEvents.length !== 1 ? 's' : ''}
                </span>
                <div className="flex gap-1">
                  {getSelectedEventsSummary()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick actions */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => onBatchApprove(selectedEvents)}
                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                disabled={!events.some(e => selectedEvents.includes(e.id) && e.status === 'pending')}
              >
                <Check className="h-4 w-4 mr-1" />
                Aprovar
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => confirmAction(
                  'reject',
                  'Rejeitar Eventos',
                  `Tem certeza que deseja rejeitar ${selectedEvents.length} evento(s)?`,
                  () => onBatchReject(selectedEvents)
                )}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                disabled={!events.some(e => selectedEvents.includes(e.id) && e.status === 'pending')}
              >
                <X className="h-4 w-4 mr-1" />
                Rejeitar
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => onBatchExport(selectedEvents)}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Download className="h-4 w-4 mr-1" />
                Exportar
              </Button>

              {/* More actions dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => onBatchClone(selectedEvents)}
                    className="text-purple-600"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Clonar Eventos
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem
                    onClick={() => confirmAction(
                      'archive',
                      'Arquivar Eventos',
                      `Tem certeza que deseja arquivar ${selectedEvents.length} evento(s)?`,
                      () => onBatchArchive(selectedEvents)
                    )}
                    className="text-orange-600"
                  >
                    <Archive className="h-4 w-4 mr-2" />
                    Arquivar
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem
                    onClick={() => confirmAction(
                      'delete',
                      'Excluir Eventos',
                      `Tem certeza que deseja excluir permanentemente ${selectedEvents.length} evento(s)? Esta ação não pode ser desfeita.`,
                      () => onBatchDelete(selectedEvents)
                    )}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                size="sm"
                variant="ghost"
                onClick={onClearSelection}
                className="text-gray-600"
              >
                Limpar seleção
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">{showConfirmDialog.title}</h3>
            <p className="text-gray-600 mb-6">{showConfirmDialog.message}</p>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirmDialog(null)}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive"
                onClick={executeConfirmedAction}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
