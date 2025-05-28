
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { couponsService } from '@/services/coupons';
import { useToast } from '@/hooks/use-toast';
import { CreateCouponData } from '@/types/coupons';

export const useCoupons = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Buscar todos os cupons
  const {
    data: coupons = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['coupons'],
    queryFn: couponsService.getCoupons,
  });

  // Criar cupom
  const createCouponMutation = useMutation({
    mutationFn: (data: CreateCouponData) => couponsService.createCoupon(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      toast({
        title: "Sucesso",
        description: "Cupom criado com sucesso!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao criar cupom",
        variant: "destructive",
      });
    },
  });

  // Atualizar cupom
  const updateCouponMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateCouponData> }) =>
      couponsService.updateCoupon(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      toast({
        title: "Sucesso",
        description: "Cupom atualizado com sucesso!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao atualizar cupom",
        variant: "destructive",
      });
    },
  });

  // Ativar/Desativar cupom
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      couponsService.toggleCouponStatus(id, isActive),
    onSuccess: (_, { isActive }) => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      toast({
        title: "Sucesso",
        description: `Cupom ${isActive ? 'ativado' : 'desativado'} com sucesso!`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao alterar status do cupom",
        variant: "destructive",
      });
    },
  });

  // Excluir cupom
  const deleteCouponMutation = useMutation({
    mutationFn: (id: string) => couponsService.deleteCoupon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coupons'] });
      toast({
        title: "Sucesso",
        description: "Cupom excluído com sucesso!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Erro ao excluir cupom",
        variant: "destructive",
      });
    },
  });

  return {
    coupons,
    isLoading,
    error,
    createCoupon: createCouponMutation.mutate,
    updateCoupon: updateCouponMutation.mutate,
    toggleStatus: toggleStatusMutation.mutate,
    deleteCoupon: deleteCouponMutation.mutate,
    isCreating: createCouponMutation.isPending,
    isUpdating: updateCouponMutation.isPending,
    isToggling: toggleStatusMutation.isPending,
    isDeleting: deleteCouponMutation.isPending,
  };
};

export const useCouponValidation = () => {
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const validateCoupon = useCallback(async (
    code: string,
    userId: string,
    eventId?: string,
    orderTotal?: number
  ) => {
    setIsValidating(true);
    try {
      const result = await couponsService.validateCoupon(code, userId, eventId, orderTotal);
      
      if (result.valid) {
        toast({
          title: "Cupom válido!",
          description: `Desconto de R$ ${result.discount_amount.toFixed(2)} aplicado.`,
        });
      } else {
        toast({
          title: "Cupom inválido",
          description: result.message,
          variant: "destructive",
        });
      }
      
      return result;
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao validar cupom",
        variant: "destructive",
      });
      return { valid: false, discount_amount: 0, message: 'Erro na validação' };
    } finally {
      setIsValidating(false);
    }
  }, [toast]);

  const applyCoupon = useCallback(async (
    couponId: string,
    userId: string,
    discountApplied: number,
    orderId?: string,
    eventRegistrationId?: string
  ) => {
    try {
      const success = await couponsService.applyCoupon(
        couponId,
        userId,
        discountApplied,
        orderId,
        eventRegistrationId
      );
      
      if (success) {
        toast({
          title: "Cupom aplicado!",
          description: "Desconto aplicado com sucesso ao seu pedido.",
        });
      }
      
      return success;
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao aplicar cupom",
        variant: "destructive",
      });
      return false;
    }
  }, [toast]);

  return {
    validateCoupon,
    applyCoupon,
    isValidating,
  };
};
