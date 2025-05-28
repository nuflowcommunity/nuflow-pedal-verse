
import React from 'react';
import { Eye, Edit, Check, X, Copy, Power, Users, Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ExtendedEventForManagement } from '@/types/eventManagement';

interface EventsTableProps {
  events: ExtendedEventForManagement[];
  onApprove: (eventId: string, adminNotes?: string) => void;
  onReject: (eventId: string, reason: string, adminNotes?: string) => void;
  onClone: (eventId: string) => void;
  onDeactivate: (eventId: string) => void;
  onView: (eventId: string) => void;
  onEdit: (eventId: string) => void;
  onManageRegistrations: (eventId: string) => void;
  isLoading?: boolean;
}

const EventsTable: React.FC<EventsTableProps> = ({
  events,
  onApprove,
  onReject,
  onClone,
  onDeactivate,
  onView,
  onEdit,
  onManageRegistrations,
  isLoading
}) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
      approved: { label: 'Aprovado', className: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejeitado', className: 'bg-red-100 text-red-800' },
      active: { label: 'Ativo', className: 'bg-blue-100 text-blue-800' },
      cancelled: { label: 'Cancelado', className: 'bg-gray-100 text-gray-800' },
      completed: { label: 'Concluído', className: 'bg-purple-100 text-purple-800' },
      draft: { label: 'Rascunho', className: 'bg-gray-100 text-gray-600' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Carregando eventos...</div>
        </CardContent>
      </Card>
    );
  }

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Nenhum evento encontrado</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Evento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Parceiro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Local</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900 line-clamp-1">
                        {event.title}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {event.short_description || event.description}
                      </div>
                      {event.cloned_from_id && (
                        <Badge variant="outline" className="text-xs">
                          <Copy className="w-3 h-3 mr-1" />
                          Clonado
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge variant="outline">
                      {event.event_type || 'Evento'}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm">
                      {event.partner_name || event.organizer || '-'}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {getStatusBadge(event.status)}
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                        {formatDate(event.date)}
                      </div>
                      {event.end_date && event.end_date !== event.date && (
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          até {formatDate(event.end_date)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="line-clamp-1">
                        {event.city ? `${event.city}, ${event.state}` : event.location}
                      </span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-1 text-gray-400" />
                      {event.max_participants ? `0/${event.max_participants}` : 'Ilimitado'}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <TooltipProvider>
                      <div className="flex items-center gap-1">
                        {/* Ações de aprovação - só para eventos pendentes */}
                        {event.status === 'pending' && (
                          <>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onApprove(event.id)}
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Aprovar</TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onReject(event.id, 'Evento rejeitado pelo administrador')}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Rejeitar</TooltipContent>
                            </Tooltip>
                          </>
                        )}

                        {/* Ações gerais */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onView(event.id)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Visualizar</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEdit(event.id)}
                              className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Editar</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onClone(event.id)}
                              className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Clonar</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onManageRegistrations(event.id)}
                              className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                            >
                              <Users className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Gerenciar Inscrições</TooltipContent>
                        </Tooltip>

                        {event.status !== 'cancelled' && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onDeactivate(event.id)}
                                className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                              >
                                <Power className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Desativar</TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventsTable;
