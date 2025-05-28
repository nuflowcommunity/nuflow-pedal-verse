
import React, { useState } from 'react';
import { Search, Filter, Calendar, X, RotateCcw, ChevronDown, Save, BookmarkPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface AdvancedFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  totalResults: number;
  filteredResults: number;
}

interface SavedFilter {
  id: string;
  name: string;
  filters: any;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  totalResults,
  filteredResults
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [newFilterName, setNewFilterName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  const hasActiveFilters = Object.values(filters).some(value => value);

  const eventTypes = [
    { value: 'Corrida', label: 'Corrida' },
    { value: 'Ciclismo', label: 'Ciclismo' },
    { value: 'Natação', label: 'Natação' },
    { value: 'Triathlon', label: 'Triathlon' },
    { value: 'Caminhada', label: 'Caminhada' },
    { value: 'Trail', label: 'Trail' },
    { value: 'MTB', label: 'MTB' },
    { value: 'Speed', label: 'Speed' },
    { value: 'Gravel', label: 'Gravel' },
    { value: 'Urbano', label: 'Urbano' },
    { value: 'Outros', label: 'Outros' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pendente', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'approved', label: 'Aprovado', color: 'bg-green-100 text-green-800' },
    { value: 'rejected', label: 'Rejeitado', color: 'bg-red-100 text-red-800' },
    { value: 'active', label: 'Ativo', color: 'bg-blue-100 text-blue-800' },
    { value: 'cancelled', label: 'Cancelado', color: 'bg-gray-100 text-gray-800' },
    { value: 'completed', label: 'Concluído', color: 'bg-purple-100 text-purple-800' },
    { value: 'draft', label: 'Rascunho', color: 'bg-gray-100 text-gray-600' }
  ];

  const priceRanges = [
    { value: 'free', label: 'Gratuito', min: 0, max: 0 },
    { value: 'low', label: 'Até R$ 50', min: 0.01, max: 50 },
    { value: 'medium', label: 'R$ 50 - R$ 200', min: 50, max: 200 },
    { value: 'high', label: 'R$ 200 - R$ 500', min: 200, max: 500 },
    { value: 'premium', label: 'Acima de R$ 500', min: 500, max: null }
  ];

  const participantRanges = [
    { value: 'small', label: 'Até 50 pessoas', max: 50 },
    { value: 'medium', label: '50 - 200 pessoas', min: 50, max: 200 },
    { value: 'large', label: '200 - 1000 pessoas', min: 200, max: 1000 },
    { value: 'mega', label: 'Mais de 1000 pessoas', min: 1000 }
  ];

  const quickDateFilters = [
    { value: 'today', label: 'Hoje' },
    { value: 'tomorrow', label: 'Amanhã' },
    { value: 'week', label: 'Esta semana' },
    { value: 'month', label: 'Este mês' },
    { value: 'quarter', label: 'Este trimestre' },
    { value: 'year', label: 'Este ano' }
  ];

  const handleSaveFilter = () => {
    if (!newFilterName.trim()) return;

    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: newFilterName.trim(),
      filters: { ...filters }
    };

    setSavedFilters([...savedFilters, newFilter]);
    setNewFilterName('');
    setShowSaveDialog(false);
  };

  const handleLoadFilter = (savedFilter: SavedFilter) => {
    onFilterChange(savedFilter.filters);
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({ status: value === 'all' ? undefined : value });
  };

  const handleEventTypeChange = (value: string) => {
    onFilterChange({ event_type: value === 'all' ? undefined : value });
  };

  const handleQuickDateChange = (value: string) => {
    const today = new Date();
    let date_from: string | undefined;
    let date_to: string | undefined;

    switch (value) {
      case 'today':
        date_from = date_to = today.toISOString().split('T')[0];
        break;
      case 'tomorrow':
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        date_from = date_to = tomorrow.toISOString().split('T')[0];
        break;
      case 'week':
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        date_from = weekStart.toISOString().split('T')[0];
        date_to = weekEnd.toISOString().split('T')[0];
        break;
      // Adicionar mais casos conforme necessário
    }

    onFilterChange({ date_from, date_to });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros Avançados
          </CardTitle>
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Busca principal */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar eventos por nome, descrição, local ou organizador..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Filtros básicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select value={filters.status || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
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

          <Select value={filters.event_type || 'all'} onValueChange={handleEventTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              {eventTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.quick_date || 'all'} onValueChange={handleQuickDateChange}>
            <SelectTrigger>
              <SelectValue placeholder="Data rápida" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as datas</SelectItem>
              {quickDateFilters.map((date) => (
                <SelectItem key={date.value} value={date.value}>
                  {date.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClearFilters}
              disabled={!hasActiveFilters}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Limpar
            </Button>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={() => setShowSaveDialog(true)}
                className="flex items-center gap-2"
              >
                <BookmarkPlus className="h-4 w-4" />
                Salvar
              </Button>
            )}
          </div>
        </div>

        {/* Filtros salvos */}
        {savedFilters.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Filtros Salvos</Label>
            <div className="flex flex-wrap gap-2">
              {savedFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleLoadFilter(filter)}
                  className="h-8"
                >
                  {filter.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleContent className="space-y-6 pt-4 border-t">
            {/* Datas personalizadas */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Período Personalizado</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date_from" className="text-xs text-gray-600">Data inicial</Label>
                  <Input
                    id="date_from"
                    type="date"
                    value={filters.date_from || ''}
                    onChange={(e) => onFilterChange({ date_from: e.target.value || undefined })}
                  />
                </div>
                <div>
                  <Label htmlFor="date_to" className="text-xs text-gray-600">Data final</Label>
                  <Input
                    id="date_to"
                    type="date"
                    value={filters.date_to || ''}
                    onChange={(e) => onFilterChange({ date_to: e.target.value || undefined })}
                  />
                </div>
              </div>
            </div>

            {/* Faixa de preço */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Faixa de Preço</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {priceRanges.map((range) => (
                  <div key={range.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`price_${range.value}`}
                      checked={filters.price_ranges?.includes(range.value) || false}
                      onCheckedChange={(checked) => {
                        const current = filters.price_ranges || [];
                        const updated = checked
                          ? [...current, range.value]
                          : current.filter((r: string) => r !== range.value);
                        onFilterChange({ price_ranges: updated.length > 0 ? updated : undefined });
                      }}
                    />
                    <Label htmlFor={`price_${range.value}`} className="text-sm">
                      {range.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Número de participantes */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Número de Participantes</Label>
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                {participantRanges.map((range) => (
                  <div key={range.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`participants_${range.value}`}
                      checked={filters.participant_ranges?.includes(range.value) || false}
                      onCheckedChange={(checked) => {
                        const current = filters.participant_ranges || [];
                        const updated = checked
                          ? [...current, range.value]
                          : current.filter((r: string) => r !== range.value);
                        onFilterChange({ participant_ranges: updated.length > 0 ? updated : undefined });
                      }}
                    />
                    <Label htmlFor={`participants_${range.value}`} className="text-sm">
                      {range.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Organizador */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Organizador</Label>
              <Input
                placeholder="Nome do organizador..."
                value={filters.organizer || ''}
                onChange={(e) => onFilterChange({ organizer: e.target.value || undefined })}
              />
            </div>

            {/* Características do evento */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Características</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_requirements"
                    checked={filters.has_requirements || false}
                    onCheckedChange={(checked) => onFilterChange({ has_requirements: checked || undefined })}
                  />
                  <Label htmlFor="has_requirements" className="text-sm">
                    Com requisitos
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="has_custom_questions"
                    checked={filters.has_custom_questions || false}
                    onCheckedChange={(checked) => onFilterChange({ has_custom_questions: checked || undefined })}
                  />
                  <Label htmlFor="has_custom_questions" className="text-sm">
                    Com perguntas customizadas
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allow_installments"
                    checked={filters.allow_installments || false}
                    onCheckedChange={(checked) => onFilterChange({ allow_installments: checked || undefined })}
                  />
                  <Label htmlFor="allow_installments" className="text-sm">
                    Permite parcelamento
                  </Label>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Dialog para salvar filtro */}
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Salvar Filtro</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="filter_name">Nome do filtro</Label>
                  <Input
                    id="filter_name"
                    value={newFilterName}
                    onChange={(e) => setNewFilterName(e.target.value)}
                    placeholder="Ex: Eventos de corrida aprovados"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSaveFilter} disabled={!newFilterName.trim()}>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filtros ativos e resultados */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
          <div className="flex flex-wrap items-center gap-2">
            {hasActiveFilters && (
              <>
                <span className="text-sm text-gray-600">Filtros ativos:</span>
                {Object.entries(filters).map(([key, value]) => {
                  if (!value) return null;
                  let label = '';
                  
                  switch (key) {
                    case 'status':
                      label = `Status: ${statusOptions.find(s => s.value === value)?.label}`;
                      break;
                    case 'event_type':
                      label = `Categoria: ${eventTypes.find(t => t.value === value)?.label}`;
                      break;
                    case 'search':
                      label = `Busca: "${value}"`;
                      break;
                    case 'date_from':
                      label = `De: ${new Date(value as string).toLocaleDateString('pt-BR')}`;
                      break;
                    case 'date_to':
                      label = `Até: ${new Date(value as string).toLocaleDateString('pt-BR')}`;
                      break;
                    default:
                      return null;
                  }

                  return (
                    <Badge key={key} variant="secondary" className="flex items-center gap-1">
                      {label}
                      <X 
                        className="h-3 w-3 cursor-pointer hover:text-red-500" 
                        onClick={() => onFilterChange({ [key]: undefined })}
                      />
                    </Badge>
                  );
                })}
              </>
            )}
          </div>

          <div className="text-sm text-gray-600 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Mostrando {filteredResults} de {totalResults} eventos
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
