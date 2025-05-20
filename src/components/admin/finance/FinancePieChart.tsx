
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DataItem {
  name: string;
  value: number;
  color: string;
}

interface FinancePieChartProps {
  title: string;
  data: DataItem[];
  formatter?: (value: number) => string;
  subtitle?: string;
  height?: number;
}

export const FinancePieChart: React.FC<FinancePieChartProps> = ({ 
  title, 
  data, 
  formatter = (value) => `R$ ${value.toLocaleString('pt-BR')}`,
  subtitle,
  height = 300
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </CardHeader>
      <CardContent className="pt-4">
        <div style={{ height: `${height}px`, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                iconType="circle"
                formatter={(value, entry, index) => {
                  return (
                    <span style={{ color: '#333', fontSize: '12px' }}>
                      {value} - {formatter((data[index]?.value || 0))}
                    </span>
                  );
                }}
              />
              <Tooltip 
                formatter={(value) => formatter(Number(value))}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
