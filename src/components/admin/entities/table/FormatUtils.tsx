
import React from 'react';
import { DollarSign, CalendarDays, PiggyBank } from 'lucide-react';

// Currency formatter
export const formatCurrency = (value: number | undefined) => {
  if (value === undefined) return '-';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Financial cells with icons
export const renderSalesLast24hCell = (item: { salesLast24h?: number }) => (
  <div className="flex items-center">
    <DollarSign className="h-4 w-4 mr-1 text-green-500" />
    <span className="text-gray-900">{formatCurrency(item.salesLast24h)}</span>
  </div>
);

export const renderSalesMonthlyhCell = (item: { salesMonthly?: number }) => (
  <div className="flex items-center">
    <CalendarDays className="h-4 w-4 mr-1 text-blue-500" />
    <span className="text-gray-900">{formatCurrency(item.salesMonthly)}</span>
  </div>
);

export const renderSalesTotalCell = (item: { salesTotal?: number }) => (
  <div className="flex items-center">
    <PiggyBank className="h-4 w-4 mr-1 text-purple-500" />
    <span className="text-gray-900">{formatCurrency(item.salesTotal)}</span>
  </div>
);
