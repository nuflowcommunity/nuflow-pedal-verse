
import React, { useState } from 'react';
import { Package2, Filter, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FinanceTable, getStatusBadge } from '@/components/admin/finance/FinanceTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

// Tipos de entidades
type EntityType = 'evento' | 'mensalidade' | 'dayUse' | 'credito';

// Tipos de status
type EntityStatus = 'ativo' | 'pendente' | 'cancelado';

// Interface para representar uma entidade
interface Entity {
  id: string;
  type: EntityType;
  partner: string;
  name: string;
  status: EntityStatus;
  createdAt: string;
  price?: number;
  duration?: string;
  capacity?: number;
}

// Dados de exemplo para demonstração
const mockEntities: Entity[] = [
  { id: '1', type: 'evento', partner: 'Bike Park SP', name: 'Downhill Experience', status: 'ativo', createdAt: '2025-01-15', price: 120.00, capacity: 30 },
  { id: '2', type: 'evento', partner: 'Trilhas da Serra', name: 'Trilha Pico do Jaraguá', status: 'ativo', createdAt: '2025-02-20', price: 85.00, capacity: 20 },
  { id: '3', type: 'mensalidade', partner: 'Clube MTB', name: 'Plano Premium', status: 'ativo', createdAt: '2025-01-01', price: 99.90, duration: 'Mensal' },
  { id: '4', type: 'mensalidade', partner: 'Clube MTB', name: 'Plano Básico', status: 'ativo', createdAt: '2025-01-01', price: 49.90, duration: 'Mensal' },
  { id: '5', type: 'dayUse', partner: 'Bike Park SP', name: 'Acesso Diário', status: 'ativo', createdAt: '2025-01-10', price: 40.00 },
  { id: '6', type: 'dayUse', partner: 'Trilhas da Serra', name: 'Day Pass', status: 'pendente', createdAt: '2025-03-05', price: 35.00 },
  { id: '7', type: 'credito', partner: 'Clube MTB', name: 'Créditos de Aulas', status: 'ativo', createdAt: '2025-02-10', price: 200.00 },
  { id: '8', type: 'credito', partner: 'Bike Park SP', name: 'Pacote 10 Acessos', status: 'cancelado', createdAt: '2024-12-01', price: 300.00 },
  { id: '9', type: 'evento', partner: 'Pedal Urbano', name: 'Night Ride SP', status: 'cancelado', createdAt: '2025-02-28', price: 50.00, capacity: 50 },
  { id: '10', type: 'mensalidade', partner: 'Bike Shop Pro', name: 'Clube de Descontos', status: 'pendente', createdAt: '2025-03-01', price: 29.90, duration: 'Mensal' },
];

// Tradução dos tipos de entidades para exibição
const entityTypeLabels: Record<EntityType, string> = {
  evento: 'Evento',
  mensalidade: 'Mensalidade',
  dayUse: 'Day Use',
  credito: 'Crédito'
};

const EntidadesAdmin = () => {
  // Estados para os filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [partnerFilter, setPartnerFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('todos');

  // Lista de parceiros para o filtro (derivada dos dados mock)
  const partners = Array.from(new Set(mockEntities.map(entity => entity.partner)));
  
  // Filtra as entidades com base nos filtros aplicados
  const filteredEntities = mockEntities.filter(entity => {
    // Filtro por texto de pesquisa
    const matchesSearch = !searchQuery || 
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      entity.partner.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtro por parceiro
    const matchesPartner = !partnerFilter || entity.partner === partnerFilter;
    
    // Filtro por tipo
    const matchesType = !typeFilter || entity.type === typeFilter;
    
    // Filtro por status
    const matchesStatus = !statusFilter || entity.status === statusFilter;
    
    // Filtro por tab ativa
    const matchesTab = activeTab === 'todos' || entity.type === activeTab;
    
    return matchesSearch && matchesPartner && matchesType && matchesStatus && matchesTab;
  });

  // Configuração de colunas para a tabela
  const columns = [
    {
      id: 'type',
      header: 'Tipo',
      accessorKey: 'type' as keyof Entity,
      cell: (item: Entity) => entityTypeLabels[item.type],
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

  // Configuração das ações para a tabela
  const tableActions = {
    view: true,
    custom: [
      {
        label: 'Editar',
        icon: <span className="material-icons text-blue-600">edit</span>,
        onClick: (item: Entity) => console.log('Editar', item)
      },
      {
        label: 'Clonar',
        icon: <span className="material-icons text-amber-600">content_copy</span>,
        onClick: (item: Entity) => console.log('Clonar', item)
      },
      {
        label: 'Desativar',
        icon: <span className="material-icons text-red-600">block</span>,
        onClick: (item: Entity) => console.log('Desativar', item)
      }
    ]
  };

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setSearchQuery('');
    setPartnerFilter('');
    setTypeFilter('');
    setStatusFilter('');
    setActiveTab('todos');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Entidades</h1>
          <p className="text-muted-foreground">
            Gerencie todos os tipos de produtos e serviços oferecidos
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} />
          <span>Nova Entidade</span>
        </Button>
      </div>

      {/* Tabs por tipo */}
      <Tabs defaultValue="todos" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 md:w-auto w-full">
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="evento">Eventos</TabsTrigger>
          <TabsTrigger value="mensalidade">Mensalidades</TabsTrigger>
          <TabsTrigger value="dayUse">Day Use</TabsTrigger>
          <TabsTrigger value="credito">Créditos</TabsTrigger>
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

                <div className="col-span-1 md:col-span-5 flex justify-end">
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="flex items-center gap-2"
                    disabled={!searchQuery && !partnerFilter && !typeFilter && !statusFilter && activeTab === 'todos'}
                  >
                    <Filter size={16} />
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabela principal */}
          <FinanceTable
            title={`Entidades ${activeTab !== 'todos' ? '- ' + entityTypeLabels[activeTab as EntityType] : ''}`}
            columns={columns}
            data={filteredEntities}
            actions={tableActions}
            onRowClick={(entity) => console.log('Visualizar', entity)}
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
    </div>
  );
};

export default EntidadesAdmin;
