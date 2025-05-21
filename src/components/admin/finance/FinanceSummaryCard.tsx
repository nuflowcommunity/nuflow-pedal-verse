
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FinanceSummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'income' | 'expense' | 'profit' | 'pending';
  subtext?: string;
  className?: string;
  onClick?: () => void;
}

export const FinanceSummaryCard = ({
  title,
  value,
  icon,
  change,
  variant = 'default',
  subtext,
  className,
  onClick,
}: FinanceSummaryCardProps) => {
  const getBgColor = () => {
    switch (variant) {
      case 'income':
        return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100';
      case 'expense':
        return 'bg-gradient-to-br from-red-50 to-rose-50 border-red-100';
      case 'profit':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100';
      case 'pending':
        return 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100';
      default:
        return 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-100';
    }
  };

  const getIconColor = () => {
    switch (variant) {
      case 'income':
        return 'bg-green-100 text-green-700';
      case 'expense':
        return 'bg-red-100 text-red-700';
      case 'profit':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getValueColor = () => {
    switch (variant) {
      case 'income':
        return 'text-green-700';
      case 'expense':
        return 'text-red-700';
      case 'profit':
        return 'text-blue-700';
      case 'pending':
        return 'text-amber-700';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <Card 
      className={cn(
        'overflow-hidden border', 
        getBgColor(), 
        onClick ? 'cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md' : '',
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className={cn('text-2xl font-bold mt-1', getValueColor())}>{value}</h3>
            
            {subtext && (
              <p className="text-xs text-gray-500 mt-1">{subtext}</p>
            )}
            
            {change && (
              <div className="flex items-center mt-2">
                <div
                  className={cn(
                    'flex items-center text-xs font-medium rounded-full px-1.5 py-0.5',
                    change.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  )}
                >
                  {change.isPositive ? (
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-0.5" />
                  )}
                  {Math.abs(change.value)}%
                </div>
                <span className="text-xs text-gray-500 ml-1.5">em relação ao mês anterior</span>
              </div>
            )}
          </div>
          
          <div className={cn('p-3 rounded-full', getIconColor())}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
