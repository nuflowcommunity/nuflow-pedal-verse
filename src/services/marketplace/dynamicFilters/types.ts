
export interface DynamicFilter {
  id: string;
  name: string;
  slug: string;
  type: 'text' | 'select' | 'range' | 'checkbox';
  category?: string;
  options?: string[];
  is_active: boolean;
  is_ai_suggested: boolean;
  confidence_score?: number;
  usage_count: number;
  admin_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface FilterSuggestion {
  id: string;
  product_id: string;
  suggested_filter_name: string;
  suggested_filter_type: string;
  suggested_options?: string[];
  extracted_value: string;
  confidence_score?: number;
  category_context?: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes?: string;
  created_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export interface ProductAttribute {
  id: string;
  product_id: string;
  filter_id: string;
  attribute_value: string;
  created_at: string;
}
