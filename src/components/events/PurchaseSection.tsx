
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CouponInput } from '@/components/checkout/CouponInput';
import { useAuth } from '@/contexts/AuthContext';
import { CouponValidation } from '@/types/coupons';
import { TicketType } from '@/types/tickets';
import { LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface PurchaseSectionProps {
  eventId: string;
  eventName: string;
  eventDate: string;
  eventCity: string;
  selectedTicketType: string;
  ticketTypes: TicketType[];
  appliedCoupon: CouponValidation | null;
  onCouponApplied: (validation: CouponValidation) => void;
  onCouponRemoved: () => void;
  onPurchase: () => void;
  isProcessing: boolean;
}

const PurchaseSection = ({
  eventId,
  eventName,
  eventDate,
  eventCity,
  selectedTicketType,
  ticketTypes,
  appliedCoupon,
  onCouponApplied,
  onCouponRemoved,
  onPurchase,
  isProcessing
}: PurchaseSectionProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const selectedTicket = ticketTypes.find(t => t.id === selectedTicketType);
  const basePrice = selectedTicket?.price || 0;
  const discount = appliedCoupon?.discount_amount || 0;
  const finalPrice = Math.max(0, basePrice - discount);

  const handleProceedToCheckout = () => {
    if (!selectedTicket) return;

    navigate('/checkout', {
      state: {
        eventId,
        eventName,
        eventDate,
        eventCity,
        selectedTicketType: {
          id: selectedTicket.id,
          name: selectedTicket.name,
          price: selectedTicket.price
        }
      }
    });
  };

  if (!selectedTicket) {
    return (
      <Card className="sticky top-4">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            Selecione um tipo de ingresso para continuar
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">Resumo da Compra</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{selectedTicket.name}</span>
              <span>R$ {basePrice.toFixed(2).replace('.', ',')}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Desconto do cupom</span>
                <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            
            <hr className="my-2" />
            
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-trailflow-green">
                {discount > 0 && (
                  <span className="line-through text-gray-400 text-sm mr-2">
                    R$ {basePrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                R$ {finalPrice.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
        </div>
        
        {user && (
          <CouponInput
            userId={user.id}
            eventId={eventId}
            orderTotal={basePrice}
            onCouponApplied={onCouponApplied}
            onCouponRemoved={onCouponRemoved}
            appliedCoupon={appliedCoupon}
            disabled={isProcessing}
          />
        )}
        
        <div>
          {!user ? (
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                Faça login para continuar com a compra
              </p>
              <Link to="/login">
                <Button className="w-full bg-trailflow-green hover:bg-trailflow-green-dark">
                  <LogIn className="w-4 h-4 mr-2" />
                  Fazer Login para Continuar
                </Button>
              </Link>
            </div>
          ) : (
            <Button 
              onClick={handleProceedToCheckout}
              disabled={!selectedTicketType || isProcessing}
              className="w-full bg-trailflow-green hover:bg-trailflow-green-dark"
            >
              {isProcessing ? 'Processando...' : 'Comprar Agora'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PurchaseSection;
