
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface DataPoint {
  name: string;
  [key: string]: any;
}

interface FinanceLineChartProps {
  title: string;
  data: DataPoint[];
  dataKeys: string[];
  colors: Record<string, string>;
  labels: Record<string, string>;
  formatter?: (value: number) => string;
  subtitle?: string;
  height?: number;
}

export const FinanceLineChart: React.FC<FinanceLineChartProps> = ({
  title,
  data,
  dataKeys,
  colors,
  labels,
  formatter,
  subtitle,
  height = 300
}) => {
  const config = dataKeys.reduce((acc, key) => {
    acc[key] = {
      label: labels[key] || key,
      color: colors[key] || '#000'
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className="w-full">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </CardHeader>
      <CardContent className="pt-4">
        <div style={{ height: `${height}px`, width: '100%' }}>
          <ChartContainer config={config}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
                tickFormatter={formatter}
              />
              <Tooltip 
                content={({payload, label}) => (
                  <ChartTooltipContent payload={payload} label={label} />
                )}
                formatter={formatter ? (value) => formatter(Number(value)) : undefined}
              />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px' }}
              />
              
              {dataKeys.map((key) => (
                <Line 
                  key={key}
                  type="monotone" 
                  dataKey={key} 
                  name={labels[key] || key}
                  stroke={colors[key]} 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
