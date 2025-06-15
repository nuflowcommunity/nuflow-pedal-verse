
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import FinancialCharts from '@/components/admin/finance/FinancialCharts';

const FinanceOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Visão Geral Financeira</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">R$ 342.890,00</div>
            <p className="text-xs text-green-600">+18.2% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">R$ 145.230,00</div>
            <p className="text-xs text-red-600">+3.1% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Lucro Líquido</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">R$ 197.660,00</div>
            <p className="text-xs text-green-600">+28.5% desde o mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Margem de Lucro</CardTitle>
            <PieChart className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">57.6%</div>
            <p className="text-xs text-green-600">+4.2% desde o mês passado</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos Financeiros */}
      <FinancialCharts />

      {/* Resumo Mensal */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Principais Categorias de Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Vendas de Produtos</span>
                <span className="font-medium text-gray-900">R$ 198.450</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Eventos</span>
                <span className="font-medium text-gray-900">R$ 89.230</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Assinaturas</span>
                <span className="font-medium text-gray-900">R$ 55.210</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-gray-900">Maiores Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pessoal</span>
                <span className="font-medium text-gray-900">R$ 45.000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Marketing</span>
                <span className="font-medium text-gray-900">R$ 35.000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Operacional</span>
                <span className="font-medium text-gray-900">R$ 28.000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinanceOverview;
