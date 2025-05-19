
import React from 'react';
import { Search, Filter, UserPlus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mockUsers = [
  { id: '1', name: 'Maria Santos', email: 'maria@email.com', role: 'cliente', type: 'premium', joinDate: '10/01/2025', events: 5 },
  { id: '2', name: 'João Silva', email: 'joao@email.com', role: 'cliente', type: 'básico', joinDate: '15/02/2025', events: 2 },
  { id: '3', name: 'Ricardo Almeida', email: 'ricardo@email.com', role: 'administrador', type: 'N/A', joinDate: '01/12/2024', events: 0 },
  { id: '4', name: 'Amanda Costa', email: 'amanda@email.com', role: 'parceiro', type: 'loja', joinDate: '05/03/2025', events: 3 },
  { id: '5', name: 'Carlos Mendes', email: 'carlos@email.com', role: 'cliente', type: 'premium', joinDate: '20/01/2025', events: 8 }
];

const getRoleClass = (role: string) => {
  switch (role) {
    case 'administrador':
      return 'bg-purple-100 text-purple-800';
    case 'parceiro':
      return 'bg-blue-100 text-blue-800';
    case 'cliente':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
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
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar usuários..."
            className="pl-9 w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button className="bg-[#19c37d] hover:bg-[#16a86c]">
            <UserPlus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-[#19c37d] hover:text-[#19c37d]">
          Todos
        </Button>
        <Button variant="outline" className="bg-[#19c37d] text-white border-[#19c37d]">
          Clientes
        </Button>
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-[#19c37d] hover:text-[#19c37d]">
          Parceiros
        </Button>
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-[#19c37d] hover:text-[#19c37d]">
          Administradores
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cadastro</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eventos</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Avatar>
                            <AvatarImage src="" />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getRoleClass(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.type}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.joinDate}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.events}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersAdmin;
