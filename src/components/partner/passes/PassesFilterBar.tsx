
import React from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { PassesFilters } from '@/types/passes';

interface PassesFilterBarProps {
  filters: PassesFilters;
  onFiltersChange: (filters: PassesFilters) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  partners: string[];
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
  onClearFilters: () => void;
}

export const PassesFilterBar: React.FC<PassesFilterBarProps> = ({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange,
  partners,
  sortBy,
  sortDirection,
  onSortChange,
  onClearFilters
}) => {
  const passTypes = [
    { value: 'day_use', label: 'Day Use' },
    { value: 'mensalista', label: 'Mensalista' },
    { value: 'evento', label: 'Evento' },
    { value: 'credito', label: 'Crédito' }
  ];

  const statusOptions = [
    { value: 'futuro', label: 'Futuro' },
    { value: 'usado', label: 'Usado' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  const sortOptions = [
    { value: 'validDate-asc', label: 'Data (Mais próximo)' },
    { value: 'validDate-desc', label: 'Data (Mais antigo)' },
    { value: 'participantName-asc', label: 'Nome (A-Z)' },
    { value: 'participantName-desc', label: 'Nome (Z-A)' },
    { value: 'status-asc', label: 'Status (Usado primeiro)' },
    { value: 'status-desc', label: 'Status (Futuro primeiro)' }
  ];

  const hasActiveFilters = 
    filters.type || filters.partner || filters.status || 
    filters.startDate || filters.endDate || searchQuery;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter size={20} />
          Filtros e Busca
        </CardTitle>
        <CardDescription>
          Refine a visualização dos passes usando os filtros abaixo
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Buscar por nome, email ou parceiro..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Tipo de Passe</label>
            <Select 
              value={filters.type || 'todos'} 
              onValueChange={(value) => onFiltersChange({
                ...filters,
                type: value === 'todos' ? '' : value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os tipos</SelectItem>
                {passTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Parceiro</label>
            <Select 
              value={filters.partner || 'todos'} 
              onValueChange={(value) => onFiltersChange({
                ...filters,
                partner: value === 'todos' ? '' : value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os parceiros" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os parceiros</SelectItem>
                {partners.map((partner) => (
                  <SelectItem key={partner} value={partner}>
                    {partner}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
            <Select 
              value={filters.status || 'todos'} 
              onValueChange={(value) => onFiltersChange({
                ...filters,
                status: value === 'todos' ? '' : value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos os status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Ordenação</label>
            <Select 
              value={`${sortBy}-${sortDirection}`} 
              onValueChange={(value) => {
                const [field, direction] = value.split('-');
                onSortChange(field, direction as 'asc' | 'desc');
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtros de data */}
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Data Início</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-auto justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {filters.startDate ? format(filters.startDate, 'dd/MM/yyyy') : 'Selecionar'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={filters.startDate}
                  onSelect={(date) => onFiltersChange({ ...filters, startDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Data Fim</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-auto justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {filters.endDate ? format(filters.endDate, 'dd/MM/yyyy') : 'Selecionar'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={filters.endDate}
                  onSelect={(date) => onFiltersChange({ ...filters, endDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {hasActiveFilters && (
            <Button variant="outline" onClick={onClearFilters}>
              Limpar Filtros
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
