
import { supabase } from '@/integrations/supabase/client';

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
