
import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { DateFilterPanel } from './filters/DateFilterPanel';

interface EntityFilterBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  partnerFilter: string;
  setPartnerFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  validationFilter: string;
  setValidationFilter: (value: string) => void;
  activeTab: string;
  clearFilters: () => void;
  partners: string[];
  startDate?: Date;
  endDate?: Date;
  onDateChange: (start: Date | undefined, end: Date | undefined) => void;
  onFilterLast24Hours: () => void;
  onFilterCurrentMonth: () => void;
  onFilterAllTime: () => void;
}

export const EntityFilterBar: React.FC<EntityFilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  partnerFilter,
  setPartnerFilter,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter,
  validationFilter,
  setValidationFilter,
  activeTab,
  clearFilters,
  partners,
  startDate,
  endDate,
  onDateChange,
  onFilterLast24Hours,
  onFilterCurrentMonth,
  onFilterAllTime,
}) => {
  const hasActiveFilters = searchQuery || partnerFilter !== 'todos' || typeFilter !== 'todos' || 
                          statusFilter !== 'todos' || validationFilter !== 'todos' || startDate || endDate;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Search and Quick Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou parceiro..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-4">
              <Select value={partnerFilter} onValueChange={setPartnerFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Parceiro" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os parceiros</SelectItem>
                  {partners.filter(partner => partner && partner.trim() !== '').map(partner => (
                    <SelectItem key={partner} value={partner}>{partner}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
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
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>

              {/* Validation filter - only visible for credits tab */}
              {(activeTab === 'credito' || activeTab === 'todos') && (
                <Select value={validationFilter} onValueChange={setValidationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Validação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="validated">Validados</SelectItem>
                    <SelectItem value="pending">Pendentes</SelectItem>
                    <SelectItem value="failed">Com falha</SelectItem>
                  </SelectContent>
                </Select>
              )}

              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="hidden sm:inline">Limpar</span>
              </Button>
            </div>
          </div>

          {/* Date Filters */}
          <DateFilterPanel
            startDate={startDate}
            endDate={endDate}
            onDateChange={onDateChange}
            onFilterLast24Hours={onFilterLast24Hours}
            onFilterCurrentMonth={onFilterCurrentMonth}
            onFilterAllTime={onFilterAllTime}
          />

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Filtros ativos - {hasActiveFilters ? 'clique em "Limpar" para remover' : 'nenhum filtro aplicado'}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
