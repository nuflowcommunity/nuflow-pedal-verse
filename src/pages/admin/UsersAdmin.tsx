
import React from 'react';
import { Search, Filter, UserPlus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AdvancedFilterBar } from '@/components/filters/AdvancedFilterBar';
import { ExportButtons } from '@/components/export/ExportButtons';
import { SortableTableHeader } from '@/components/table/SortableTableHeader';
import { useAdvancedFiltering } from '@/hooks/useAdvancedFiltering';

const mockUsers = [
  { id: '1', name: 'Maria Santos', email: 'maria@email.com', role: 'cliente', type: 'premium', joinDate: '2025-01-10', events: 5, city: 'São Paulo', state: 'SP' },
  { id: '2', name: 'João Silva', email: 'joao@email.com', role: 'cliente', type: 'básico', joinDate: '2025-02-15', events: 2, city: 'Rio de Janeiro', state: 'RJ' },
  { id: '3', name: 'Ricardo Almeida', email: 'ricardo@email.com', role: 'administrador', type: 'N/A', joinDate: '2024-12-01', events: 0, city: 'Belo Horizonte', state: 'MG' },
  { id: '4', name: 'Amanda Costa', email: 'amanda@email.com', role: 'parceiro', type: 'loja', joinDate: '2025-03-05', events: 3, city: 'Curitiba', state: 'PR' },
  { id: '5', name: 'Carlos Mendes', email: 'carlos@email.com', role: 'cliente', type: 'premium', joinDate: '2025-01-20', events: 8, city: 'Porto Alegre', state: 'RS' }
];

const getRoleClass = (role: string) => {
  switch (role) {
    case 'administrador':
      return 'bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs';
    case 'parceiro':
      return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs';
    case 'cliente':
      return 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs';
    default:
      return 'bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs';
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const UsersAdmin = () => {
  // Filter configuration for users
  const filterConfig = {
    searchFields: ['name', 'email', 'city'],
    filterFields: [
      {
        key: 'role',
        label: 'Função',
        options: [
          { key: 'cliente', value: 'cliente', label: 'Cliente' },
          { key: 'parceiro', value: 'parceiro', label: 'Parceiro' },
          { key: 'administrador', value: 'administrador', label: 'Administrador' }
        ]
      },
      {
        key: 'type',
        label: 'Tipo',
        options: [
          { key: 'premium', value: 'premium', label: 'Premium' },
          { key: 'básico', value: 'básico', label: 'Básico' },
          { key: 'loja', value: 'loja', label: 'Loja' }
        ]
      },
      {
        key: 'state',
        label: 'Estado',
        options: [
          { key: 'SP', value: 'SP', label: 'São Paulo' },
          { key: 'RJ', value: 'RJ', label: 'Rio de Janeiro' },
          { key: 'MG', value: 'MG', label: 'Minas Gerais' },
          { key: 'PR', value: 'PR', label: 'Paraná' },
          { key: 'RS', value: 'RS', label: 'Rio Grande do Sul' }
        ]
      }
    ],
    sortOptions: [
      { field: 'name', direction: 'asc' as const, label: 'Nome (A-Z)' },
      { field: 'name', direction: 'desc' as const, label: 'Nome (Z-A)' },
      { field: 'joinDate', direction: 'desc' as const, label: 'Cadastro (mais recente)' },
      { field: 'joinDate', direction: 'asc' as const, label: 'Cadastro (mais antigo)' },
      { field: 'events', direction: 'desc' as const, label: 'Eventos (mais)' },
      { field: 'events', direction: 'asc' as const, label: 'Eventos (menos)' }
    ]
  };

  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    updateFilter,
    clearFilter,
    clearFilters,
    sortBy,
    sortDirection,
    updateSort,
    filteredData: filteredUsers,
    hasActiveFilters,
    totalResults,
    filteredResults
  } = useAdvancedFiltering(mockUsers, filterConfig);

  // Export configuration
  const exportConfig = {
    filename: 'usuarios',
    headers: {
      id: 'ID',
      name: 'Nome',
      email: 'Email',
      role: 'Função',
      type: 'Tipo',
      joinDate: 'Data Cadastro',
      events: 'Eventos',
      city: 'Cidade',
      state: 'Estado'
    },
    fields: ['id', 'name', 'email', 'role', 'type', 'joinDate', 'events', 'city', 'state']
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciamento de Usuários</h1>
          <p className="text-gray-600">Gerencie clientes, parceiros e administradores.</p>
        </div>
        <Button className="bg-[#19c37d] hover:bg-[#16a86c]">
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <AdvancedFilterBar
        config={filterConfig}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilters={activeFilters}
        onFilterChange={updateFilter}
        onFilterClear={clearFilter}
        onClearAll={clearFilters}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={updateSort}
        hasActiveFilters={hasActiveFilters}
        filteredResults={filteredResults}
        totalResults={totalResults}
        renderExportButtons={() => (
          <ExportButtons
            data={filteredUsers}
            config={exportConfig}
          />
        )}
      />

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <SortableTableHeader 
                    field="name" 
                    currentSort={sortBy} 
                    currentDirection={sortDirection} 
                    onSort={updateSort}
                  >
                    Usuário
                  </SortableTableHeader>
                  <SortableTableHeader 
                    field="email" 
                    currentSort={sortBy} 
                    currentDirection={sortDirection} 
                    onSort={updateSort}
                  >
                    Email
                  </SortableTableHeader>
                  <SortableTableHeader 
                    field="role" 
                    currentSort={sortBy} 
                    currentDirection={sortDirection} 
                    onSort={updateSort}
                  >
                    Função
                  </SortableTableHeader>
                  <SortableTableHeader 
                    field="type" 
                    currentSort={sortBy} 
                    currentDirection={sortDirection} 
                    onSort={updateSort}
                  >
                    Tipo
                  </SortableTableHeader>
                  <SortableTableHeader 
                    field="joinDate" 
                    currentSort={sortBy} 
                    currentDirection={sortDirection} 
                    onSort={updateSort}
                  >
                    Cadastro
                  </SortableTableHeader>
                  <SortableTableHeader 
                    field="events" 
                    currentSort={sortBy} 
                    currentDirection={sortDirection} 
                    onSort={updateSort}
                  >
                    Eventos
                  </SortableTableHeader>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.city}, {user.state}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </TableCell>
                    <TableCell>
                      <span className={getRoleClass(user.role)}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">{user.type}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">{new Date(user.joinDate).toLocaleDateString('pt-BR')}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-900">{user.events}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersAdmin;
