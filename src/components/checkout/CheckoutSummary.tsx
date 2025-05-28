
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CouponInput } from './CouponInput';
import { CouponValidation } from '@/types/coupons';

interface CheckoutSummaryProps {
  userId: string;
  eventId?: string;
  originalAmount: number;
  onProceed: (finalAmount: number, appliedCoupon?: CouponValidation) => void;
}

export const CheckoutSummary: React.FC<CheckoutSummaryProps> = ({
  userId,
  eventId,
  originalAmount,
  onProceed,
}) => {
  const [appliedCoupon, setAppliedCoupon] = useState<CouponValidation | null>(null);

  const discountAmount = appliedCoupon?.valid ? appliedCoupon.discount_amount : 0;
  const finalAmount = Math.max(0, originalAmount - discountAmount);

  const handleCouponApplied = (validation: CouponValidation) => {
    setAppliedCoupon(validation);
  };

  const handleCouponRemoved = () => {
    setAppliedCoupon(null);
  };

  const handleProceed = () => {
    onProceed(finalAmount, appliedCoupon || undefined);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Resumo do Pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>
              {originalAmount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </span>
          </div>

          {discountAmount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Desconto</span>
              <span>
                -{discountAmount.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>
              {finalAmount.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </span>
          </div>
        </CardContent>
      </Card>

      <CouponInput
        userId={userId}
        eventId={eventId}
        orderTotal={originalAmount}
        onCouponApplied={handleCouponApplied}
        onCouponRemoved={handleCouponRemoved}
        appliedCoupon={appliedCoupon}
      />

      <Button 
        onClick={handleProceed}
        className="w-full bg-nuflow-forest hover:bg-nuflow-darkForest"
        size="lg"
      >
        Finalizar Pedido
      </Button>
    </div>
  );
};
