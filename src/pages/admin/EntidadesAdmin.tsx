import React, { useState, useMemo } from 'react';
import { Package2, Filter, Plus, Search, Calendar, CreditCard, Clock, Users, AlertTriangle, CheckCircle, XCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FinanceTable, getStatusBadge } from '@/components/admin/finance/FinanceTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Tipos de entidades
type EntityType = 'evento' | 'mensalidade' | 'dayUse' | 'credito';

// Tipos de status
type EntityStatus = 'ativo' | 'pendente' | 'cancelado';

// Interface melhorada para representar uma entidade com campos específicos por tipo
interface BaseEntity {
  id: string;
  type: EntityType;
  partner: string;
  name: string;
  status: EntityStatus;
  createdAt: string;
  price?: number;
  validationStatus?: 'validated' | 'pending' | 'failed';
}

interface EventoEntity extends BaseEntity {
  type: 'evento';
  capacity?: number;
  date?: string;
  location?: string;
  registrations?: number;
}

interface MensalidadeEntity extends BaseEntity {
  type: 'mensalidade';
  duration?: string;
  renewalDate?: string;
  includedCredits?: number;
}

interface DayUseEntity extends BaseEntity {
  type: 'dayUse';
  validFor?: string;
  accessDate?: string;
}

interface CreditoEntity extends BaseEntity {
  type: 'credito';
  totalCredits?: number;
  usedCredits?: number;
  expiryDate?: string;
  validationStatus?: 'validated' | 'pending' | 'failed';
}

// União de todos os tipos de entidade
type Entity = EventoEntity | MensalidadeEntity | DayUseEntity | CreditoEntity;

// Dados de exemplo para demonstração - enriquecidos com mais informações
const mockEntities: Entity[] = [
  { 
    id: '1', 
    type: 'evento', 
    partner: 'Bike Park SP', 
    name: 'Downhill Experience', 
    status: 'ativo', 
    createdAt: '2025-01-15', 
    price: 120.00, 
    capacity: 30,
    date: '2025-06-15',
    location: 'São Paulo, SP',
    registrations: 12
  },
  { 
    id: '2', 
    type: 'evento', 
    partner: 'Trilhas da Serra', 
    name: 'Trilha Pico do Jaraguá', 
    status: 'ativo', 
    createdAt: '2025-02-20', 
    price: 85.00, 
    capacity: 20,
    date: '2025-07-01',
    location: 'São Paulo, SP',
    registrations: 8
  },
  { 
    id: '3', 
    type: 'mensalidade', 
    partner: 'Clube MTB', 
    name: 'Plano Premium', 
    status: 'ativo', 
    createdAt: '2025-01-01', 
    price: 99.90, 
    duration: 'Mensal',
    renewalDate: '2025-06-01',
    includedCredits: 4
  },
  { 
    id: '4', 
    type: 'mensalidade', 
    partner: 'Clube MTB', 
    name: 'Plano Básico', 
    status: 'ativo', 
    createdAt: '2025-01-01', 
    price: 49.90, 
    duration: 'Mensal',
    renewalDate: '2025-06-01',
    includedCredits: 2
  },
  { 
    id: '5', 
    type: 'dayUse', 
    partner: 'Bike Park SP', 
    name: 'Acesso Diário', 
    status: 'ativo', 
    createdAt: '2025-01-10', 
    price: 40.00,
    validFor: '1 dia',
    accessDate: '2025-06-10'
  },
  { 
    id: '6', 
    type: 'dayUse', 
    partner: 'Trilhas da Serra', 
    name: 'Day Pass', 
    status: 'pendente', 
    createdAt: '2025-03-05', 
    price: 35.00,
    validFor: '1 dia',
    accessDate: '2025-06-15'
  },
  { 
    id: '7', 
    type: 'credito', 
    partner: 'Clube MTB', 
    name: 'Créditos de Aulas', 
    status: 'ativo', 
    createdAt: '2025-02-10', 
    price: 200.00,
    totalCredits: 10,
    usedCredits: 3,
    expiryDate: '2025-12-31',
    validationStatus: 'validated'
  },
  { 
    id: '8', 
    type: 'credito', 
    partner: 'Bike Park SP', 
    name: 'Pacote 10 Acessos', 
    status: 'cancelado', 
    createdAt: '2024-12-01', 
    price: 300.00,
    totalCredits: 10,
    usedCredits: 2,
    expiryDate: '2025-11-30',
    validationStatus: 'pending'
  },
  { 
    id: '9', 
    type: 'evento', 
    partner: 'Pedal Urbano', 
    name: 'Night Ride SP', 
    status: 'cancelado', 
    createdAt: '2025-02-28', 
    price: 50.00, 
    capacity: 50,
    date: '2025-05-10',
    location: 'São Paulo, SP',
    registrations: 0
  },
  { 
    id: '10', 
    type: 'mensalidade', 
    partner: 'Bike Shop Pro', 
    name: 'Clube de Descontos', 
    status: 'pendente', 
    createdAt: '2025-03-01', 
    price: 29.90, 
    duration: 'Mensal',
    renewalDate: '2025-06-01',
    includedCredits: 0
  },
  {
    id: '11',
    type: 'credito',
    partner: 'Bike Park SP',
    name: 'Pacote de créditos promocional',
    status: 'ativo',
    createdAt: '2025-04-15',
    price: 150.00,
    totalCredits: 5,
    usedCredits: 0,
    expiryDate: '2025-10-15',
    validationStatus: 'failed'
  }
];

// Tradução dos tipos de entidades para exibição
const entityTypeLabels: Record<EntityType, string> = {
  evento: 'Evento',
  mensalidade: 'Mensalidade',
  dayUse: 'Day Use',
  credito: 'Crédito'
};

// Icones para cada tipo de entidade
const entityTypeIcons: Record<EntityType, React.ReactNode> = {
  evento: <Calendar className="h-4 w-4 mr-2" />,
  mensalidade: <Clock className="h-4 w-4 mr-2" />,
  dayUse: <Users className="h-4 w-4 mr-2" />,
  credito: <CreditCard className="h-4 w-4 mr-2" />
};

// Função para obter o ícone do status de validação
const getValidationStatusIcon = (status?: 'validated' | 'pending' | 'failed') => {
  if (!status) return null;
  
  switch (status) {
    case 'validated':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'pending':
      return <Clock className="h-4 w-4 text-amber-500" />;
    case 'failed':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const EntidadesAdmin = () => {
  // Estados para os filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [partnerFilter, setPartnerFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [validationFilter, setValidationFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Hook para toasts
  const { toast } = useToast();
  
  // Lista de parceiros para o filtro (derivada dos dados mock)
  const partners = Array.from(new Set(mockEntities.map(entity => entity.partner)));
  
  // Estatísticas para o dashboard
  const stats = useMemo(() => {
    return {
      total: mockEntities.length,
      ativo: mockEntities.filter(e => e.status === 'ativo').length,
      pendente: mockEntities.filter(e => e.status === 'pendente').length,
      cancelado: mockEntities.filter(e => e.status === 'cancelado').length,
      eventos: mockEntities.filter(e => e.type === 'evento').length,
      mensalidades: mockEntities.filter(e => e.type === 'mensalidade').length,
      dayUse: mockEntities.filter(e => e.type === 'dayUse').length,
      creditos: mockEntities.filter(e => e.type === 'credito').length,
      validationIssues: mockEntities.filter(e => e.type === 'credito' && (e as CreditoEntity).validationStatus === 'failed').length
    };
  }, [mockEntities]);
  
  // Filtra as entidades com base nos filtros aplicados
  const filteredEntities = useMemo(() => {
    return mockEntities.filter(entity => {
      // Filtro por texto de pesquisa
      const matchesSearch = !searchQuery || 
        entity.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        entity.partner.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filtro por parceiro
      const matchesPartner = !partnerFilter || partnerFilter === '_all' || entity.partner === partnerFilter;
      
      // Filtro por tipo
      const matchesType = !typeFilter || typeFilter === '_all' || entity.type === typeFilter;
      
      // Filtro por status
      const matchesStatus = !statusFilter || statusFilter === '_all' || entity.status === statusFilter;
      
      // Filtro por validação (apenas para créditos)
      const matchesValidation = !validationFilter || validationFilter === '_all' || 
        (entity.type === 'credito' && (entity as CreditoEntity).validationStatus === validationFilter);
      
      // Filtro por tab ativa
      const matchesTab = activeTab === 'todos' || entity.type === activeTab;
      
      return matchesSearch && matchesPartner && matchesType && matchesStatus && matchesValidation && matchesTab;
    });
  }, [searchQuery, partnerFilter, typeFilter, statusFilter, validationFilter, activeTab, mockEntities]);

  // Configuração de colunas comuns para todos os tipos
  const baseColumns = [
    {
      id: 'type',
      header: 'Tipo',
      accessorKey: 'type' as keyof Entity,
      cell: (item: Entity) => (
        <div className="flex items-center">
          {entityTypeIcons[item.type]}
          <span>{entityTypeLabels[item.type]}</span>
        </div>
      ),
    },
    {
      id: 'partner',
      header: 'Parceiro',
      accessorKey: 'partner' as keyof Entity,
    },
    {
      id: 'name',
      header: 'Nome',
      accessorKey: 'name' as keyof Entity,
    },
    {
      id: 'status',
      header: 'Status',
      accessorKey: 'status' as keyof Entity,
      cell: (item: Entity) => getStatusBadge(item.status === 'ativo' ? 'Ativo' : item.status === 'pendente' ? 'Pendente' : 'Cancelado'),
    },
    {
      id: 'price',
      header: 'Preço',
      accessorKey: 'price' as keyof Entity,
      cell: (item: Entity) => item.price ? `R$ ${item.price.toFixed(2)}` : '-',
    }
  ];
  
  // Colunas específicas por tipo
  const typeSpecificColumns = useMemo(() => {
    switch (activeTab) {
      case 'evento':
        return [
          ...baseColumns,
          {
            id: 'date',
            header: 'Data',
            accessorKey: 'date' as keyof Entity,
            cell: (item: EventoEntity) => item.date || '-',
          },
          {
            id: 'capacity',
            header: 'Capacidade',
            accessorKey: 'capacity' as keyof Entity,
            cell: (item: EventoEntity) => {
              if (item.capacity && item.registrations) {
                const percentage = (item.registrations / item.capacity) * 100;
                return (
                  <div className="flex items-center">
                    <span className="mr-2">{`${item.registrations}/${item.capacity}`}</span>
                    <Badge className={`${percentage > 80 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {`${Math.round(percentage)}%`}
                    </Badge>
                  </div>
                );
              }
              return item.capacity || '-';
            }
          }
        ];
      case 'mensalidade':
        return [
          ...baseColumns,
          {
            id: 'duration',
            header: 'Duração',
            accessorKey: 'duration' as keyof Entity,
            cell: (item: MensalidadeEntity) => item.duration || '-',
          },
          {
            id: 'renewalDate',
            header: 'Renovação',
            accessorKey: 'renewalDate' as keyof Entity,
            cell: (item: MensalidadeEntity) => item.renewalDate || '-',
          },
          {
            id: 'includedCredits',
            header: 'Créditos Incluídos',
            accessorKey: 'includedCredits' as keyof Entity,
            cell: (item: MensalidadeEntity) => item.includedCredits !== undefined ? item.includedCredits : '-',
          }
        ];
      case 'dayUse':
        return [
          ...baseColumns,
          {
            id: 'validFor',
            header: 'Validade',
            accessorKey: 'validFor' as keyof Entity,
            cell: (item: DayUseEntity) => item.validFor || '-',
          },
          {
            id: 'accessDate',
            header: 'Data de Acesso',
            accessorKey: 'accessDate' as keyof Entity,
            cell: (item: DayUseEntity) => item.accessDate || '-',
          }
        ];
      case 'credito':
        return [
          ...baseColumns,
          {
            id: 'totalCredits',
            header: 'Total de Créditos',
            accessorKey: 'totalCredits' as keyof Entity,
            cell: (item: CreditoEntity) => item.totalCredits !== undefined ? item.totalCredits : '-',
          },
          {
            id: 'usedCredits',
            header: 'Créditos Usados',
            accessorKey: 'usedCredits' as keyof Entity,
            cell: (item: CreditoEntity) => {
              if (item.totalCredits !== undefined && item.usedCredits !== undefined) {
                const remaining = item.totalCredits - item.usedCredits;
                const percentage = (item.usedCredits / item.totalCredits) * 100;
                return (
                  <div className="flex items-center">
                    <span className="mr-2">{`${item.usedCredits}/${item.totalCredits}`}</span>
                    <Badge className={`${percentage > 80 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {`${remaining} restantes`}
                    </Badge>
                  </div>
                );
              }
              return item.usedCredits !== undefined ? item.usedCredits : '-';
            }
          },
          {
            id: 'expiryDate',
            header: 'Validade',
            accessorKey: 'expiryDate' as keyof Entity,
            cell: (item: CreditoEntity) => item.expiryDate || '-',
          },
          {
            id: 'validationStatus',
            header: 'Validação',
            accessorKey: 'validationStatus' as keyof Entity,
            cell: (item: CreditoEntity) => {
              const status = item.validationStatus;
              if (!status) return '-';
              
              const statusLabels = {
                validated: 'Validado',
                pending: 'Pendente',
                failed: 'Falhou'
              };
              
              const statusColors = {
                validated: 'bg-green-100 text-green-800',
                pending: 'bg-amber-100 text-amber-800',
                failed: 'bg-red-100 text-red-800'
              };
              
              return (
                <div className="flex items-center">
                  {getValidationStatusIcon(status)}
                  <Badge className={`ml-2 ${statusColors[status]}`}>{statusLabels[status]}</Badge>
                </div>
              );
            }
          }
        ];
      default:
        return baseColumns;
    }
  }, [activeTab, baseColumns]);
  
  // Ações específicas por tipo
  const getTypeSpecificActions = (item: Entity) => {
    const baseActions = [
      {
        label: 'Editar',
        icon: <span className="material-icons text-blue-600">edit</span>,
        onClick: (entity: Entity) => {
          setSelectedEntity(entity);
          toast({
            title: "Editar entidade",
            description: `Editando ${entityTypeLabels[entity.type]}: ${entity.name}`,
          });
        }
      },
      {
        label: 'Clonar',
        icon: <span className="material-icons text-amber-600">content_copy</span>,
        onClick: (entity: Entity) => {
          toast({
            title: "Clonar entidade",
            description: `Clonando ${entityTypeLabels[entity.type]}: ${entity.name}`,
          });
        }
      }
    ];
    
    // Ações específicas por tipo
    switch (item.type) {
      case 'evento':
        return [
          ...baseActions,
          {
            label: 'Gerenciar inscrições',
            icon: <span className="material-icons text-green-600">group</span>,
            onClick: (entity: Entity) => {
              toast({
                title: "Gerenciar inscrições",
                description: `Gerenciando inscrições para ${entity.name}`,
              });
            }
          }
        ];
      case 'mensalidade':
        return [
          ...baseActions,
          {
            label: 'Gerenciar renovações',
            icon: <span className="material-icons text-purple-600">calendar_month</span>,
            onClick: (entity: Entity) => {
              toast({
                title: "Gerenciar renovações",
                description: `Gerenciando renovações para ${entity.name}`,
              });
            }
          }
        ];
      case 'credito':
        return [
          ...baseActions,
          {
            label: 'Validar créditos',
            icon: <span className="material-icons text-green-600">qr_code_scanner</span>,
            onClick: (entity: Entity) => {
              toast({
                title: "Validar créditos",
                description: `Validando créditos para ${entity.name}`,
              });
            }
          }
        ];
      default:
        return baseActions;
    }
  };
  
  // Configuração das ações para a tabela - passing a function that returns the configuration
  const tableActions = (item: Entity) => ({
    view: true,
    custom: getTypeSpecificActions(item)
  });
  
  // Handler para abrir detalhes da entidade
  const handleViewEntity = (entity: Entity) => {
    setSelectedEntity(entity);
    setIsDetailOpen(true);
  };

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setSearchQuery('');
    setPartnerFilter('');
    setTypeFilter('');
    setStatusFilter('');
    setValidationFilter('');
    setActiveTab('todos');
  };

  // Função para renderizar o conteúdo do drawer de detalhes
  const renderEntityDetails = () => {
    if (!selectedEntity) return null;
    
    // Conteúdo comum para todos os tipos
    const commonDetails = (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Parceiro</h4>
            <p>{selectedEntity.partner}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Status</h4>
            <p>{getStatusBadge(selectedEntity.status === 'ativo' ? 'Ativo' : selectedEntity.status === 'pendente' ? 'Pendente' : 'Cancelado')}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Preço</h4>
            <p>{selectedEntity.price ? `R$ ${selectedEntity.price.toFixed(2)}` : '-'}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Criado em</h4>
            <p>{selectedEntity.createdAt}</p>
          </div>
        </div>
      </>
    );
    
    // Conteúdo específico para cada tipo
    const typeSpecificDetails = () => {
      switch (selectedEntity.type) {
        case 'evento': {
          const event = selectedEntity as EventoEntity;
          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Data</h4>
                  <p>{event.date || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Local</h4>
                  <p>{event.location || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Capacidade</h4>
                  <p>{event.capacity || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Inscritos</h4>
                  <p>{event.registrations || '0'}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Gerenciamento de Inscrições</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => toast({
                    title: "Exportar lista",
                    description: "Exportando lista de inscritos"
                  })}>
                    Exportar lista
                  </Button>
                  <Button onClick={() => toast({
                    title: "Gerenciar inscrições",
                    description: "Abrindo gerenciamento de inscrições"
                  })}>
                    Gerenciar inscrições
                  </Button>
                </div>
              </div>
            </>
          );
        }
        case 'mensalidade': {
          const plan = selectedEntity as MensalidadeEntity;
          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Duração</h4>
                  <p>{plan.duration || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Renovação</h4>
                  <p>{plan.renewalDate || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Créditos Incluídos</h4>
                  <p>{plan.includedCredits !== undefined ? plan.includedCredits : '-'}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Gerenciamento de Mensalidade</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => toast({
                    title: "Histórico de cobranças",
                    description: "Visualizando histórico de cobranças"
                  })}>
                    Histórico de cobranças
                  </Button>
                  <Button onClick={() => toast({
                    title: "Gerenciar renovações",
                    description: "Abrindo gerenciamento de renovações"
                  })}>
                    Gerenciar renovações
                  </Button>
                </div>
              </div>
            </>
          );
        }
        case 'dayUse': {
          const dayUse = selectedEntity as DayUseEntity;
          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Validade</h4>
                  <p>{dayUse.validFor || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Data de Acesso</h4>
                  <p>{dayUse.accessDate || '-'}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Gerenciamento de Day Use</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => toast({
                    title: "Gerar QR Code",
                    description: "Gerando QR Code para acesso"
                  })}>
                    Gerar QR Code
                  </Button>
                  <Button onClick={() => toast({
                    title: "Histórico de acessos",
                    description: "Visualizando histórico de acessos"
                  })}>
                    Histórico de acessos
                  </Button>
                </div>
              </div>
            </>
          );
        }
        case 'credito': {
          const credit = selectedEntity as CreditoEntity;
          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Total de Créditos</h4>
                  <p>{credit.totalCredits !== undefined ? credit.totalCredits : '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Créditos Usados</h4>
                  <p>{credit.usedCredits !== undefined ? credit.usedCredits : '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Validade</h4>
                  <p>{credit.expiryDate || '-'}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Status de Validação</h4>
                  <div className="flex items-center">
                    {getValidationStatusIcon(credit.validationStatus)}
                    <span className="ml-2">
                      {credit.validationStatus === 'validated' ? 'Validado' : 
                       credit.validationStatus === 'pending' ? 'Pendente' : 
                       credit.validationStatus === 'failed' ? 'Falhou' : '-'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Gerenciamento de Créditos</h3>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    className={credit.validationStatus === 'validated' ? 'bg-green-100' : ''}
                    onClick={() => toast({
                      title: "Validar créditos",
                      description: "Abrindo validação de créditos via QR Code"
                    })}
                  >
                    {credit.validationStatus === 'validated' ? 'Revalidar' : 'Validar créditos'}
                  </Button>
                  <Button onClick={() => toast({
                    title: "Histórico de uso",
                    description: "Visualizando histórico de uso de créditos"
                  })}>
                    Histórico de uso
                  </Button>
                </div>
              </div>
            </>
          );
        }
        default:
          return null;
      }
    };
    
    return (
      <>
        <div className="flex items-center gap-2 mb-6">
          {entityTypeIcons[selectedEntity.type]}
          <span className="text-sm text-muted-foreground">{entityTypeLabels[selectedEntity.type]}</span>
        </div>
        
        {commonDetails}
        {typeSpecificDetails()}
      </>
    );
  };
  
  // Renderização do sumário de estatísticas no topo da página
  const renderSummaryCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total de Entidades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.total}</div>
          <div className="text-sm text-muted-foreground mt-2">
            <span className="inline-flex items-center">
              <Activity className="h-4 w-4 mr-1" />
              {stats.ativo} ativos
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Por Tipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center text-sm">
                {entityTypeIcons.evento} Eventos
              </span>
              <Badge variant="outline">{stats.eventos}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center text-sm">
                {entityTypeIcons.mensalidade} Mensalidades
              </span>
              <Badge variant="outline">{stats.mensalidades}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center text-sm">
                {entityTypeIcons.dayUse} Day Use
              </span>
              <Badge variant="outline">{stats.dayUse}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="inline-flex items-center text-sm">
                {entityTypeIcons.credito} Créditos
              </span>
              <Badge variant="outline">{stats.creditos}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Por Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">Ativos</span>
              <Badge className="bg-green-100 text-green-800">{stats.ativo}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Pendentes</span>
              <Badge className="bg-amber-100 text-amber-800">{stats.pendente}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Cancelados</span>
              <Badge className="bg-gray-100 text-gray-800">{stats.cancelado}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className={stats.validationIssues > 0 ? "border-red-300" : ""}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            Alertas
            {stats.validationIssues > 0 && (
              <AlertTriangle className="h-4 w-4 ml-2 text-red-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {stats.validationIssues > 0 ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-600">Validação de créditos</span>
                <Badge className="bg-red-100 text-red-800">{stats.validationIssues}</Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                onClick={() => {
                  setActiveTab('credito');
                  setValidationFilter('failed');
                }}
              >
                Ver detalhes
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[85px]">
              <CheckCircle className="h-10 w-10 text-green-500 mb-1" />
              <span className="text-sm text-muted-foreground">Sem problemas detectados</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Entidades</h1>
          <p className="text-muted-foreground">
            Gerencie todos os tipos de produtos e serviços oferecidos
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              <span>Nova Entidade</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast({
              title: "Novo evento",
              description: "Criando um novo evento"
            })}>
              {entityTypeIcons.evento}
              Novo Evento
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({
              title: "Nova mensalidade",
              description: "Criando uma nova mensalidade"
            })}>
              {entityTypeIcons.mensalidade}
              Nova Mensalidade
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({
              title: "Novo day use",
              description: "Criando um novo day use"
            })}>
              {entityTypeIcons.dayUse}
              Novo Day Use
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast({
              title: "Novo crédito",
              description: "Criando um novo pacote de créditos"
            })}>
              {entityTypeIcons.credito}
              Novo Crédito
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Resumo de estatísticas */}
      {renderSummaryCards()}

      {/* Tabs por tipo */}
      <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 md:w-auto w-full">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="evento" className="flex items-center gap-1">
            {entityTypeIcons.evento}
            Eventos
          </TabsTrigger>
          <TabsTrigger value="mensalidade" className="flex items-center gap-1">
            {entityTypeIcons.mensalidade}
            Mensalidades
          </TabsTrigger>
          <TabsTrigger value="dayUse" className="flex items-center gap-1">
            {entityTypeIcons.dayUse}
            Day Use
          </TabsTrigger>
          <TabsTrigger value="credito" className="flex items-center gap-1">
            {entityTypeIcons.credito}
            Créditos
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo para todas as abas - usamos o mesmo, filtrando dinamicamente */}
        <TabsContent value={activeTab} className="mt-6">
          {/* Filtros */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Filtros</CardTitle>
              <CardDescription>Refine os resultados utilizando os filtros abaixo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="relative">
                    <Input
                      placeholder="Buscar por nome ou parceiro..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 w-full"
                    />
                    <Search className="absolute top-3 left-3 h-4 w-4 opacity-50" />
                  </div>
                </div>
                <Select value={partnerFilter} onValueChange={setPartnerFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Parceiro" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_all">Todos os parceiros</SelectItem>
                    {partners.map(partner => (
                      <SelectItem key={partner} value={partner}>{partner}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_all">Todos os tipos</SelectItem>
                    <SelectItem value="evento">Evento</SelectItem>
                    <SelectItem value="mensalidade">Mensalidade</SelectItem>
                    <SelectItem value="dayUse">Day Use</SelectItem>
                    <SelectItem value="credito">Crédito</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_all">Todos os status</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Filtro adicional para validação, visível apenas na aba de Créditos */}
                {(activeTab === 'credito' || activeTab === 'todos') && (
                  <div className={activeTab === 'todos' ? "col-span-1 md:col-span-5" : ""}>
                    <Select value={validationFilter} onValueChange={setValidationFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status de validação" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_all">Todos</SelectItem>
                        <SelectItem value="validated">Validados</SelectItem>
                        <SelectItem value="pending">Pendentes</SelectItem>
                        <SelectItem value="failed">Com falha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className={activeTab === 'credito' ? "col-span-1 md:col-span-5" : "col-span-1 md:col-span-5"}>
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="flex items-center gap-2"
                      disabled={!searchQuery && !partnerFilter && !typeFilter && !statusFilter && !validationFilter && activeTab === 'todos'}
                    >
                      <Filter size={16} />
                      Limpar Filtros
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabela principal */}
          <FinanceTable
            title={`Entidades ${activeTab !== 'todos' ? '- ' + entityTypeLabels[activeTab as EntityType] : ''}`}
            columns={typeSpecificColumns}
            data={filteredEntities}
            actions={tableActions}
            onRowClick={handleViewEntity}
            pagination={
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(prev => Math.max(prev - 1, 1));
                      }} 
                    />
                  </PaginationItem>
                  {[1, 2, 3].map(page => (
                    <PaginationItem key={page}>
                      <PaginationLink 
                        href="#" 
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(prev => prev + 1);
                      }} 
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            }
            emptyState={
              <div className="flex flex-col items-center justify-center py-10">
                <Package2 size={48} className="text-gray-300 mb-3" />
                <h3 className="text-lg font-medium">Nenhuma entidade encontrada</h3>
                <p className="text-muted-foreground">Tente ajustar os filtros ou adicione uma nova entidade.</p>
              </div>
            }
          />
        </TabsContent>
      </Tabs>
      
      {/* Modal/Drawer de Detalhes da Entidade */}
      <Drawer open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DrawerContent className="p-4 sm:p-6">
          <DrawerHeader>
            <DrawerTitle>{selectedEntity?.name}</DrawerTitle>
            <DrawerDescription>
              Detalhes da entidade
            </DrawerDescription>
          </DrawerHeader>
          <div className="py-4">
            {renderEntityDetails()}
          </div>
          <DrawerFooter className="pt-2">
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                onClick={() => {
                  if (selectedEntity) {
                    toast({
                      title: "Editar entidade",
                      description: `Editando ${entityTypeLabels[selectedEntity.type]}: ${selectedEntity.name}`
                    });
                  }
                }}
              >
                Editar
              </Button>
              <DrawerClose asChild>
                <Button variant="ghost">Fechar</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default EntidadesAdmin;
