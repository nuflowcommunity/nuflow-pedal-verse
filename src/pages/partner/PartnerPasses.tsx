
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileDown, TrendingUp, TrendingDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePassesData } from '@/hooks/usePassesData';
import { PassesFilterBar } from '@/components/partner/passes/PassesFilterBar';
import { PassesList } from '@/components/partner/passes/PassesList';
import { ExportButtons } from '@/components/export/ExportButtons';

export const PartnerPasses: React.FC = () => {
  const {
    futurosPasses,
    usadosPasses,
    stats,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    partners
  } = usePassesData();

  const clearFilters = () => {
    setFilters({ type: '', partner: '', status: '' });
    setSearchQuery('');
    setSortBy('validDate');
    setSortDirection('asc');
  };

  const exportConfig = {
    filename: 'passes_vendidos',
    headers: {
      type: 'Tipo',
      partner: 'Parceiro',
      participantName: 'Participante',
      participantEmail: 'E-mail',
      status: 'Status',
      validDate: 'Data Válida',
      price: 'Valor',
      usedAt: 'Usado em'
    },
    fields: ['type', 'partner', 'participantName', 'participantEmail', 'status', 'validDate', 'price', 'usedAt']
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Passes</h1>
          <p className="text-gray-600 mt-2">
            Visualize e gerencie todos os passes vendidos
          </p>
        </div>
        
        <div className="flex gap-2">
          <ExportButtons
            data={[...futurosPasses, ...usadosPasses]}
            config={exportConfig}
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passes Futuros</CardTitle>
            <TrendingUp className="h-4 w-4 ml-auto text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.futuros}</div>
            <p className="text-xs text-muted-foreground">
              Ainda não utilizados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passes Usados</CardTitle>
            <TrendingDown className="h-4 w-4 ml-auto text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{stats.usados}</div>
            <p className="text-xs text-muted-foreground">
              Já consumidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Passes</CardTitle>
            <FileText className="h-4 w-4 ml-auto text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-xs text-muted-foreground">
              Todos os passes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <PassesFilterBar
        filters={filters}
        onFiltersChange={setFilters}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        partners={partners}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={(field, direction) => {
          setSortBy(field);
          setSortDirection(direction);
        }}
        onClearFilters={clearFilters}
      />

      {/* Listagem com Abas */}
      <Tabs defaultValue="futuros" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="futuros" className="flex items-center gap-2">
            <TrendingUp size={16} />
            Passes Futuros ({stats.futuros})
          </TabsTrigger>
          <TabsTrigger value="usados" className="flex items-center gap-2">
            <TrendingDown size={16} />
            Passes Usados ({stats.usados})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="futuros" className="mt-6">
          <PassesList
            passes={futurosPasses}
            title="Passes Futuros"
            emptyMessage="Nenhum passe futuro encontrado"
          />
        </TabsContent>

        <TabsContent value="usados" className="mt-6">
          <PassesList
            passes={usadosPasses}
            title="Passes Usados"
            emptyMessage="Nenhum passe usado encontrado"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
