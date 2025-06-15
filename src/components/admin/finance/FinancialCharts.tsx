
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Dados de exemplo para os gráficos
const revenueData = [
  { month: 'Jan', receita: 45000, despesa: 28000 },
  { month: 'Fev', receita: 52000, despesa: 31000 },
  { month: 'Mar', receita: 48000, despesa: 29000 },
  { month: 'Abr', receita: 61000, despesa: 35000 },
  { month: 'Mai', receita: 55000, despesa: 33000 },
  { month: 'Jun', receita: 67000, despesa: 38000 },
];

const expensesByCategory = [
  { name: 'Marketing', value: 35000, color: '#19c37d' },
  { name: 'Operacional', value: 28000, color: '#3b82f6' },
  { name: 'Pessoal', value: 45000, color: '#f59e0b' },
  { name: 'Tecnologia', value: 22000, color: '#ef4444' },
  { name: 'Outros', value: 15000, color: '#8b5cf6' },
];

const cashFlowData = [
  { day: '1', entrada: 8500, saida: 6200 },
  { day: '2', entrada: 9200, saida: 5800 },
  { day: '3', entrada: 7800, saida: 7100 },
  { day: '4', entrada: 10500, saida: 6800 },
  { day: '5', entrada: 8900, saida: 5900 },
  { day: '6', entrada: 11200, saida: 7400 },
  { day: '7', entrada: 9800, saida: 6500 },
];

const FinancialCharts = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Gráfico de Receita vs Despesa */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Receita vs Despesa Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                stroke="#666"
                fontSize={12}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelStyle={{ color: '#333' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="receita" 
                stroke="#19c37d" 
                strokeWidth={3}
                name="Receita"
                dot={{ fill: '#19c37d', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="despesa" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Despesa"
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Despesas por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Despesas por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                fontSize={12}
              >
                {expensesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'Valor']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico de Fluxo de Caixa Semanal */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-gray-900">Fluxo de Caixa dos Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                stroke="#666"
                fontSize={12}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                tickFormatter={formatCurrency}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), '']}
                labelStyle={{ color: '#333' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #ccc',
                  borderRadius: '4px'
                }}
              />
              <Bar 
                dataKey="entrada" 
                fill="#19c37d" 
                name="Entrada"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="saida" 
                fill="#ef4444" 
                name="Saída"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialCharts;
