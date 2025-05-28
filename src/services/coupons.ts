
import { supabase } from '@/integrations/supabase/client';
import { Coupon, CouponUsage, CouponValidation, CreateCouponData } from '@/types/coupons';

export const couponsService = {
  // Buscar todos os cupons (apenas admins)
  async getCoupons(): Promise<Coupon[]> {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Buscar cupom por ID
  async getCouponById(id: string): Promise<Coupon | null> {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Criar novo cupom
  async createCoupon(couponData: CreateCouponData): Promise<Coupon> {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('coupons')
      .insert({
        ...couponData,
        created_by: user?.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Atualizar cupom
  async updateCoupon(id: string, updates: Partial<CreateCouponData>): Promise<Coupon> {
    const { data, error } = await supabase
      .from('coupons')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Ativar/Desativar cupom
  async toggleCouponStatus(id: string, isActive: boolean): Promise<Coupon> {
    const { data, error } = await supabase
      .from('coupons')
      .update({ is_active: isActive })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Excluir cupom
  async deleteCoupon(id: string): Promise<void> {
    const { error } = await supabase
      .from('coupons')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Validar cupom
  async validateCoupon(
    code: string, 
    userId: string, 
    eventId?: string, 
    orderTotal?: number
  ): Promise<CouponValidation> {
    const { data, error } = await supabase.rpc('validate_coupon', {
      p_code: code,
      p_user_id: userId,
      p_event_id: eventId || null,
      p_order_total: orderTotal || null
    });

    if (error) throw error;
    return data[0] || { valid: false, discount_amount: 0, message: 'Erro na validação' };
  },

  // Aplicar cupom
  async applyCoupon(
    couponId: string,
    userId: string,
    discountApplied: number,
    orderId?: string,
    eventRegistrationId?: string
  ): Promise<boolean> {
    const { data, error } = await supabase.rpc('apply_coupon', {
      p_coupon_id: couponId,
      p_user_id: userId,
      p_order_id: orderId || null,
      p_event_registration_id: eventRegistrationId || null,
      p_discount_applied: discountApplied
    });

    if (error) throw error;
    return data;
  },

  // Buscar usos de cupons
  async getCouponUsages(couponId?: string): Promise<CouponUsage[]> {
    let query = supabase
      .from('coupon_usages')
      .select('*')
      .order('used_at', { ascending: false });

    if (couponId) {
      query = query.eq('coupon_id', couponId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }
};
