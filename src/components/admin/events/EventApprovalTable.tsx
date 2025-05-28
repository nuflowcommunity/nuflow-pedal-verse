
import React, { useState } from 'react';
import { LoadingButton } from '@/components/ui/loading-button';
import { StatusBadge } from '@/components/ui/status-badge';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Check, 
  X, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Settings,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';
import { ExtendedEvent } from '@/types/eventApproval';
import { useEventApproval } from '@/hooks/useEventApproval';
import { EventApprovalDialog } from './EventApprovalDialog';
import { EventPaymentSettingsDialog } from './EventPaymentSettingsDialog';
import { EventCustomQuestionsDialog } from './EventCustomQuestionsDialog';
import { useFeedback } from '@/hooks/useFeedback';

interface EventApprovalTableProps {
  events: ExtendedEvent[];
  status: string;
}

export const EventApprovalTable: React.FC<EventApprovalTableProps> = ({ events, status }) => {
  const { approveEvent, rejectEvent, isProcessing } = useEventApproval();
  const { feedback } = useFeedback();
  const [selectedEvent, setSelectedEvent] = useState<ExtendedEvent | null>(null);
  const [dialogType, setDialogType] = useState<'approval' | 'payment' | 'questions' | null>(null);
  const [processingEventId, setProcessingEventId] = useState<string | null>(null);

  const getStatusBadgeType = (eventStatus: string) => {
    switch (eventStatus) {
      case 'pending':
        return 'pending';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'active':
        return 'success';
      default:
        return 'pending';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Gratuito';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleQuickApprove = async (event: ExtendedEvent) => {
    setProcessingEventId(event.id);
    try {
      await approveEvent(event.id);
    } finally {
      setProcessingEventId(null);
    }
  };

  const handleQuickReject = (event: ExtendedEvent) => {
    setSelectedEvent(event);
    setDialogType('approval');
  };

  const openDialog = (event: ExtendedEvent, type: 'approval' | 'payment' | 'questions') => {
    setSelectedEvent(event);
    setDialogType(type);
  };

  const closeDialog = () => {
    setSelectedEvent(null);
    setDialogType(null);
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhum evento encontrado para este status.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Evento</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Participantes</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.category}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{formatDate(event.date)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </TableCell>
                <TableCell>{formatPrice(event.price)}</TableCell>
                <TableCell>
                  <StatusBadge 
                    status={getStatusBadgeType(event.status)} 
                    text={event.status}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      {event.max_participants ? `0/${event.max_participants}` : 'Ilimitado'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {event.status === 'pending' && (
                      <>
                        <LoadingButton
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickApprove(event)}
                          loading={processingEventId === event.id && isProcessing}
                          loadingText="Aprovando..."
                          className="text-green-600 hover:text-green-700"
                          icon={<Check className="h-4 w-4" />}
                        >
                          {processingEventId === event.id && isProcessing ? '' : ''}
                        </LoadingButton>
                        <LoadingButton
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickReject(event)}
                          disabled={isProcessing}
                          className="text-red-600 hover:text-red-700"
                          icon={<X className="h-4 w-4" />}
                        >
                        </LoadingButton>
                      </>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <LoadingButton variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </LoadingButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openDialog(event, 'approval')}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDialog(event, 'payment')}>
                          <Settings className="h-4 w-4 mr-2" />
                          Configurar Pagamento
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDialog(event, 'questions')}>
                          <Edit className="h-4 w-4 mr-2" />
                          Perguntas Customizadas
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      {selectedEvent && dialogType === 'approval' && (
        <EventApprovalDialog
          event={selectedEvent}
          isOpen={true}
          onClose={closeDialog}
        />
      )}

      {selectedEvent && dialogType === 'payment' && (
        <EventPaymentSettingsDialog
          event={selectedEvent}
          isOpen={true}
          onClose={closeDialog}
        />
      )}

      {selectedEvent && dialogType === 'questions' && (
        <EventCustomQuestionsDialog
          event={selectedEvent}
          isOpen={true}
          onClose={closeDialog}
        />
      )}
    </>
  );
};
