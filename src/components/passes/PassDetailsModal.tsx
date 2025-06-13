
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, User, Mail, CreditCard, Download, Hash } from 'lucide-react';
import { Pass } from '@/types/passes';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PassDetailsModalProps {
  pass: Pass;
  isOpen: boolean;
  onClose: () => void;
}

export const PassDetailsModal: React.FC<PassDetailsModalProps> = ({
  pass,
  isOpen,
  onClose
}) => {
  const getTypeLabel = (type: string) => {
    const labels = {
      day_use: 'Day Use',
      mensalista: 'Mensalista',
      evento: 'Evento',
      credito: 'Crédito'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      futuro: {
        label: 'Ativo',
        className: 'bg-green-100 text-green-800 border-green-200'
      },
      usado: {
        label: 'Usado',
        className: 'bg-gray-100 text-gray-800 border-gray-200'
      },
      cancelado: {
        label: 'Cancelado',
        className: 'bg-red-100 text-red-800 border-red-200'
      }
    };
    return configs[status as keyof typeof configs] || {
      label: status,
      className: 'bg-gray-100 text-gray-800 border-gray-200'
    };
  };

  const statusConfig = getStatusConfig(pass.status);

  const handleDownloadPDF = () => {
    // Placeholder for PDF download functionality
    console.log('Downloading PDF for pass:', pass.id);
    // In a real implementation, this would generate and download a PDF
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-trailflow-dark">
            Detalhes do Passe
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* QR Code Placeholder */}
          <div className="flex justify-center">
            <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2">📱</div>
                <p className="text-sm text-gray-600">QR Code</p>
                <p className="text-xs text-gray-500">#{pass.id.slice(0, 8)}</p>
              </div>
            </div>
          </div>

          {/* Pass Info */}
          <div className="space-y-4">
            {/* Header with badges */}
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {getTypeLabel(pass.type)}
                </Badge>
                <Badge className={`text-xs ${statusConfig.className}`}>
                  {statusConfig.label}
                </Badge>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-trailflow-green">
                  R$ {pass.price.toFixed(2).replace('.', ',')}
                </div>
              </div>
            </div>

            {/* Event details */}
            <div>
              <h3 className="font-semibold text-lg text-trailflow-dark mb-3">
                {pass.partner}
              </h3>
            </div>

            {/* Details grid */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User size={16} className="text-trailflow-green flex-shrink-0" />
                <div>
                  <p className="font-medium">{pass.participantName}</p>
                  <p className="text-gray-600">Participante</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-trailflow-green flex-shrink-0" />
                <div>
                  <p className="font-medium">{pass.participantEmail}</p>
                  <p className="text-gray-600">Email</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Hash size={16} className="text-trailflow-green flex-shrink-0" />
                <div>
                  <p className="font-medium">#{pass.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-gray-600">Número do Pedido</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Calendar size={16} className="text-trailflow-green flex-shrink-0" />
                <div>
                  <p className="font-medium">
                    {format(new Date(pass.purchaseDate), 'dd/MM/yyyy', { locale: ptBR })}
                  </p>
                  <p className="text-gray-600">Data da Compra</p>
                </div>
              </div>

              {pass.validDate && (
                <div className="flex items-center gap-3 text-sm">
                  <CreditCard size={16} className="text-trailflow-green flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {format(new Date(pass.validDate), 'dd/MM/yyyy', { locale: ptBR })}
                    </p>
                    <p className="text-gray-600">Data Válida</p>
                  </div>
                </div>
              )}

              {pass.usedAt && (
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-gray-500 flex-shrink-0" />
                  <div>
                    <p className="font-medium">
                      {format(new Date(pass.usedAt), 'dd/MM/yyyy \'às\' HH:mm', { locale: ptBR })}
                    </p>
                    <p className="text-gray-600">Data de Uso</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleDownloadPDF}
              className="flex-1 bg-trailflow-green hover:bg-trailflow-green-dark"
            >
              <Download size={16} className="mr-2" />
              Baixar PDF
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
