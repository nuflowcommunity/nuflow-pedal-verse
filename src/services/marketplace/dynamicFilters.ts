
import { supabase } from '@/integrations/supabase/client';

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

// Buscar filtros dinâmicos ativos
export const fetchDynamicFilters = async (category?: string): Promise<DynamicFilter[]> => {
  let query = supabase
    .from('dynamic_filters')
    .select('*')
    .eq('is_active', true)
    .order('usage_count', { ascending: false });

  if (category) {
    query = query.or(`category.eq.${category},category.is.null`);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching dynamic filters:', error);
    return [];
  }

  return data || [];
};

// Buscar sugestões de filtros pendentes
export const fetchFilterSuggestions = async (status = 'pending'): Promise<FilterSuggestion[]> => {
  const { data, error } = await supabase
    .from('filter_suggestions')
    .select('*')
    .eq('status', status)
    .order('confidence_score', { ascending: false });

  if (error) {
    console.error('Error fetching filter suggestions:', error);
    return [];
  }

  return data || [];
};

// Aprovar sugestão de filtro
export const approveFilterSuggestion = async (
  suggestionId: string, 
  adminNotes?: string
): Promise<{ success: boolean; filterId?: string }> => {
  try {
    // Buscar a sugestão
    const { data: suggestion, error: fetchError } = await supabase
      .from('filter_suggestions')
      .select('*')
      .eq('id', suggestionId)
      .single();

    if (fetchError || !suggestion) {
      throw new Error('Sugestão não encontrada');
    }

    // Criar o filtro dinâmico
    const { data: newFilter, error: createError } = await supabase
      .from('dynamic_filters')
      .insert({
        name: suggestion.suggested_filter_name,
        slug: suggestion.suggested_filter_name.toLowerCase().replace(/\s+/g, '_'),
        type: suggestion.suggested_filter_type,
        category: suggestion.category_context,
        options: suggestion.suggested_options,
        confidence_score: suggestion.confidence_score,
        admin_approved: true
      })
      .select()
      .single();

    if (createError) {
      throw new Error('Erro ao criar filtro: ' + createError.message);
    }

    // Atualizar status da sugestão
    const { error: updateError } = await supabase
      .from('filter_suggestions')
      .update({
        status: 'approved',
        admin_notes: adminNotes,
        reviewed_at: new Date().toISOString(),
        reviewed_by: (await supabase.auth.getUser()).data.user?.id
      })
      .eq('id', suggestionId);

    if (updateError) {
      console.error('Erro ao atualizar sugestão:', updateError);
    }

    return { success: true, filterId: newFilter.id };
  } catch (error) {
    console.error('Error approving filter suggestion:', error);
    return { success: false };
  }
};

// Rejeitar sugestão de filtro
export const rejectFilterSuggestion = async (
  suggestionId: string, 
  adminNotes?: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('filter_suggestions')
      .update({
        status: 'rejected',
        admin_notes: adminNotes,
        reviewed_at: new Date().toISOString(),
        reviewed_by: (await supabase.auth.getUser()).data.user?.id
      })
      .eq('id', suggestionId);

    return !error;
  } catch (error) {
    console.error('Error rejecting filter suggestion:', error);
    return false;
  }
};

// Analisar produto com IA
export const analyzeProductWithAI = async (productData: {
  productId: string;
  title: string;
  description?: string;
  category: string;
  brand?: string;
}): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('analyze-product-attributes', {
      body: productData
    });

    if (error) {
      console.error('Error calling analyze function:', error);
      return false;
    }

    console.log('Product analysis result:', data);
    return data.success;
  } catch (error) {
    console.error('Error analyzing product:', error);
    return false;
  }
};

// Rastrear uso de filtro
export const trackFilterUsage = async (
  filterId: string,
  filterValue: string,
  searchContext?: any,
  resultsCount?: number
): Promise<void> => {
  try {
    await supabase
      .from('filter_usage_analytics')
      .insert({
        filter_id: filterId,
        filter_value: filterValue,
        search_context: searchContext,
        results_count: resultsCount,
        session_id: sessionStorage.getItem('session_id') || 'anonymous'
      });
  } catch (error) {
    console.error('Error tracking filter usage:', error);
  }
};

// Buscar atributos do produto
export const fetchProductAttributes = async (productId: string): Promise<ProductAttribute[]> => {
  const { data, error } = await supabase
    .from('product_attributes')
    .select(`
      *,
      dynamic_filters (
        id, name, type, options
      )
    `)
    .eq('product_id', productId);

  if (error) {
    console.error('Error fetching product attributes:', error);
    return [];
  }

  return data || [];
};
