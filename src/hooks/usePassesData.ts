
import { useState, useMemo } from 'react';
import { Pass, PassesFilters } from '@/types/passes';

// Mock data - em produção seria substituído por chamadas à API
const mockPasses: Pass[] = [
  {
    id: '1',
    type: 'day_use',
    partner: 'Clube Montanha',
    participantName: 'João Silva',
    participantEmail: 'joao@email.com',
    purchaseDate: '2024-01-15',
    validDate: '2024-02-01',
    status: 'futuro',
    price: 50.00,
    validUntil: '2024-02-01',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    type: 'mensalista',
    partner: 'Academia Verde',
    participantName: 'Maria Santos',
    participantEmail: 'maria@email.com',
    purchaseDate: '2024-01-10',
    validDate: '2024-01-01',
    status: 'usado',
    price: 120.00,
    usedAt: '2024-01-20T14:30:00Z',
    createdAt: '2024-01-10T09:00:00Z'
  },
  {
    id: '3',
    type: 'evento',
    partner: 'Centro Esportivo',
    participantName: 'Pedro Costa',
    participantEmail: 'pedro@email.com',
    purchaseDate: '2024-01-20',
    validDate: '2024-03-15',
    status: 'futuro',
    price: 80.00,
    validUntil: '2024-03-15',
    createdAt: '2024-01-20T16:00:00Z'
  },
  {
    id: '4',
    type: 'credito',
    partner: 'Spa Relaxa',
    participantName: 'Ana Lima',
    participantEmail: 'ana@email.com',
    purchaseDate: '2024-01-05',
    validDate: '2024-01-25',
    status: 'usado',
    price: 200.00,
    usedAt: '2024-01-25T11:15:00Z',
    createdAt: '2024-01-05T13:00:00Z'
  },
  {
    id: '5',
    type: 'day_use',
    partner: 'Clube Montanha',
    participantName: 'Carlos Oliveira',
    participantEmail: 'carlos@email.com',
    purchaseDate: '2024-01-25',
    validDate: '2024-02-10',
    status: 'futuro',
    price: 50.00,
    validUntil: '2024-02-10',
    createdAt: '2024-01-25T08:30:00Z'
  }
];

export const usePassesData = () => {
  const [filters, setFilters] = useState<PassesFilters>({
    type: '',
    partner: '',
    status: '',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string>('validDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const filteredPasses = useMemo(() => {
    let result = [...mockPasses];

    // Aplicar filtros de busca
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(pass => 
        pass.participantName.toLowerCase().includes(query) ||
        pass.participantEmail.toLowerCase().includes(query) ||
        pass.partner.toLowerCase().includes(query)
      );
    }

    // Aplicar filtros
    if (filters.type && filters.type !== 'todos') {
      result = result.filter(pass => pass.type === filters.type);
    }

    if (filters.partner && filters.partner !== 'todos') {
      result = result.filter(pass => pass.partner === filters.partner);
    }

    if (filters.status && filters.status !== 'todos') {
      result = result.filter(pass => pass.status === filters.status);
    }

    if (filters.startDate) {
      result = result.filter(pass => 
        new Date(pass.validDate || pass.purchaseDate) >= filters.startDate!
      );
    }

    if (filters.endDate) {
      result = result.filter(pass => 
        new Date(pass.validDate || pass.purchaseDate) <= filters.endDate!
      );
    }

    // Aplicar ordenação
    result.sort((a, b) => {
      let aValue = a[sortBy as keyof Pass];
      let bValue = b[sortBy as keyof Pass];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string)?.toLowerCase() || '';
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [filters, searchQuery, sortBy, sortDirection]);

  const futurosPasses = filteredPasses.filter(pass => pass.status === 'futuro');
  const usadosPasses = filteredPasses.filter(pass => pass.status === 'usado');

  const stats = {
    futuros: futurosPasses.length,
    usados: usadosPasses.length,
    total: filteredPasses.length
  };

  const partners = Array.from(new Set(mockPasses.map(pass => pass.partner)));

  return {
    filteredPasses,
    futurosPasses,
    usadosPasses,
    stats,
    filters,
    setFilters,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    partners
  };
};
