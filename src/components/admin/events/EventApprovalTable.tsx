
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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

interface EventApprovalTableProps {
  events: ExtendedEvent[];
  status: string;
}

export const EventApprovalTable: React.FC<EventApprovalTableProps> = ({ events, status }) => {
  const { approveEvent, rejectEvent, isProcessing } = useEventApproval();
  const [selectedEvent, setSelectedEvent] = useState<ExtendedEvent | null>(null);
  const [dialogType, setDialogType] = useState<'approval' | 'payment' | 'questions' | null>(null);

  const getStatusBadge = (eventStatus: string) => {
    const configs = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800',
      draft: 'bg-gray-100 text-gray-800',
    };
    return configs[eventStatus as keyof typeof configs] || 'bg-gray-100 text-gray-800';
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

  const handleQuickApprove = (event: ExtendedEvent) => {
    approveEvent(event.id);
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
                  <Badge className={getStatusBadge(event.status)}>
                    {event.status}
                  </Badge>
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
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickApprove(event)}
                          disabled={isProcessing}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleQuickReject(event)}
                          disabled={isProcessing}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
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
