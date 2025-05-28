
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ExtendedEvent } from '@/types/eventApproval';
import { useEventApproval } from '@/hooks/useEventApproval';
import { Check, X, Calendar, MapPin, Users, DollarSign } from 'lucide-react';

interface EventApprovalDialogProps {
  event: ExtendedEvent;
  isOpen: boolean;
  onClose: () => void;
}

export const EventApprovalDialog: React.FC<EventApprovalDialogProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  const { approveEvent, rejectEvent, isProcessing } = useEventApproval();
  const [rejectionReason, setRejectionReason] = useState('');
  const [adminNotes, setAdminNotes] = useState(event.admin_notes || '');
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

  const handleApprove = () => {
    approveEvent(event.id, adminNotes);
    onClose();
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Por favor, informe o motivo da rejeição.');
      return;
    }
    rejectEvent(event.id, rejectionReason, adminNotes);
    onClose();
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

  const getStatusColor = (status: string) => {
    const configs = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      active: 'bg-blue-100 text-blue-800',
      draft: 'bg-gray-100 text-gray-800',
    };
    return configs[status as keyof typeof configs] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Detalhes do Evento</span>
            <Badge className={getStatusColor(event.status)}>
              {event.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-gray-600">{event.short_description}</p>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>{formatDate(event.date)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span>{event.location}</span>
                {event.city && event.state && (
                  <span className="text-gray-500">- {event.city}, {event.state}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <span>{formatPrice(event.price)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-400" />
                <span>
                  {event.max_participants 
                    ? `Máximo ${event.max_participants} participantes` 
                    : 'Participantes ilimitados'
                  }
                </span>
              </div>
            </div>

            {event.image_url && (
              <div>
                <img
                  src={event.image_url}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Descrição completa */}
          {event.description && (
            <div>
              <h4 className="font-semibold mb-2">Descrição</h4>
              <p className="text-gray-700 whitespace-pre-wrap">{event.description}</p>
            </div>
          )}

          {/* Detalhes técnicos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {event.distance && (
              <div>
                <Label className="text-sm font-medium">Distância</Label>
                <p className="text-gray-700">{event.distance}</p>
              </div>
            )}
            {event.elevation && (
              <div>
                <Label className="text-sm font-medium">Elevação</Label>
                <p className="text-gray-700">{event.elevation}</p>
              </div>
            )}
            {event.difficulty && (
              <div>
                <Label className="text-sm font-medium">Dificuldade</Label>
                <p className="text-gray-700">{event.difficulty}</p>
              </div>
            )}
          </div>

          {/* Ponto de encontro */}
          {event.meeting_point && (
            <div>
              <Label className="text-sm font-medium">Ponto de Encontro</Label>
              <p className="text-gray-700">{event.meeting_point}</p>
            </div>
          )}

          {/* Razão de rejeição (se rejeitado) */}
          {event.status === 'rejected' && event.rejection_reason && (
            <div className="bg-red-50 p-4 rounded-lg">
              <Label className="text-sm font-medium text-red-800">Motivo da Rejeição</Label>
              <p className="text-red-700 mt-1">{event.rejection_reason}</p>
            </div>
          )}

          {/* Notas do admin */}
          <div>
            <Label htmlFor="adminNotes">Notas do Administrador</Label>
            <Textarea
              id="adminNotes"
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Adicione notas internas sobre este evento..."
              className="mt-1"
            />
          </div>

          {/* Campo para rejeição */}
          {actionType === 'reject' && (
            <div>
              <Label htmlFor="rejectionReason">Motivo da Rejeição *</Label>
              <Textarea
                id="rejectionReason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Explique o motivo da rejeição para o organizador..."
                className="mt-1"
                required
              />
            </div>
          )}

          {/* Ações */}
          {event.status === 'pending' && (
            <div className="flex justify-end space-x-3 pt-4 border-t">
              {actionType === null && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setActionType('reject')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Rejeitar
                  </Button>
                  <Button
                    onClick={handleApprove}
                    disabled={isProcessing}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Aprovar
                  </Button>
                </>
              )}

              {actionType === 'reject' && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setActionType(null)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleReject}
                    disabled={isProcessing || !rejectionReason.trim()}
                    variant="destructive"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Confirmar Rejeição
                  </Button>
                </>
              )}
            </div>
          )}

          {event.status !== 'pending' && (
            <div className="flex justify-end pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Fechar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
