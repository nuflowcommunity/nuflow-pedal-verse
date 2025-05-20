
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from '@/components/ui/chart';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

interface DateFilter {
  label: string;
  value: string;
}

interface ChartCardProps {
  title: string;
  type: 'area' | 'bar' | 'line';
  data: any[];
  dataKeys: string[];
  colors: Record<string, string>;
  labels?: Record<string, string>;
  className?: string;
}

const dateFilters: DateFilter[] = [
  { label: '7 dias', value: '7d' },
  { label: '30 dias', value: '30d' },
  { label: '3 meses', value: '3m' },
  { label: '12 meses', value: '12m' },
];

const ChartCard = ({ 
  title, 
  type, 
  data, 
  dataKeys, 
  colors, 
  labels,
  className 
}: ChartCardProps) => {
  const [activeFilter, setActiveFilter] = useState<string>('7d');
  const chartConfig = Object.fromEntries(
    dataKeys.map(key => [
      key,
      {
        label: labels?.[key] || key,
        color: colors[key] || '#000000',
      },
    ])
  );

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {dataKeys.map((key) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[key]}
                fill={`${colors[key]}20`}
                stackId="1"
              />
            ))}
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {dataKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[key]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            {dataKeys.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[key]}
                strokeWidth={2}
                dot={{ r: 4, fill: colors[key] }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );
      default:
        return null;
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="text-gray-600 font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-gray-700">{labels?.[entry.dataKey] || entry.dataKey}: </span>
              <span className="text-gray-900 font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="flex items-center gap-1">
            {dateFilters.map((filter) => (
              <button
                key={filter.value}
                className={`px-2 py-1 text-xs rounded ${
                  activeFilter === filter.value
                    ? 'bg-[#19c37d] text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
            <ChartLegend>
              <ChartLegendContent />
            </ChartLegend>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
