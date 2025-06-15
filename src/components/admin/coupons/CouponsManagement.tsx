import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, ToggleLeft, ToggleRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCoupons } from '@/hooks/useCoupons';
import { Coupon } from '@/types/coupons';
import { CouponFormDialog } from './CouponFormDialog';
import { CouponDetailsDialog } from './CouponDetailsDialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
export const CouponsManagement: React.FC = () => {
  const {
    coupons,
    isLoading,
    toggleStatus,
    deleteCoupon,
    isToggling,
    isDeleting
  } = useCoupons();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [viewingCoupon, setViewingCoupon] = useState<Coupon | null>(null);

  // Filtrar cupons
  const filteredCoupons = coupons.filter(coupon => {
    const matchesSearch = coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) || coupon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || filterStatus === 'active' && coupon.is_active || filterStatus === 'inactive' && !coupon.is_active;
    return matchesSearch && matchesFilter;
  });
  const handleToggleStatus = (coupon: Coupon) => {
    toggleStatus({
      id: coupon.id,
      isActive: !coupon.is_active
    });
  };
  const handleDelete = (coupon: Coupon) => {
    if (window.confirm(`Tem certeza que deseja excluir o cupom "${coupon.code}"?`)) {
      deleteCoupon(coupon.id);
    }
  };
  const getDiscountDisplay = (coupon: Coupon) => {
    return coupon.discount_type === 'percentage' ? `${coupon.discount_value}%` : `R$ ${coupon.discount_value.toFixed(2)}`;
  };
  const getApplicationTypeDisplay = (type: string) => {
    switch (type) {
      case 'event':
        return 'Evento';
      case 'subscription':
        return 'Assinatura';
      case 'general':
        return 'Geral';
      default:
        return type;
    }
  };
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Carregando cupons...</div>;
  }
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-nuflow-charcoal text-zinc-950 text-left">Gerenciar Cupons</h1>
          <p className="text-nuflow-mineral text-zinc-700">Crie e gerencie cupons de desconto</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-nuflow-forest hover:bg-nuflow-darkForest">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cupom
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Buscar por código ou nome..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2">
              <Button variant={filterStatus === 'all' ? 'default' : 'outline'} onClick={() => setFilterStatus('all')} size="sm">
                Todos
              </Button>
              <Button variant={filterStatus === 'active' ? 'default' : 'outline'} onClick={() => setFilterStatus('active')} size="sm">
                Ativos
              </Button>
              <Button variant={filterStatus === 'inactive' ? 'default' : 'outline'} onClick={() => setFilterStatus('inactive')} size="sm">
                Inativos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Cupons */}
      <div className="grid gap-4">
        {filteredCoupons.length === 0 ? <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">Nenhum cupom encontrado</p>
            </CardContent>
          </Card> : filteredCoupons.map(coupon => <Card key={coupon.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-nuflow-charcoal">
                        {coupon.code}
                      </h3>
                      <Badge variant={coupon.is_active ? 'default' : 'secondary'}>
                        {coupon.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                      <Badge variant="outline">
                        {getApplicationTypeDisplay(coupon.application_type)}
                      </Badge>
                    </div>
                    
                    <p className="text-nuflow-mineral">{coupon.name}</p>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Desconto:</span>
                        <p className="font-medium">{getDiscountDisplay(coupon)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Usos:</span>
                        <p className="font-medium">
                          {coupon.current_usage}
                          {coupon.usage_limit ? `/${coupon.usage_limit}` : ''}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Válido até:</span>
                        <p className="font-medium">
                          {format(new Date(coupon.end_date), 'dd/MM/yyyy', {
                      locale: ptBR
                    })}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Criado em:</span>
                        <p className="font-medium">
                          {format(new Date(coupon.created_at), 'dd/MM/yyyy', {
                      locale: ptBR
                    })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setViewingCoupon(coupon)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={() => setEditingCoupon(coupon)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={() => handleToggleStatus(coupon)} disabled={isToggling}>
                      {coupon.is_active ? <ToggleRight className="w-4 h-4 text-green-600" /> : <ToggleLeft className="w-4 h-4 text-gray-400" />}
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={() => handleDelete(coupon)} disabled={isDeleting} className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>)}
      </div>

      {/* Dialogs */}
      <CouponFormDialog isOpen={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} />
      
      {editingCoupon && <CouponFormDialog isOpen={!!editingCoupon} onClose={() => setEditingCoupon(null)} coupon={editingCoupon} />}

      {viewingCoupon && <CouponDetailsDialog coupon={viewingCoupon} isOpen={!!viewingCoupon} onClose={() => setViewingCoupon(null)} />}
    </div>;
};