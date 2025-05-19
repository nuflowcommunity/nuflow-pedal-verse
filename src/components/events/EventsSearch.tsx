
import React, { useState } from 'react';
import { Search, Download, Filter } from 'lucide-react';
import { DateRange } from "react-day-picker";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import DateRangeFilter from './DateRangeFilter';
import EventsSortFilter from './EventsSortFilter';

interface EventsSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange | undefined) => void;
  onFilterByDate: () => void;
  onClearDateFilter: () => void;
  onSortChange: (value: string) => void;
  onExport?: (format: 'csv' | 'xls') => void;
}

const EventsSearch = ({ 
  searchQuery, 
  setSearchQuery, 
  dateRange, 
  setDateRange, 
  onFilterByDate, 
  onClearDateFilter,
  onSortChange,
  onExport
}: EventsSearchProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  return (
    <section className="py-6 bg-white border-b border-nuflow-mineral/20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <Tabs defaultValue="grid" className="w-full md:w-auto">
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grid">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                <span className="hidden sm:inline">Grid</span>
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
                <span className="hidden sm:inline">Lista</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map">
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" x2="9" y1="3" y2="18" />
                  <line x1="15" x2="15" y1="6" y2="21" />
                </svg>
                <span className="hidden sm:inline">Mapa</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2 ml-auto">
            {onExport && (
              <>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-nuflow-mineral/30"
                  onClick={() => onExport('csv')}
                >
                  <Download size={18} />
                  CSV
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 border-nuflow-mineral/30"
                  onClick={() => onExport('xls')}
                >
                  <Download size={18} />
                  XLS
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-3 w-full">
          <div className="relative w-full md:w-auto flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nuflow-charcoal/50" size={20} />
            <Input 
              type="text" 
              placeholder="Buscar rolês..." 
              className="pl-10 pr-4 py-6 w-full border border-nuflow-mineral/30 focus:ring-2 focus:ring-nuflow-neon focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-nuflow-moss text-white hover:bg-nuflow-moss/90"
            >
              Pesquisar
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <EventsSortFilter 
              onSortChange={onSortChange} 
              showFilterButton={true}
              onFilterClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            />
            <DateRangeFilter
              dateRange={dateRange}
              setDateRange={setDateRange}
              onFilterByDate={onFilterByDate}
              onClearDateFilter={onClearDateFilter}
            />
          </div>
        </div>

        {showAdvancedFilters && (
          <div className="mt-4 p-4 bg-nuflow-sand rounded-md border border-nuflow-mineral/20">
            <h3 className="text-lg font-medium mb-3">Filtros avançados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-nuflow-charcoal/70 mb-1 block">Status</label>
                <select className="w-full px-3 py-2 border border-nuflow-mineral/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-nuflow-moss">
                  <option value="">Todos</option>
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-nuflow-charcoal/70 mb-1 block">Localização</label>
                <select className="w-full px-3 py-2 border border-nuflow-mineral/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-nuflow-moss">
                  <option value="">Todas</option>
                  <option value="sp">São Paulo</option>
                  <option value="rj">Rio de Janeiro</option>
                  <option value="mg">Minas Gerais</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-nuflow-charcoal/70 mb-1 block">Tipo</label>
                <select className="w-full px-3 py-2 border border-nuflow-mineral/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-nuflow-moss">
                  <option value="">Todos</option>
                  <option value="mtb">MTB</option>
                  <option value="speed">Speed</option>
                  <option value="gravel">Gravel</option>
                  <option value="urban">Urbano</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="mr-2"
                onClick={() => setShowAdvancedFilters(false)}
              >
                Cancelar
              </Button>
              <Button className="bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss">
                Aplicar filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSearch;
