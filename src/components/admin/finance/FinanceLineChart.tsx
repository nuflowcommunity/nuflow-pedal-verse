
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
import { useBreakpoint } from '@/hooks/use-breakpoint';

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
  const isMobile = useBreakpoint('md');
  
  // Limit data keys on mobile to prevent overcrowding
  const responsiveDataKeys = isMobile ? dataKeys.slice(0, 3) : dataKeys;
  
  // Responsive configuration
  const responsiveHeight = isMobile ? Math.max(250, height - 50) : height;
  const margins = isMobile 
    ? { top: 20, right: 15, left: 15, bottom: 40 }
    : { top: 20, right: 30, left: 20, bottom: 20 };

  const config = responsiveDataKeys.reduce((acc, key) => {
    acc[key] = {
      label: labels[key] || key,
      color: colors[key] || '#000'
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base lg:text-lg font-medium">{title}</CardTitle>
        {subtitle && (
          <p className="text-xs lg:text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardHeader>
      <CardContent className="pt-2">
        <div style={{ height: `${responsiveHeight}px`, width: '100%' }}>
          <ChartContainer config={config}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={margins}>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#f0f0f0" 
                  opacity={0.6}
                />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                  interval={isMobile ? 'preserveStartEnd' : 0}
                  height={isMobile ? 40 : 30}
                />
                <YAxis 
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                  tickFormatter={formatter}
                  width={isMobile ? 50 : 70}
                />
                <Tooltip 
                  content={({payload, label}) => (
                    <ChartTooltipContent 
                      payload={payload} 
                      label={label}
                      className="min-w-[160px] p-3 bg-white border border-gray-200 rounded-lg shadow-lg"
                    />
                  )}
                  formatter={formatter ? (value) => formatter(Number(value)) : undefined}
                />
                <Legend 
                  verticalAlign={isMobile ? "bottom" : "top"}
                  height={isMobile ? 40 : 36}
                  iconType="circle"
                  iconSize={6}
                  wrapperStyle={{ 
                    fontSize: isMobile ? '10px' : '12px',
                    paddingTop: isMobile ? '10px' : '0px'
                  }}
                />
                
                {responsiveDataKeys.map((key) => (
                  <Line 
                    key={key}
                    type="monotone" 
                    dataKey={key} 
                    name={labels[key] || key}
                    stroke={colors[key]} 
                    strokeWidth={isMobile ? 1.5 : 2}
                    activeDot={{ r: isMobile ? 4 : 6 }}
                    dot={{ r: isMobile ? 2 : 3 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
