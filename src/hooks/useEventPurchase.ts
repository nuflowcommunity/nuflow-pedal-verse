
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useCouponValidation } from '@/hooks/useCoupons';
import { CouponValidation } from '@/types/coupons';
import { PurchaseData, TicketType } from '@/types/tickets';

export const useEventPurchase = (eventId: string, ticketTypes: TicketType[]) => {
  const [selectedTicketType, setSelectedTicketType] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponValidation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { validateCoupon } = useCouponValidation();

  const handleCouponApplied = useCallback((validation: CouponValidation) => {
    setAppliedCoupon(validation);
  }, []);

  const handleCouponRemoved = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const handlePurchase = useCallback(async () => {
    if (!selectedTicketType) {
      toast({
        title: "Erro",
        description: "Selecione um tipo de ingresso",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const selectedTicket = ticketTypes.find(t => t.id === selectedTicketType);
      if (!selectedTicket) {
        throw new Error('Tipo de ingresso não encontrado');
      }

      const purchaseData: PurchaseData = {
        eventId,
        ticketTypeId: selectedTicketType,
        couponCode: appliedCoupon?.valid ? appliedCoupon.message : undefined,
        finalPrice: Math.max(0, selectedTicket.price - (appliedCoupon?.discount_amount || 0)),
        discount: appliedCoupon?.discount_amount || 0
      };

      // Simular processamento da compra
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Compra realizada com sucesso!",
        description: `Ingresso ${selectedTicket.name} adquirido para o evento.`
      });

      // Redirecionar para uma página de confirmação ou dashboard
      navigate('/');
      
    } catch (error) {
      console.error('Erro na compra:', error);
      toast({
        title: "Erro na compra",
        description: "Ocorreu um erro ao processar sua compra. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  }, [selectedTicketType, ticketTypes, eventId, appliedCoupon, navigate, toast]);

  return {
    selectedTicketType,
    setSelectedTicketType,
    appliedCoupon,
    isProcessing,
    handleCouponApplied,
    handleCouponRemoved,
    handlePurchase
  };
};
