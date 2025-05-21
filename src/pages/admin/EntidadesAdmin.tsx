import React, { useState, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent } from '@/components/ui/tabs';
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

// Date utilities
const isWithinLast24Hours = (date: string) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return new Date(date) >= yesterday;
};

const isWithinCurrentMonth = (date: string) => {
  const now = new Date();
  const itemDate = new Date(date);
  return itemDate.getMonth() === now.getMonth() && 
         itemDate.getFullYear() === now.getFullYear();
};

const isWithinDateRange = (date: string, startDate?: Date, endDate?: Date) => {
  if (!startDate || !endDate) return true;
  
  const itemDate = new Date(date);
  // Set time to beginning of day for start date and end of day for end date
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate);
  end.setHours(23, 59, 59, 999);
  
  return itemDate >= start && itemDate <= end;
};

// Generate mock sales data for each entity
const generateMockSalesData = (entities: Entity[]) => {
  const currentDate = new Date();
  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  
  return entities.map(entity => {
    // Generate random sales data
    // For simplicity, sales are generated as a percentage of the entity price
    // with some variation based on entity type and creation date
    const basePrice = entity.price || 100;
    const ageFactor = (new Date().getTime() - new Date(entity.createdAt).getTime()) / (1000 * 3600 * 24);
    const typeFactor = entity.type === 'evento' ? 2.5 : 
                       entity.type === 'mensalidade' ? 1.2 : 
                       entity.type === 'dayUse' ? 0.8 : 0.5;
    
    // Sales for last 24 hours (lower for older items)
    const last24hFactor = Math.max(0.1, 1 - (ageFactor / 100));
    const salesLast24h = entity.status === 'cancelado' ? 0 : 
                         Math.round(basePrice * typeFactor * last24hFactor * Math.random() * 10) / 10;
    
    // Monthly sales (higher for subscription types)
    const monthlyFactor = entity.type === 'mensalidade' ? 20 : 
                          entity.type === 'credito' ? 5 : 
                          entity.type === 'dayUse' ? 8 : 12;
    const salesMonthly = entity.status === 'cancelado' ? salesLast24h : 
                         salesLast24h + Math.round(basePrice * typeFactor * monthlyFactor * Math.random() * 10) / 10;
    
    // Total sales (accumulated over time)
    const totalFactor = Math.max(1, ageFactor / 15) * (entity.type === 'mensalidade' ? 5 : 2);
    const salesTotal = entity.status === 'cancelado' ? salesMonthly : 
                       salesMonthly + Math.round(basePrice * typeFactor * totalFactor * Math.random() * 100) / 10;
    
    return {
      ...entity,
      salesLast24h,
      salesMonthly,
      salesTotal
    };
  });
};

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
  
  // Date filter states
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Sorting states
  const [sortField, setSortField] = useState<keyof Entity | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Hook for toasts
  const { toast } = useToast();
  
  // Apply mock sales data to entities
  const entitiesWithSalesData = useMemo(() => {
    return generateMockSalesData(mockEntities);
  }, [mockEntities]);
  
  // List of partners for the filter (derived from the mock data)
  const partners = Array.from(new Set(entitiesWithSalesData.map(entity => entity.partner)));
  
  // Date filter handlers
  const handleDateChange = (start: Date | undefined, end: Date | undefined) => {
    setStartDate(start);
    setEndDate(end);
  };
  
  const filterLast24Hours = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    setStartDate(yesterday);
    setEndDate(new Date());
  };
  
  const filterCurrentMonth = () => {
    const now = new Date();
    setStartDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setEndDate(new Date());
  };
  
  const filterAllTime = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  // Calculate statistics for the dashboard
  const stats = useMemo(() => {
    // Filter entities by date range if set
    const dateFilteredEntities = startDate && endDate
      ? entitiesWithSalesData.filter(e => isWithinDateRange(e.createdAt, startDate, endDate))
      : entitiesWithSalesData;
    
    // Calculate sales metrics
    const salesLast24h = entitiesWithSalesData
      .filter(e => isWithinLast24Hours(e.createdAt))
      .reduce((total, entity) => total + (entity.salesLast24h || 0), 0);
    
    const salesCurrentMonth = entitiesWithSalesData
      .filter(e => isWithinCurrentMonth(e.createdAt))
      .reduce((total, entity) => total + (entity.salesMonthly || 0), 0);
    
    const salesTotal = entitiesWithSalesData
      .reduce((total, entity) => total + (entity.salesTotal || 0), 0);
    
    return {
      total: dateFilteredEntities.length,
      ativo: dateFilteredEntities.filter(e => e.status === 'ativo').length,
      pendente: dateFilteredEntities.filter(e => e.status === 'pendente').length,
      cancelado: dateFilteredEntities.filter(e => e.status === 'cancelado').length,
      eventos: dateFilteredEntities.filter(e => e.type === 'evento').length,
      mensalidades: dateFilteredEntities.filter(e => e.type === 'mensalidade').length,
      dayUse: dateFilteredEntities.filter(e => e.type === 'dayUse').length,
      creditos: dateFilteredEntities.filter(e => e.type === 'credito').length,
      validationIssues: dateFilteredEntities.filter(
        e => e.type === 'credito' && (e as any).validationStatus === 'failed'
      ).length,
      salesLast24h,
      salesCurrentMonth,
      salesTotal
    };
  }, [entitiesWithSalesData, startDate, endDate]);
  
  // Handle sorting
  const handleSort = (field: keyof Entity, direction: 'asc' | 'desc') => {
    setSortField(field);
    setSortDirection(direction);
  };
  
  // Filter entities based on applied filters
  const filteredEntities = useMemo(() => {
    let filtered = entitiesWithSalesData.filter(entity => {
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
      
      // Date range filter
      const matchesDateRange = !startDate || !endDate || 
        isWithinDateRange(entity.createdAt, startDate, endDate);
      
      // Validation filter (only for credits)
      const matchesValidation = !validationFilter || validationFilter === '_all' || 
        (entity.type === 'credito' && (entity as any).validationStatus === validationFilter);
      
      // Tab filter
      const matchesTab = activeTab === 'todos' || entity.type === activeTab;
      
      return matchesSearch && 
             matchesPartner && 
             matchesType && 
             matchesStatus && 
             matchesValidation && 
             matchesTab && 
             matchesDateRange;
    });

    // Sort the filtered entities if sort field is specified
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        // Handle undefined or null values
        if (aValue === undefined || aValue === null) return sortDirection === 'asc' ? -1 : 1;
        if (bValue === undefined || bValue === null) return sortDirection === 'asc' ? 1 : -1;
        
        // Compare based on data type
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        return sortDirection === 'asc' 
          ? (aValue > bValue ? 1 : -1) 
          : (aValue > bValue ? -1 : 1);
      });
    }
    
    return filtered;
  }, [searchQuery, partnerFilter, typeFilter, statusFilter, validationFilter, activeTab, 
      startDate, endDate, entitiesWithSalesData, sortField, sortDirection]);

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
    setStartDate(undefined);
    setEndDate(undefined);
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

      {/* Make sure the entire tabs structure is wrapped in a Tabs component */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            onFilterLast24Hours={filterLast24Hours}
            onFilterCurrentMonth={filterCurrentMonth}
            onFilterAllTime={filterAllTime}
          />

          {/* Entity table with sorting */}
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
            defaultSortField="salesLast24h"
            defaultSortDirection="desc"
            onSort={handleSort}
          />
        </TabsContent>
      </Tabs>
      
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
