
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBreakpoint } from '@/hooks/use-breakpoint';

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
  const isMobile = useBreakpoint('md');
  
  // Responsive configuration
  const responsiveHeight = isMobile ? Math.max(250, height - 50) : height;
  const outerRadius = isMobile ? 60 : 80;
  const legendLayout = isMobile ? "horizontal" : "vertical";
  const legendAlign = isMobile ? "center" : "right";
  const legendVerticalAlign = isMobile ? "bottom" : "middle";

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
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <Pie
                data={data}
                cx="50%"
                cy={isMobile ? "40%" : "50%"}
                labelLine={false}
                outerRadius={outerRadius}
                fill="#8884d8"
                dataKey="value"
                label={isMobile ? false : ({ name, percent }) => 
                  `${name}: ${(percent * 100).toFixed(1)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                layout={legendLayout}
                verticalAlign={legendVerticalAlign}
                align={legendAlign}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  fontSize: isMobile ? '10px' : '12px',
                  paddingTop: isMobile ? '10px' : '0px'
                }}
                formatter={(value, entry, index) => {
                  const dataValue = data[index]?.value || 0;
                  return (
                    <span style={{ color: '#333' }}>
                      {value} - {formatter(dataValue)}
                    </span>
                  );
                }}
              />
              <Tooltip 
                formatter={(value) => formatter(Number(value))}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: isMobile ? '12px' : '14px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
