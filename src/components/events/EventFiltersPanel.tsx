
import React, { useState } from 'react';
import { Search, Filter, X, MapPin, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

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
    <Card className="bg-white shadow-sm border border-gray-100 mb-8">
      <CardContent className="p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder="Buscar eventos por nome, local ou organizador..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-12 pr-4 py-4 text-base border-gray-200 focus:border-trailflow-green focus:ring-trailflow-green/20 rounded-xl"
          />
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Cidade
            </label>
            <Select value={selectedCity} onValueChange={onCityChange}>
              <SelectTrigger className="border-gray-200 focus:border-trailflow-green">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Categoria
            </label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="border-gray-200 focus:border-trailflow-green">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Preço
            </label>
            <Select value={selectedPriceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger className="border-gray-200 focus:border-trailflow-green">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {priceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
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
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              {isExpanded ? 'Menos Filtros' : 'Mais Filtros'}
            </Button>
          </div>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="border-t border-gray-100 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Nível de Dificuldade
                </label>
                <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
                  <SelectTrigger className="border-gray-200 focus:border-trailflow-green">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty.value} value={difficulty.value}>
                        {difficulty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Distância
                </label>
                <Select value={selectedDistance} onValueChange={onDistanceChange}>
                  <SelectTrigger className="border-gray-200 focus:border-trailflow-green">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {distances.map((distance) => (
                      <SelectItem key={distance.value} value={distance.value}>
                        {distance.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-700">Filtros ativos:</span>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter.key}
                  variant="secondary"
                  className="flex items-center gap-1 bg-trailflow-green/10 text-trailflow-green hover:bg-trailflow-green/20"
                >
                  {filter.label}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-red-500"
                    onClick={() => onClearFilter(filter.key)}
                  />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAllFilters}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                Limpar todos
              </Button>
            </div>
          </>
        )}

        {/* Results Count */}
        <div className="text-sm text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
          {isLoading ? (
            <span>Carregando eventos...</span>
          ) : (
            <span>
              {resultsCount} evento{resultsCount !== 1 ? 's' : ''} encontrado{resultsCount !== 1 ? 's' : ''}
              {activeFilters.length > 0 && ' com os filtros aplicados'}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
