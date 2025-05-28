
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ExtendedEventForManagement } from '@/types/eventManagement';

interface EventActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: ExtendedEventForManagement | null;
  action: 'approve' | 'reject' | null;
  onConfirm: (eventId: string, reason?: string, adminNotes?: string) => void;
}

const EventActionDialog: React.FC<EventActionDialogProps> = ({
  isOpen,
  onClose,
  event,
  action,
  onConfirm
}) => {
  const [reason, setReason] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const handleConfirm = () => {
    if (!event) return;
    
    if (action === 'reject' && !reason.trim()) {
      alert('Por favor, informe o motivo da rejeição.');
      return;
    }

    onConfirm(event.id, reason, adminNotes);
    onClose();
    setReason('');
    setAdminNotes('');
  };

  const handleClose = () => {
    onClose();
    setReason('');
    setAdminNotes('');
  };

  if (!event || !action) return null;

  const isApproval = action === 'approve';
  const title = isApproval ? 'Aprovar Evento' : 'Rejeitar Evento';
  const description = isApproval 
    ? 'Confirme a aprovação do evento. O organizador será notificado automaticamente.'
    : 'Informe o motivo da rejeição. O organizador será notificado automaticamente.';

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={`flex items-center gap-2 ${isApproval ? 'text-green-700' : 'text-red-700'}`}>
            {isApproval ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
            {title}
          </DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">{event.title}</h4>
            <p className="text-sm text-gray-600">{event.location}</p>
            <p className="text-sm text-gray-600">
              {new Date(event.date).toLocaleDateString('pt-BR')}
            </p>
          </div>

          {!isApproval && (
            <div className="space-y-2">
              <Label htmlFor="reason">Motivo da Rejeição *</Label>
              <Textarea
                id="reason"
                placeholder="Descreva o motivo da rejeição..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="adminNotes">Observações Administrativas (opcional)</Label>
            <Textarea
              id="adminNotes"
              placeholder="Adicione observações internas ou instruções para o organizador..."
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirm}
            className={isApproval ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          >
            {isApproval ? 'Aprovar Evento' : 'Rejeitar Evento'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventActionDialog;
