
import React, { useState } from 'react';
import { 
  Eye, 
  Edit, 
  Check, 
  X, 
  Copy, 
  Power, 
  Users, 
  Calendar, 
  MapPin, 
  Clock,
  MoreVertical,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ExtendedEventForManagement } from '@/types/eventManagement';

interface Column {
  id: string;
  label: string;
  sortable: boolean;
  width?: string;
}

interface EnhancedEventsTableProps {
  events: ExtendedEventForManagement[];
  selectedEvents: string[];
  onSelectEvent: (eventId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (column: string) => void;
  onApprove: (eventId: string) => void;
  onReject: (eventId: string) => void;
  onClone: (eventId: string) => void;
  onDeactivate: (eventId: string) => void;
  onView: (eventId: string) => void;
  onEdit: (eventId: string) => void;
  onManageRegistrations: (eventId: string) => void;
  isLoading?: boolean;
}

const defaultColumns: Column[] = [
  { id: 'select', label: '', sortable: false, width: '50px' },
  { id: 'event', label: 'Evento', sortable: true },
  { id: 'type', label: 'Tipo', sortable: true, width: '120px' },
  { id: 'organizer', label: 'Organizador', sortable: true, width: '150px' },
  { id: 'status', label: 'Status', sortable: true, width: '120px' },
  { id: 'date', label: 'Data', sortable: true, width: '180px' },
  { id: 'location', label: 'Local', sortable: true, width: '200px' },
  { id: 'participants', label: 'Participantes', sortable: true, width: '120px' },
  { id: 'actions', label: 'Ações', sortable: false, width: '120px' },
];

export const EnhancedEventsTable: React.FC<EnhancedEventsTableProps> = ({
  events,
  selectedEvents,
  onSelectEvent,
  onSelectAll,
  sortBy,
  sortOrder,
  onSort,
  onApprove,
  onReject,
  onClone,
  onDeactivate,
  onView,
  onEdit,
  onManageRegistrations,
  isLoading
}) => {
  const [visibleColumns, setVisibleColumns] = useState(defaultColumns.map(c => c.id));
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

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

  const allSelected = selectedEvents.length === events.length && events.length > 0;
  const someSelected = selectedEvents.length > 0 && selectedEvents.length < events.length;

  const handleSelectAll = () => {
    onSelectAll(!allSelected);
  };

  const getSortIcon = (columnId: string) => {
    if (sortBy !== columnId) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortOrder === 'asc' ? 
      <ArrowUpDown className="h-4 w-4 text-blue-600 rotate-180" /> : 
      <ArrowUpDown className="h-4 w-4 text-blue-600" />;
  };

  const toggleRowExpansion = (eventId: string) => {
    setExpandedRow(expandedRow === eventId ? null : eventId);
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
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  {defaultColumns.filter(col => visibleColumns.includes(col.id)).map((column) => (
                    <TableHead 
                      key={column.id} 
                      className={`${column.width ? `w-[${column.width}]` : ''} relative`}
                    >
                      {column.id === 'select' ? (
                        <Checkbox
                          checked={allSelected}
                          ref={(el) => {
                            if (el) el.indeterminate = someSelected && !allSelected;
                          }}
                          onCheckedChange={handleSelectAll}
                          aria-label="Selecionar todos"
                        />
                      ) : column.sortable ? (
                        <Button
                          variant="ghost"
                          onClick={() => onSort(column.id)}
                          className="h-auto p-0 font-medium hover:bg-transparent"
                        >
                          <span className="flex items-center gap-1">
                            {column.label}
                            {getSortIcon(column.id)}
                          </span>
                        </Button>
                      ) : (
                        column.label
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <React.Fragment key={event.id}>
                    <TableRow className="hover:bg-gray-50 group">
                      {/* Checkbox */}
                      {visibleColumns.includes('select') && (
                        <TableCell>
                          <Checkbox
                            checked={selectedEvents.includes(event.id)}
                            onCheckedChange={(checked) => onSelectEvent(event.id, !!checked)}
                            aria-label={`Selecionar evento ${event.title}`}
                          />
                        </TableCell>
                      )}

                      {/* Event */}
                      {visibleColumns.includes('event') && (
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900 line-clamp-1 cursor-pointer"
                                 onClick={() => toggleRowExpansion(event.id)}>
                              <div className="flex items-center gap-2">
                                <span>{event.title}</span>
                                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                                  expandedRow === event.id ? 'rotate-180' : ''
                                }`} />
                              </div>
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
                      )}

                      {/* Type */}
                      {visibleColumns.includes('type') && (
                        <TableCell>
                          <Badge variant="outline">
                            {event.event_type || event.category || 'Evento'}
                          </Badge>
                        </TableCell>
                      )}

                      {/* Organizer */}
                      {visibleColumns.includes('organizer') && (
                        <TableCell>
                          <div className="text-sm">
                            {event.partner_name || event.organizer || '-'}
                          </div>
                        </TableCell>
                      )}

                      {/* Status */}
                      {visibleColumns.includes('status') && (
                        <TableCell>
                          {getStatusBadge(event.status)}
                        </TableCell>
                      )}

                      {/* Date */}
                      {visibleColumns.includes('date') && (
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
                      )}

                      {/* Location */}
                      {visibleColumns.includes('location') && (
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-1 text-gray-400 flex-shrink-0" />
                            <span className="line-clamp-1">
                              {event.city ? `${event.city}, ${event.state}` : event.location}
                            </span>
                          </div>
                        </TableCell>
                      )}

                      {/* Participants */}
                      {visibleColumns.includes('participants') && (
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <Users className="w-4 h-4 mr-1 text-gray-400" />
                            {event.max_participants ? `0/${event.max_participants}` : 'Ilimitado'}
                          </div>
                        </TableCell>
                      )}

                      {/* Actions */}
                      {visibleColumns.includes('actions') && (
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {/* Quick actions for pending events */}
                            {event.status === 'pending' && (
                              <>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => onApprove(event.id)}
                                      className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                    >
                                      <Check className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Aprovar evento</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => onReject(event.id)}
                                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Rejeitar evento</TooltipContent>
                                </Tooltip>
                              </>
                            )}

                            {/* More actions menu */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onView(event.id)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Visualizar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onEdit(event.id)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => onManageRegistrations(event.id)}>
                                  <Users className="h-4 w-4 mr-2" />
                                  Inscrições
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => onClone(event.id)}>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Clonar
                                </DropdownMenuItem>
                                {event.status !== 'cancelled' && (
                                  <DropdownMenuItem 
                                    onClick={() => onDeactivate(event.id)}
                                    className="text-orange-600"
                                  >
                                    <Power className="h-4 w-4 mr-2" />
                                    Desativar
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>

                    {/* Expanded row details */}
                    {expandedRow === event.id && (
                      <TableRow>
                        <TableCell 
                          colSpan={visibleColumns.length} 
                          className="bg-gray-50 border-l-4 border-blue-200"
                        >
                          <div className="py-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-600">Criado em:</span>
                                <p>{formatDateTime(event.created_at)}</p>
                              </div>
                              {event.approved_at && (
                                <div>
                                  <span className="font-medium text-gray-600">Aprovado em:</span>
                                  <p>{formatDateTime(event.approved_at)}</p>
                                </div>
                              )}
                              {event.price && (
                                <div>
                                  <span className="font-medium text-gray-600">Preço:</span>
                                  <p>{new Intl.NumberFormat('pt-BR', { 
                                    style: 'currency', 
                                    currency: 'BRL' 
                                  }).format(event.price)}</p>
                                </div>
                              )}
                            </div>
                            
                            {event.admin_notes && (
                              <div>
                                <span className="font-medium text-gray-600">Notas do Admin:</span>
                                <p className="text-gray-700 mt-1">{event.admin_notes}</p>
                              </div>
                            )}
                            
                            {event.rejection_reason && (
                              <div>
                                <span className="font-medium text-red-600">Motivo da Rejeição:</span>
                                <p className="text-red-700 mt-1">{event.rejection_reason}</p>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};
