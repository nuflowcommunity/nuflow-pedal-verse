
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FilterSuggestionsManagement from '@/components/admin/filters/FilterSuggestionsManagement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Filter, TrendingUp, Users } from 'lucide-react';

const FilterManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciamento de Filtros</h1>
          <p className="text-gray-600 mt-1">
            Gerencie filtros dinâmicos e sugestões criadas pela inteligência artificial
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Filtros Ativos</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
              <Filter className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sugestões IA</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uso Mensal</p>
                <p className="text-2xl font-bold text-gray-900">1.2k</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Precisão IA</p>
                <p className="text-2xl font-bold text-gray-900">89%</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="suggestions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suggestions">Sugestões da IA</TabsTrigger>
          <TabsTrigger value="active">Filtros Ativos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions">
          <FilterSuggestionsManagement />
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Filtros Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Lista de todos os filtros ativos no marketplace...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics de Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Métricas de uso e performance dos filtros...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FilterManagement;
