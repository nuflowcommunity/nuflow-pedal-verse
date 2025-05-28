
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ticket, X, Loader2 } from 'lucide-react';
import { useCouponValidation } from '@/hooks/useCoupons';
import { CouponValidation } from '@/types/coupons';

interface CouponInputProps {
  userId: string;
  eventId?: string;
  orderTotal: number;
  onCouponApplied: (validation: CouponValidation) => void;
  onCouponRemoved: () => void;
  appliedCoupon?: CouponValidation | null;
  disabled?: boolean;
}

export const CouponInput: React.FC<CouponInputProps> = ({
  userId,
  eventId,
  orderTotal,
  onCouponApplied,
  onCouponRemoved,
  appliedCoupon,
  disabled = false,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const { validateCoupon, isValidating } = useCouponValidation();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || disabled) return;

    const validation = await validateCoupon(
      couponCode.trim().toUpperCase(),
      userId,
      eventId,
      orderTotal
    );

    if (validation.valid) {
      onCouponApplied(validation);
      setCouponCode('');
    }
  };

  const handleRemoveCoupon = () => {
    onCouponRemoved();
    setCouponCode('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleApplyCoupon();
    }
  };

  if (appliedCoupon?.valid) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Ticket className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-green-800">Cupom aplicado!</span>
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    -{appliedCoupon.discount_amount.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </Badge>
                </div>
                <p className="text-sm text-green-600">{appliedCoupon.message}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveCoupon}
              disabled={disabled}
              className="text-green-700 hover:text-green-800 hover:bg-green-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Tem um cupom de desconto?
            </span>
          </div>
          
          <div className="flex gap-2">
            <Input
              placeholder="Digite o código do cupom"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              disabled={disabled || isValidating}
              className="flex-1"
            />
            <Button
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim() || disabled || isValidating}
              variant="outline"
              className="whitespace-nowrap"
            >
              {isValidating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Validando...
                </>
              ) : (
                'Aplicar'
              )}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500">
            Digite o código e clique em "Aplicar" para validar o cupom
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
