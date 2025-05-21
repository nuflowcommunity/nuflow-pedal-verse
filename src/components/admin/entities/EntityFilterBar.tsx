
import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { EntityType } from './types';
import { DateRangeFilter } from '@/components/admin/finance/FinanceFilters';

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
  // New date filter props
  startDate: Date | undefined;
  endDate: Date | undefined;
  onDateChange: (start: Date | undefined, end: Date | undefined) => void;
  // Quick filter handlers
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
  // New date filter props
  startDate,
  endDate,
  onDateChange,
  // Quick filter handlers
  onFilterLast24Hours,
  onFilterCurrentMonth,
  onFilterAllTime,
}) => {
  const filtersApplied = !!searchQuery || !!partnerFilter || !!typeFilter || !!statusFilter || !!validationFilter || activeTab !== 'todos' || !!startDate;
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filtros</CardTitle>
        <CardDescription>Refine os resultados utilizando os filtros abaixo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Date filter row */}
          <div className="flex flex-wrap gap-2">
            <DateRangeFilter 
              startDate={startDate} 
              endDate={endDate} 
              onDateChange={onDateChange} 
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={onFilterLast24Hours}
              className="h-10"
            >
              Últimas 24h
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onFilterCurrentMonth}
              className="h-10"
            >
              Mês Atual
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onFilterAllTime}
              className="h-10"
            >
              Todo Período
            </Button>
          </div>
          
          {/* Original filters */}
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
          </div>
          
          {/* Validation filter row */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Filtro adicional para validação, visível apenas na aba de Créditos */}
            {(activeTab === 'credito' || activeTab === 'todos') && (
              <div className={activeTab === 'todos' ? "col-span-1 md:col-span-4" : "col-span-1 md:col-span-4"}>
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

            <div className={activeTab === 'credito' ? "col-span-1" : "col-span-1"}>
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="flex items-center gap-2"
                  disabled={!filtersApplied}
                >
                  <Filter size={16} />
                  Limpar Filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
