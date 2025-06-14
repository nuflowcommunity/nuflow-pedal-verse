
import React, { useState } from 'react';
import { Search, Filter, X, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface EventFiltersPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (range: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  selectedDistance: string;
  onDistanceChange: (distance: string) => void;
  activeFilters: Array<{ key: string; value: string; label: string }>;
  onClearFilter: (key: string) => void;
  onClearAllFilters: () => void;
  resultsCount: number;
  isLoading?: boolean;
}

const categories = [
  { value: 'all', label: 'Todas as categorias' },
  { value: 'MTB', label: 'Mountain Bike' },
  { value: 'Speed', label: 'Speed/Road' },
  { value: 'Gravel', label: 'Gravel' },
  { value: 'Urbano', label: 'Ciclismo Urbano' },
  { value: 'Outro', label: 'Outros' }
];

const priceRanges = [
  { value: 'all', label: 'Todos os preços' },
  { value: 'free', label: 'Gratuito' },
  { value: '0-50', label: 'Até R$ 50' },
  { value: '50-100', label: 'R$ 50 - R$ 100' },
  { value: '100-200', label: 'R$ 100 - R$ 200' },
  { value: '200+', label: 'Acima de R$ 200' }
];

const difficulties = [
  { value: 'all', label: 'Todos os níveis' },
  { value: 'iniciante', label: 'Iniciante' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado', label: 'Avançado' },
  { value: 'profissional', label: 'Profissional' }
];

const distances = [
  { value: 'all', label: 'Todas as distâncias' },
  { value: '0-10', label: 'Até 10km' },
  { value: '10-25', label: '10km - 25km' },
  { value: '25-50', label: '25km - 50km' },
  { value: '50-100', label: '50km - 100km' },
  { value: '100+', label: 'Acima de 100km' }
];

const cities = [
  'Todas as cidades',
  'São Paulo',
  'Rio de Janeiro',
  'Belo Horizonte',
  'Brasília',
  'Curitiba',
  'Porto Alegre',
  'Salvador',
  'Recife',
  'Fortaleza'
];

export const EventFiltersPanel: React.FC<EventFiltersPanelProps> = ({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  selectedCategory,
  onCategoryChange,
  selectedPriceRange,
  onPriceRangeChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedDistance,
  onDistanceChange,
  activeFilters,
  onClearFilter,
  onClearAllFilters,
  resultsCount,
  isLoading = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-trailflow-white border border-trailflow-light/20 overflow-hidden">
      {/* Search Section - Improved Responsive Design */}
      <div className="p-6 sm:p-8 border-b border-trailflow-light/10">
        <div className="text-center mb-6">
          <h4 className="polymer-heading text-lg sm:text-xl text-trailflow-dark mb-2 tracking-wider font-light uppercase">
            Buscar
          </h4>
          <p className="polymer-body text-sm sm:text-base text-trailflow-medium">
            Digite palavras-chave para encontrar eventos específicos
          </p>
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-trailflow-medium h-5 w-5" />
          <Input
            type="text"
            placeholder="Nome do evento, organizador ou localização..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-4 py-4 text-base border-trailflow-light/30 focus:border-trailflow-green focus:ring-trailflow-green/20 rounded-none bg-trailflow-white polymer-body w-full"
          />
        </div>
      </div>

      {/* Quick Filters - Improved Grid Layout */}
      <div className="p-6 sm:p-8 border-b border-trailflow-light/10">
        <div className="text-center mb-6">
          <h4 className="polymer-heading text-lg sm:text-xl text-trailflow-dark mb-2 tracking-wider font-light uppercase">
            Filtros Principais
          </h4>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="space-y-3">
            <label className="polymer-specs text-trailflow-medium uppercase tracking-wider flex items-center justify-center gap-2 text-xs sm:text-sm">
              <MapPin className="h-4 w-4" />
              Cidade
            </label>
            <Select value={selectedCity} onValueChange={onCityChange}>
              <SelectTrigger className="border-trailflow-light/30 focus:border-trailflow-green rounded-none polymer-body w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-trailflow-white border border-trailflow-light/30 shadow-xl z-50">
                {cities.map((city) => (
                  <SelectItem key={city} value={city} className="polymer-body">
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="polymer-specs text-trailflow-medium uppercase tracking-wider text-center block text-xs sm:text-sm">
              Categoria
            </label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="border-trailflow-light/30 focus:border-trailflow-green rounded-none polymer-body w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-trailflow-white border border-trailflow-light/30 shadow-xl z-50">
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value} className="polymer-body">
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <label className="polymer-specs text-trailflow-medium uppercase tracking-wider flex items-center justify-center gap-2 text-xs sm:text-sm">
              <DollarSign className="h-4 w-4" />
              Preço
            </label>
            <Select value={selectedPriceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger className="border-trailflow-light/30 focus:border-trailflow-green rounded-none polymer-body w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-trailflow-white border border-trailflow-light/30 shadow-xl z-50">
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value} className="polymer-body">
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button
              variant={isExpanded ? "default" : "outline"}
              onClick={() => setIsExpanded(!isExpanded)}
              className="polymer-btn w-full rounded-none border-trailflow-green text-trailflow-green hover:bg-trailflow-green hover:text-white font-light tracking-wider uppercase text-xs sm:text-sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              {isExpanded ? 'Menos Filtros' : 'Mais Filtros'}
            </Button>
          </div>
        </div>
      </div>

      {/* Advanced Filters - Better Responsive Layout */}
      {isExpanded && (
        <div className="p-6 sm:p-8 border-b border-trailflow-light/10 bg-trailflow-accent/30">
          <div className="text-center mb-6">
            <h4 className="polymer-heading text-lg sm:text-xl text-trailflow-dark mb-2 tracking-wider font-light uppercase">
              Filtros Avançados
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-3">
              <label className="polymer-specs text-trailflow-medium uppercase tracking-wider text-center block text-xs sm:text-sm">
                Nível de Dificuldade
              </label>
              <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
                <SelectTrigger className="border-trailflow-light/30 focus:border-trailflow-green rounded-none polymer-body w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-trailflow-white border border-trailflow-light/30 shadow-xl z-50">
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty.value} value={difficulty.value} className="polymer-body">
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="polymer-specs text-trailflow-medium uppercase tracking-wider text-center block text-xs sm:text-sm">
                Distância
              </label>
              <Select value={selectedDistance} onValueChange={onDistanceChange}>
                <SelectTrigger className="border-trailflow-light/30 focus:border-trailflow-green rounded-none polymer-body w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-trailflow-white border border-trailflow-light/30 shadow-xl z-50">
                  {distances.map((distance) => (
                    <SelectItem key={distance.value} value={distance.value} className="polymer-body">
                      {distance.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters - Improved Layout */}
      {activeFilters.length > 0 && (
        <div className="p-6 sm:p-8 border-b border-trailflow-light/10">
          <div className="text-center mb-4">
            <h4 className="polymer-specs text-trailflow-medium uppercase tracking-wider mb-3 text-xs sm:text-sm">
              Filtros Ativos
            </h4>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            {activeFilters.map((filter) => (
              <Badge
                key={filter.key}
                variant="secondary"
                className="flex items-center gap-2 bg-trailflow-green/10 text-trailflow-green hover:bg-trailflow-green/20 border-0 polymer-body px-3 py-1"
              >
                {filter.label}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-red-500 polymer-interactive"
                  onClick={() => onClearFilter(filter.key)}
                />
              </Badge>
            ))}
          </div>
          
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={onClearAllFilters}
              className="polymer-btn text-red-600 hover:text-red-800 hover:bg-red-50 rounded-none font-light tracking-wider uppercase text-xs sm:text-sm"
            >
              Limpar todos os filtros
            </Button>
          </div>
        </div>
      )}

      {/* Results Count - Centered */}
      <div className="p-6 sm:p-8 text-center">
        <div className="polymer-specs text-trailflow-medium uppercase tracking-wider text-xs sm:text-sm">
          {isLoading ? (
            <span>Carregando eventos...</span>
          ) : (
            <span>
              {resultsCount} evento{resultsCount !== 1 ? 's' : ''} encontrado{resultsCount !== 1 ? 's' : ''}
              {activeFilters.length > 0 && ' com os filtros aplicados'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
