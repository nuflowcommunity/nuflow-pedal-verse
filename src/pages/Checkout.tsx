
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Calendar, MapPin, Ticket, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useCouponValidation } from '@/hooks/useCoupons';
import { CouponValidation } from '@/types/coupons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CheckoutState {
  eventId: string;
  eventName: string;
  eventDate: string;
  eventCity: string;
  selectedTicketType: {
    id: string;
    name: string;
    price: number;
  };
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const { validateCoupon } = useCouponValidation();

  // States
  const [orderSummary, setOrderSummary] = useState<CheckoutState | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<CouponValidation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    // Get order data from navigation state
    const checkoutData = location.state as CheckoutState;
    if (!checkoutData) {
      toast({
        title: "Erro",
        description: "Dados da compra não encontrados. Redirecionando...",
        variant: "destructive"
      });
      navigate('/eventos');
      return;
    }

    setOrderSummary(checkoutData);
  }, [user, location.state, navigate, toast]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || !orderSummary || !user) return;

    const validation = await validateCoupon(
      couponCode.trim().toUpperCase(),
      user.id,
      orderSummary.eventId,
      orderSummary.selectedTicketType.price
    );

    if (validation.valid) {
      setAppliedCoupon(validation);
      setErrorMessage('');
    } else {
      setAppliedCoupon(null);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const buyPass = async (eventId: string, selectedTicketType: any, couponCode?: string) => {
    // Simulate purchase process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Compra realizada com sucesso!",
      description: `Ingresso ${selectedTicketType.name} adquirido para o evento.`
    });

    // Redirect to user passes page (for now redirect to events)
    navigate('/eventos');
  };

  const handleConfirmPurchase = async () => {
    if (!orderSummary || !user) return;

    setIsProcessing(true);
    setErrorMessage('');

    try {
      await buyPass(
        orderSummary.eventId,
        orderSummary.selectedTicketType,
        appliedCoupon?.valid ? couponCode : undefined
      );
    } catch (error) {
      console.error('Erro na compra:', error);
      setErrorMessage('Ocorreu um erro ao processar sua compra. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!orderSummary) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trailflow-green mx-auto mb-4"></div>
            <p>Carregando checkout...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const basePrice = orderSummary.selectedTicketType.price;
  const discountAmount = appliedCoupon?.discount_amount || 0;
  const finalPrice = Math.max(0, basePrice - discountAmount);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-trailflow-accent/10 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-trailflow-dark mb-2">Finalizar Compra</h1>
            <p className="text-trailflow-dark/70">Confirme os detalhes da sua compra abaixo</p>
          </div>

          {/* Order Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-trailflow-green" />
                Resumo do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Event Details */}
              <div>
                <h3 className="font-semibold text-lg mb-2">{orderSummary.eventName}</h3>
                <div className="flex items-center gap-4 text-trailflow-dark/70 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{orderSummary.eventDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{orderSummary.eventCity}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Ticket Type */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{orderSummary.selectedTicketType.name}</p>
                  <p className="text-sm text-trailflow-dark/70">1x ingresso</p>
                </div>
                <p className="font-semibold">
                  R$ {basePrice.toFixed(2).replace('.', ',')}
                </p>
              </div>

              {/* Discount */}
              {appliedCoupon?.valid && (
                <div className="flex justify-between items-center text-green-600">
                  <p>Desconto do cupom</p>
                  <p>- R$ {discountAmount.toFixed(2).replace('.', ',')}</p>
                </div>
              )}

              <Separator />

              {/* Total */}
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span className="text-trailflow-green">
                  {discountAmount > 0 && (
                    <span className="line-through text-gray-400 text-sm mr-2">
                      R$ {basePrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                  R$ {finalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Coupon Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Cupom de Desconto</CardTitle>
            </CardHeader>
            <CardContent>
              {!appliedCoupon?.valid ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite o código do cupom"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    disabled={isProcessing}
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim() || isProcessing}
                    variant="outline"
                  >
                    Aplicar
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Ticket className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Cupom aplicado!</p>
                      <p className="text-sm text-green-600">{appliedCoupon.message}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveCoupon}
                    disabled={isProcessing}
                    className="text-green-700 hover:text-green-800"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Purchase Button */}
          <div className="space-y-4">
            <Button
              onClick={handleConfirmPurchase}
              disabled={isProcessing}
              className="w-full h-12 bg-trailflow-green hover:bg-trailflow-green-dark text-white font-semibold text-lg"
            >
              {isProcessing ? 'Processando...' : 'Confirmar Compra'}
            </Button>

            {errorMessage && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
