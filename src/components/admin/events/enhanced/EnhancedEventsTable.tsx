
import React, { useRef, useEffect } from 'react';
import { MoreHorizontal, Eye, Edit, Users, Archive, Copy, Trash2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ExtendedEventForManagement } from '@/types/eventManagement';

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
  isLoading = false
}) => {
  const selectAllRef = useRef<HTMLButtonElement>(null);

  const allSelected = selectedEvents.length === events.length && events.length > 0;
  const someSelected = selectedEvents.length > 0 && selectedEvents.length < events.length;

  // Update the select all checkbox appearance
  useEffect(() => {
    if (selectAllRef.current) {
      if (allSelected) {
        selectAllRef.current.setAttribute('data-state', 'checked');
      } else if (someSelected) {
        selectAllRef.current.setAttribute('data-state', 'indeterminate');
      } else {
        selectAllRef.current.setAttribute('data-state', 'unchecked');
      }
    }
  }, [allSelected, someSelected]);

  const handleSelectAll = () => {
    onSelectAll(!allSelected);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, label: 'Pendente' },
      approved: { variant: 'default' as const, label: 'Aprovado' },
      active: { variant: 'default' as const, label: 'Ativo' },
      rejected: { variant: 'destructive' as const, label: 'Rejeitado' },
      cancelled: { variant: 'outline' as const, label: 'Cancelado' },
      draft: { variant: 'outline' as const, label: 'Rascunho' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numPrice);
  };

  const SortableHeader = ({ column, children }: { column: string; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortBy === column && (
          <span className="text-xs">
            {sortOrder === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </TableHead>
  );

  if (isLoading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox disabled />
              </TableHead>
              <TableHead>Evento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Parceiro</TableHead>
              <TableHead>Inscritos</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse" /></TableCell>
                <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-48" /></TableCell>
                <TableCell><div className="h-6 bg-gray-200 rounded animate-pulse w-20" /></TableCell>
                <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-24" /></TableCell>
                <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-32" /></TableCell>
                <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-16" /></TableCell>
                <TableCell><div className="h-4 bg-gray-200 rounded animate-pulse w-20" /></TableCell>
                <TableCell><div className="h-8 bg-gray-200 rounded animate-pulse w-8" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="border rounded-lg p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-gray-400 text-2xl">📅</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum evento encontrado
          </h3>
          <p className="text-gray-600">
            Não há eventos que correspondam aos filtros atuais.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-12">
              <Checkbox
                ref={selectAllRef}
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                aria-label="Selecionar todos os eventos"
              />
            </TableHead>
            <SortableHeader column="title">Evento</SortableHeader>
            <SortableHeader column="status">Status</SortableHeader>
            <SortableHeader column="date">Data</SortableHeader>
            <SortableHeader column="partner_name">Parceiro</SortableHeader>
            <SortableHeader column="registrations">Inscritos</SortableHeader>
            <SortableHeader column="price">Valor</SortableHeader>
            <TableHead className="w-12">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow 
              key={event.id}
              className={`hover:bg-gray-50 transition-colors ${
                selectedEvents.includes(event.id) ? 'bg-blue-50' : ''
              }`}
            >
              <TableCell>
                <Checkbox
                  checked={selectedEvents.includes(event.id)}
                  onCheckedChange={(checked) => 
                    onSelectEvent(event.id, checked as boolean)
                  }
                  aria-label={`Selecionar evento ${event.title}`}
                />
              </TableCell>
              
              <TableCell className="max-w-xs">
                <div>
                  <div className="font-medium text-gray-900 truncate">
                    {event.title}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {event.location}
                  </div>
                </div>
              </TableCell>
              
              <TableCell>
                {getStatusBadge(event.status)}
              </TableCell>
              
              <TableCell className="text-sm">
                {formatDate(event.date)}
              </TableCell>
              
              <TableCell className="text-sm">
                {event.partner_name || 'N/A'}
              </TableCell>
              
              <TableCell className="text-sm">
                <div className="flex flex-col">
                  <span>{event.current_registrations || 0}</span>
                  {event.max_participants && (
                    <span className="text-xs text-gray-500">
                      de {event.max_participants}
                    </span>
                  )}
                </div>
              </TableCell>
              
              <TableCell className="text-sm font-medium">
                {event.price ? formatPrice(event.price) : 'Gratuito'}
              </TableCell>
              
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Abrir menu de ações</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
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
                    
                    {event.status === 'pending' && (
                      <>
                        <DropdownMenuItem 
                          onClick={() => onApprove(event.id)}
                          className="text-green-600"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Aprovar
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem 
                          onClick={() => onReject(event.id)}
                          className="text-red-600"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Rejeitar
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    <DropdownMenuItem onClick={() => onClone(event.id)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicar
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem 
                      onClick={() => onDeactivate(event.id)}
                      className="text-orange-600"
                    >
                      <Archive className="h-4 w-4 mr-2" />
                      Arquivar
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                      onClick={() => console.log('Delete:', event.id)}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
