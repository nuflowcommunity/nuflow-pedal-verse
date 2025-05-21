
import React from 'react';
import { Badge } from '@/components/ui/badge';

// Extracted status badge component
export function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pago':
    case 'recebido':
    case 'completo':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{status}</Badge>;
    case 'pendente':
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">{status}</Badge>;
    case 'atrasado':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">{status}</Badge>;
    case 'cancelado':
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">{status}</Badge>;
    case 'em análise':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{status}</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
