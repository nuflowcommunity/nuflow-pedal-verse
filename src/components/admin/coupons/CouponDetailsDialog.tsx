
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coupon } from '@/types/coupons';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { couponsService } from '@/services/coupons';

interface CouponDetailsDialogProps {
  coupon: Coupon;
  isOpen: boolean;
  onClose: () => void;
}

export const CouponDetailsDialog: React.FC<CouponDetailsDialogProps> = ({
  coupon,
  isOpen,
  onClose,
}) => {
  // Buscar usos do cupom
  const { data: usages = [], isLoading } = useQuery({
    queryKey: ['coupon-usages', coupon.id],
    queryFn: () => couponsService.getCouponUsages(coupon.id),
    enabled: isOpen,
  });

  const getDiscountDisplay = () => {
    return coupon.discount_type === 'percentage' 
      ? `${coupon.discount_value}%` 
      : `R$ ${coupon.discount_value.toFixed(2)}`;
  };

  const getApplicationTypeDisplay = () => {
    switch (coupon.application_type) {
      case 'event': return 'Evento';
      case 'subscription': return 'Assinatura';
      case 'general': return 'Geral';
      default: return coupon.application_type;
    }
  };

  const totalDiscountApplied = usages.reduce((total, usage) => total + usage.discount_applied, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            Detalhes do Cupom: {coupon.code}
            <Badge variant={coupon.is_active ? 'default' : 'secondary'}>
              {coupon.is_active ? 'Ativo' : 'Inativo'}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nome</label>
                  <p className="text-lg">{coupon.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Código</label>
                  <p className="text-lg font-mono">{coupon.code}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Tipo de Desconto</label>
                  <p className="text-lg">{getDiscountDisplay()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Aplicação</label>
                  <p className="text-lg">{getApplicationTypeDisplay()}</p>
                </div>
              </div>

              {coupon.description && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Descrição</label>
                  <p className="text-lg">{coupon.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Validade e Limites */}
          <Card>
            <CardHeader>
              <CardTitle>Validade e Limites</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Data de Início</label>
                  <p className="text-lg">
                    {format(new Date(coupon.start_date), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Data de Término</label>
                  <p className="text-lg">
                    {format(new Date(coupon.end_date), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Limite Total</label>
                  <p className="text-lg">
                    {coupon.usage_limit ? `${coupon.current_usage}/${coupon.usage_limit}` : 'Ilimitado'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Limite por Usuário</label>
                  <p className="text-lg">
                    {coupon.usage_limit_per_user || 'Ilimitado'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas de Uso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{coupon.current_usage}</p>
                  <p className="text-sm text-gray-600">Total de Usos</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    R$ {totalDiscountApplied.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">Desconto Total Aplicado</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">
                    {new Set(usages.map(u => u.user_id)).size}
                  </p>
                  <p className="text-sm text-gray-600">Usuários Únicos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Histórico de Uso */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Uso</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center py-4">Carregando histórico...</p>
              ) : usages.length === 0 ? (
                <p className="text-center py-4 text-gray-500">Nenhum uso registrado</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Data de Uso</th>
                        <th className="text-left p-2">Usuário</th>
                        <th className="text-left p-2">Desconto Aplicado</th>
                        <th className="text-left p-2">Tipo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usages.map((usage) => (
                        <tr key={usage.id} className="border-b hover:bg-gray-50">
                          <td className="p-2">
                            {format(new Date(usage.used_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                          </td>
                          <td className="p-2">{usage.user_id}</td>
                          <td className="p-2 font-medium">
                            R$ {usage.discount_applied.toFixed(2)}
                          </td>
                          <td className="p-2">
                            <Badge variant="outline">
                              {usage.order_id ? 'Pedido' : 'Evento'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Informações de Criação */}
          <Card>
            <CardHeader>
              <CardTitle>Informações do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="text-gray-500">Criado em</label>
                  <p>{format(new Date(coupon.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</p>
                </div>
                <div>
                  <label className="text-gray-500">Última atualização</label>
                  <p>{format(new Date(coupon.updated_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
