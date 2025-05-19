
import React from 'react';
import { Search, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Buscar mensagens..."
            className="pl-9 w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button className="bg-[#19c37d] hover:bg-[#16a86c]">
            <MessageSquare className="mr-2 h-4 w-4" />
            Nova Mensagem
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-[#19c37d] hover:text-[#19c37d]">
          Todas
        </Button>
        <Button variant="outline" className="bg-[#19c37d] text-white border-[#19c37d]">
          Não lidas
        </Button>
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-[#19c37d] hover:text-[#19c37d]">
          Alta prioridade
        </Button>
        <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:border-[#19c37d] hover:text-[#19c37d]">
          Suporte
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div 
                key={message.id} 
                className={`p-4 rounded-lg border ${message.status === 'não lido' ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-100'} hover:border-[#19c37d] cursor-pointer transition-colors`}
              >
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>{getInitials(message.from)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{message.subject}</h3>
                      <span className="text-xs text-gray-500">{message.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{message.from} ({message.email})</p>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{message.preview}</p>
                    <div className="flex gap-2 mt-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(message.status)}`}>
                        {message.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityClass(message.priority)}`}>
                        {message.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-2">
                  <Button variant="outline" size="sm" className="text-sm">Responder</Button>
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
