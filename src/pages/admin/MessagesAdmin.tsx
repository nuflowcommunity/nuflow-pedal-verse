
import React from 'react';
import { Search, MessageSquare, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockMessages = [
  { id: '1', from: 'Maria Santos', email: 'maria@email.com', subject: 'Dúvida sobre evento Pedal na Serra', 
    preview: 'Olá, gostaria de saber mais detalhes sobre o ponto de encontro do evento...', 
    date: '12/05/2025 14:30', status: 'não lido', priority: 'média' },
  { id: '2', from: 'João Silva', email: 'joao@email.com', subject: 'Problema com pagamento', 
    preview: 'Estou tentando realizar o pagamento da inscrição mas está apresentando erro...', 
    date: '11/05/2025 10:15', status: 'não lido', priority: 'alta' },
  { id: '3', from: 'Carlos Mendes', email: 'carlos@email.com', subject: 'Feedback do evento Night Ride', 
    preview: 'Gostaria de parabenizar toda a equipe pela organização do evento...', 
    date: '10/05/2025 18:45', status: 'lido', priority: 'baixa' },
  { id: '4', from: 'Ana Oliveira', email: 'ana@email.com', subject: 'Solicitação de reembolso', 
    preview: 'Infelizmente não poderei participar do evento e gostaria de solicitar reembolso...', 
    date: '09/05/2025 09:20', status: 'lido', priority: 'alta' },
  { id: '5', from: 'Pedro Alves', email: 'pedro@email.com', subject: 'Sugestão de novo evento', 
    preview: 'Tenho uma sugestão para um novo evento de ciclismo que poderia ser interessante...', 
    date: '08/05/2025 16:10', status: 'não lido', priority: 'média' }
];

const getStatusClass = (status: string) => {
  switch (status) {
    case 'não lido':
      return 'bg-blue-100 text-blue-800';
    case 'lido':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'alta':
      return 'bg-red-100 text-red-800';
    case 'média':
      return 'bg-yellow-100 text-yellow-800';
    case 'baixa':
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

const MessagesAdmin = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Mobile-first header section */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar mensagens..."
            className="pl-9 w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Button className="flex-1 sm:flex-none bg-nuflow-forest hover:bg-nuflow-darkForest">
            <MessageSquare className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Nova Mensagem</span>
            <span className="sm:hidden">Nova</span>
          </Button>
          
          {/* Mobile filter dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="sm:hidden">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Todas</DropdownMenuItem>
              <DropdownMenuItem>Não lidas</DropdownMenuItem>
              <DropdownMenuItem>Alta prioridade</DropdownMenuItem>
              <DropdownMenuItem>Suporte</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Desktop filter buttons */}
      <div className="hidden sm:flex flex-wrap gap-3">
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-nuflow-forest hover:text-nuflow-forest">
          Todas
        </Button>
        <Button variant="outline" className="bg-nuflow-forest text-white border-nuflow-forest">
          Não lidas
        </Button>
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-nuflow-forest hover:text-nuflow-forest">
          Alta prioridade
        </Button>
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-nuflow-forest hover:text-nuflow-forest">
          Suporte
        </Button>
      </div>

      {/* Messages list optimized for mobile */}
      <Card>
        <CardContent className="p-2 sm:p-4">
          <div className="space-y-3 sm:space-y-4">
            {mockMessages.map((message) => (
              <div 
                key={message.id} 
                className={`p-3 sm:p-4 rounded-lg border ${message.status === 'não lido' ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-100'} hover:border-nuflow-forest cursor-pointer transition-colors`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xs sm:text-sm">{getInitials(message.from)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate pr-2">{message.subject}</h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">{message.date}</span>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-700 mt-1 truncate">{message.from} ({message.email})</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2">{message.preview}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(message.status)}`}>
                        {message.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityClass(message.priority)}`}>
                        {message.priority}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-3">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    Responder
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesAdmin;
