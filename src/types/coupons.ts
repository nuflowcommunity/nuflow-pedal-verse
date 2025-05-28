
export interface Coupon {
  id: string;
  code: string;
  name: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  application_type: 'event' | 'subscription' | 'general';
  target_event_id?: string;
  start_date: string;
  end_date: string;
  usage_limit?: number;
  usage_limit_per_user?: number;
  current_usage: number;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CouponUsage {
  id: string;
  coupon_id: string;
  user_id: string;
  order_id?: string;
  event_registration_id?: string;
  discount_applied: number;
  used_at: string;
}

export interface CouponValidation {
  valid: boolean;
  coupon_id?: string;
  discount_amount: number;
  message: string;
}

export interface CreateCouponData {
  code: string;
  name: string;
  description?: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  application_type: 'event' | 'subscription' | 'general';
  target_event_id?: string;
  start_date: string;
  end_date: string;
  usage_limit?: number;
  usage_limit_per_user?: number;
  is_active?: boolean;
}
