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
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useBreakpoint } from '@/hooks/use-breakpoint';

type ChartData = Record<string, any>[];

interface MarketingChartProps {
  data: ChartData;
  config: Record<string, { label: string; color: string }>;
  dataKeys: string[];
}

const MarketingChart: React.FC<MarketingChartProps> = ({ data, config, dataKeys }) => {
  const isMobile = useBreakpoint('md');
  
  // Limit data keys on mobile to prevent overcrowding
  const responsiveDataKeys = isMobile ? dataKeys.slice(0, 3) : dataKeys;
  
  // Responsive height and margins
  const chartHeight = isMobile ? 250 : 350;
  const margins = isMobile 
    ? { top: 20, right: 10, left: 10, bottom: 20 }
    : { top: 20, right: 30, left: 20, bottom: 20 };

  return (
    <div style={{ width: '100%', height: `${chartHeight}px` }}>
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
            />
            <YAxis 
              tick={{ fontSize: isMobile ? 10 : 12 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
              width={isMobile ? 40 : 60}
            />
            <Tooltip 
              content={({ payload, label }) => (
                <ChartTooltipContent 
                  payload={payload} 
                  label={label}
                  className="min-w-[150px] p-3 bg-white border border-gray-200 rounded-lg shadow-lg"
                />
              )}
            />
            <Legend 
              verticalAlign={isMobile ? "bottom" : "top"}
              height={isMobile ? 30 : 40}
              iconType="circle"
              iconSize={6}
              wrapperStyle={{ 
                fontSize: isMobile ? '10px' : '12px',
                paddingBottom: isMobile ? '10px' : '0px'
              }}
            />
            {responsiveDataKeys.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                name={config[key]?.label || key}
                stroke={config[key]?.color || '#000'}
                strokeWidth={isMobile ? 1.5 : 2}
                activeDot={{ r: isMobile ? 4 : 6 }}
                dot={{ r: isMobile ? 2 : 3 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default MarketingChart;
