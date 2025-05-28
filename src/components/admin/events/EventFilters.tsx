
import React from 'react';
import { Search, Filter, Calendar, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EventFiltersProps {
  filters: {
    status?: string;
    search?: string;
    partner?: string;
    event_type?: string;
    date_from?: string;
    date_to?: string;
  };
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  totalResults: number;
  filteredResults: number;
}

const EventFilters: React.FC<EventFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalResults,
  filteredResults
}) => {
  const hasActiveFilters = Object.values(filters).some(value => value);

  const eventTypes = [
    { value: 'evento', label: 'Evento' },
    { value: 'aula', label: 'Aula' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'competicao', label: 'Competição' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'approved', label: 'Aprovado', color: 'bg-green-100 text-green-800' },
    { value: 'rejected', label: 'Rejeitado', color: 'bg-red-100 text-red-800' },
    { value: 'active', label: 'Ativo', color: 'bg-blue-100 text-blue-800' },
    { value: 'cancelled', label: 'Cancelado', color: 'bg-gray-100 text-gray-800' },
    { value: 'completed', label: 'Concluído', color: 'bg-purple-100 text-purple-800' }
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Busca principal */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar eventos por nome, descrição ou local..."
              value={filters.search || ''}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              className="pl-10"
            />
          </div>

          {/* Filtros em linha */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              value={filters.status || ''}
              onValueChange={(value) => onFilterChange({ status: value || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os status</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${status.color.split(' ')[0]}`} />
                      {status.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.event_type || ''}
              onValueChange={(value) => onFilterChange({ event_type: value || undefined })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos os tipos</SelectItem>
                {eventTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="date"
              placeholder="Data inicial"
              value={filters.date_from || ''}
              onChange={(e) => onFilterChange({ date_from: e.target.value })}
            />

            <Input
              type="date"
              placeholder="Data final"
              value={filters.date_to || ''}
              onChange={(e) => onFilterChange({ date_to: e.target.value })}
            />
          </div>

          {/* Filtros ativos e resultados */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {hasActiveFilters && (
                <>
                  <span className="text-sm text-gray-600">Filtros ativos:</span>
                  {filters.status && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Status: {statusOptions.find(s => s.value === filters.status)?.label}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => onFilterChange({ status: undefined })}
                      />
                    </Badge>
                  )}
                  {filters.event_type && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Tipo: {eventTypes.find(t => t.value === filters.event_type)?.label}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => onFilterChange({ event_type: undefined })}
                      />
                    </Badge>
                  )}
                  {filters.date_from && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      De: {new Date(filters.date_from).toLocaleDateString('pt-BR')}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => onFilterChange({ date_from: undefined })}
                      />
                    </Badge>
                  )}
                  {filters.date_to && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Até: {new Date(filters.date_to).toLocaleDateString('pt-BR')}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => onFilterChange({ date_to: undefined })}
                      />
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-red-600 hover:text-red-700"
                  >
                    Limpar filtros
                  </Button>
                </>
              )}
            </div>

            <div className="text-sm text-gray-600">
              Mostrando {filteredResults} de {totalResults} eventos
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventFilters;
