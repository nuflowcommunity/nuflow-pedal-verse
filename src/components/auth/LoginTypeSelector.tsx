import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Shield, User } from 'lucide-react';
const LoginTypeSelector = () => {
  return <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Login Consumidor */}
      <Link to="/login" className="group">
        <Card className="h-full transition-all duration-200 hover:shadow-lg border-2 border-transparent hover:border-gray-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Login Consumidor</h3>
            <p className="text-gray-600 text-sm">
              Acesse sua conta para comprar produtos, participar de eventos e conectar-se com a comunidade do ciclismo.
            </p>
          </CardContent>
        </Card>
      </Link>

      {/* Login Parceiro */}
      <Link to="/partner/login" className="group">
        <Card className="h-full transition-all duration-200 hover:shadow-lg border-2 border-transparent hover:border-gray-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Login Parceiro</h3>
            <p className="text-gray-600 text-sm">
              Portal exclusivo para parceiros gerenciarem eventos, vendas e visualizarem relatórios de performance.
            </p>
          </CardContent>
        </Card>
      </Link>

      {/* Login Admin */}
      <Link to="/admin/login" className="group">
        <Card className="h-full transition-all duration-200 hover:shadow-lg border-2 border-transparent hover:border-gray-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Login Admin</h3>
            <p className="text-gray-600 text-sm">
              Acesso administrativo para gerenciar usuários, eventos, pedidos e configurações do sistema.
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>;
};
export default LoginTypeSelector;