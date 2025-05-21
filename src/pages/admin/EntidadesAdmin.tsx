
import React, { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TabsContent } from '@/components/ui/tabs';
import { Package2 } from 'lucide-react';
import { FinanceTable } from '@/components/admin/finance/FinanceTable';

// Import refactored components
import { EntityHeader } from '@/components/admin/entities/EntityHeader';
import { EntityStats } from '@/components/admin/entities/EntityStats';
import { EntityTypesTabs } from '@/components/admin/entities/EntityTypesTabs';
import { EntityFilterBar } from '@/components/admin/entities/EntityFilterBar';
import { EntityDetailDrawer } from '@/components/admin/entities/EntityDetailDrawer';
import { EntityPagination } from '@/components/admin/entities/EntityPagination';
import { EntityEmptyState } from '@/components/admin/entities/EntityEmptyState';
import { getTypeSpecificColumns } from '@/components/admin/entities/EntityColumns';
import { getTypeSpecificActions } from '@/components/admin/entities/EntityActions';
import { entityTypeLabels } from '@/components/admin/entities/types';

// Import mock data and type definitions
import { mockEntities } from '@/components/admin/entities/mockData';
import { Entity } from '@/components/admin/entities/types';

const EntidadesAdmin = () => {
  // States for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [partnerFilter, setPartnerFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [validationFilter, setValidationFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Hook for toasts
  const { toast } = useToast();
  
  // List of partners for the filter (derived from the mock data)
  const partners = Array.from(new Set(mockEntities.map(entity => entity.partner)));
  
  // Calculate statistics for the dashboard
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
      validationIssues: mockEntities.filter(
        e => e.type === 'credito' && (e as any).validationStatus === 'failed'
      ).length
    };
  }, [mockEntities]);
  
  // Filter entities based on applied filters
  const filteredEntities = useMemo(() => {
    return mockEntities.filter(entity => {
      // Text search filter
      const matchesSearch = !searchQuery || 
        entity.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        entity.partner.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Partner filter
      const matchesPartner = !partnerFilter || partnerFilter === '_all' || entity.partner === partnerFilter;
      
      // Type filter
      const matchesType = !typeFilter || typeFilter === '_all' || entity.type === typeFilter;
      
      // Status filter
      const matchesStatus = !statusFilter || statusFilter === '_all' || entity.status === statusFilter;
      
      // Validation filter (only for credits)
      const matchesValidation = !validationFilter || validationFilter === '_all' || 
        (entity.type === 'credito' && (entity as any).validationStatus === validationFilter);
      
      // Tab filter
      const matchesTab = activeTab === 'todos' || entity.type === activeTab;
      
      return matchesSearch && matchesPartner && matchesType && matchesStatus && matchesValidation && matchesTab;
    });
  }, [searchQuery, partnerFilter, typeFilter, statusFilter, validationFilter, activeTab]);

  // Get columns for the current entity type
  const typeSpecificColumns = useMemo(() => getTypeSpecificColumns(activeTab), [activeTab]);
  
  // Actions configuration for the table
  const tableActions = (item: Entity) => ({
    view: true,
    custom: getTypeSpecificActions(item, toast)
  });
  
  // Handlers for various actions
  const handleViewEntity = (entity: Entity) => {
    setSelectedEntity(entity);
    setIsDetailOpen(true);
  };

  const handleNewEntity = (type: string) => {
    toast({
      title: `Nova ${entityTypeLabels[type as keyof typeof entityTypeLabels]}`,
      description: `Criando uma nova ${entityTypeLabels[type as keyof typeof entityTypeLabels].toLowerCase()}`,
    });
  };

  const handleEditEntity = (entity: Entity) => {
    toast({
      title: "Editar entidade",
      description: `Editando ${entityTypeLabels[entity.type]}: ${entity.name}`,
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPartnerFilter('');
    setTypeFilter('');
    setStatusFilter('');
    setValidationFilter('');
    setActiveTab('todos');
  };

  const handleViewIssues = () => {
    setActiveTab('credito');
    setValidationFilter('failed');
  };

  return (
    <div className="space-y-6">
      {/* Header with page title and add entity dropdown */}
      <EntityHeader onNewEntity={handleNewEntity} />

      {/* Summary statistics cards */}
      <EntityStats stats={stats} onViewIssues={handleViewIssues} />

      {/* Entity type tabs */}
      <EntityTypesTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab content with filters and entity table */}
      <TabsContent value={activeTab} className="mt-6">
        {/* Filter bar */}
        <EntityFilterBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          partnerFilter={partnerFilter}
          setPartnerFilter={setPartnerFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          validationFilter={validationFilter}
          setValidationFilter={setValidationFilter}
          activeTab={activeTab}
          clearFilters={clearFilters}
          partners={partners}
        />

        {/* Entity table */}
        <FinanceTable
          title={`Entidades ${activeTab !== 'todos' ? '- ' + entityTypeLabels[activeTab as keyof typeof entityTypeLabels] : ''}`}
          columns={typeSpecificColumns}
          data={filteredEntities}
          actions={tableActions}
          onRowClick={handleViewEntity}
          pagination={
            <EntityPagination 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
              totalPages={3} 
            />
          }
          emptyState={<EntityEmptyState />}
        />
      </TabsContent>
      
      {/* Entity detail drawer */}
      <EntityDetailDrawer 
        isOpen={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
        entity={selectedEntity}
        onEditEntity={handleEditEntity}
        toast={toast}
      />
    </div>
  );
};

export default EntidadesAdmin;
