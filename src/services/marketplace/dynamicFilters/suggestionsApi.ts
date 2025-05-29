
import { supabase } from '@/integrations/supabase/client';
import { FilterSuggestion } from './types';

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

  return (data || []).map(item => ({
    id: item.id,
    product_id: item.product_id,
    suggested_filter_name: item.suggested_filter_name,
    suggested_filter_type: item.suggested_filter_type,
    suggested_options: Array.isArray(item.suggested_options) ? item.suggested_options.filter(opt => typeof opt === 'string') as string[] : undefined,
    extracted_value: item.extracted_value,
    confidence_score: item.confidence_score,
    category_context: item.category_context,
    status: item.status as 'pending' | 'approved' | 'rejected',
    admin_notes: item.admin_notes,
    created_at: item.created_at,
    reviewed_at: item.reviewed_at,
    reviewed_by: item.reviewed_by
  }));
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
