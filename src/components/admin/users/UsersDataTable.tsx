
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { FinanceTableCore } from '@/components/admin/finance/table/FinanceTableCore';
import { FinanceTableColumn } from '@/components/admin/finance/table/FinanceTableTypes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Download, Ban, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  id: string;
  first_name?: string;
  last_name?: string;
  role: string;
  created_at: string;
  avatar_url?: string;
  location?: string;
  phone?: string;
}

const UsersDataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users', searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (searchTerm) {
        query = query.or(`first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as User[];
    }
  });

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      admin: { label: 'Administrador', className: 'bg-red-100 text-red-800' },
      user: { label: 'Usuário', className: 'bg-blue-100 text-blue-800' },
      partner: { label: 'Parceiro', className: 'bg-green-100 text-green-800' }
    };

    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.user;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const exportUsers = () => {
    const csv = [
      'Nome,Email,Função,Data de Cadastro,Localização',
      ...users.map(user => [
        `${user.first_name || ''} ${user.last_name || ''}`.trim(),
        user.id, // ID do usuário como proxy para email
        user.role,
        formatDate(user.created_at),
        user.location || ''
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usuarios_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const columns: FinanceTableColumn<User>[] = [
    {
      id: 'user',
      header: 'Usuário',
      accessorKey: 'first_name',
      sortable: true,
      cell: (user) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar_url} />
            <AvatarFallback>
              {`${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">
              {`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Usuário sem nome'}
            </div>
            <div className="text-sm text-gray-500">{user.id}</div>
          </div>
        </div>
      )
    },
    {
      id: 'role',
      header: 'Função',
      accessorKey: 'role',
      sortable: true,
      cell: (user) => getRoleBadge(user.role)
    },
    {
      id: 'location',
      header: 'Localização',
      accessorKey: 'location',
      cell: (user) => (
        <div className="text-sm text-gray-900">{user.location || '-'}</div>
      )
    },
    {
      id: 'phone',
      header: 'Telefone',
      accessorKey: 'phone',
      cell: (user) => (
        <div className="text-sm text-gray-900">{user.phone || '-'}</div>
      )
    },
    {
      id: 'created_at',
      header: 'Cadastro',
      accessorKey: 'created_at',
      sortable: true,
      cell: (user) => (
        <div className="text-sm text-gray-900">{formatDate(user.created_at)}</div>
      )
    }
  ];

  const filters = (
    <div className="flex gap-4">
      <Input
        placeholder="Buscar usuários..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Button variant="outline" onClick={exportUsers}>
        <Download className="h-4 w-4 mr-2" />
        Exportar
      </Button>
    </div>
  );

  const actions = {
    view: true,
    edit: true,
    custom: [
      {
        label: 'Ativar/Desativar',
        icon: <CheckCircle className="h-4 w-4" />,
        onClick: (user: User) => console.log('Toggle user status', user.id)
      }
    ]
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Carregando usuários...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <FinanceTableCore
      title="Gerenciamento de Usuários"
      columns={columns}
      data={users}
      filters={filters}
      actions={actions}
      emptyState={
        <div className="text-center py-8 text-gray-500">
          Nenhum usuário encontrado
        </div>
      }
    />
  );
};

export default UsersDataTable;
