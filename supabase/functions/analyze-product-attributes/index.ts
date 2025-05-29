
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const CYCLING_ATTRIBUTES_PROMPT = `
Você é um especialista em produtos de ciclismo. Analise o produto fornecido e extraia atributos técnicos relevantes.

Categorias principais de produtos de ciclismo:
- Mountain Bike, Speed/Road, Gravel, BMX, Elétrica, Urbana, Dobrável
- Componentes: grupos, rodas, pneus, freios, suspensões, selins, guidões
- Acessórios: capacetes, roupas, mochilas, ferramentas, lubrificantes

Para cada produto, identifique atributos como:
- Material do quadro (alumínio, carbono, aço, titânio)
- Tipo de suspensão (rígida, dianteira, full suspension)
- Número de marchas (1x, 2x, 3x ou número específico)
- Tipo de freio (rim, disco mecânico, disco hidráulico)
- Tamanho do aro (26", 27.5", 29", 700c)
- Modalidade (XC, DH, Enduro, Speed, Gravel)
- Gênero (masculino, feminino, unissex)
- Tamanho (XS, S, M, L, XL ou medidas específicas)
- Cor principal
- Marca/fabricante
- Ano de fabricação
- Outros atributos técnicos específicos

Retorne apenas um JSON válido no formato:
{
  "suggested_filters": [
    {
      "name": "Nome do Filtro",
      "type": "select|checkbox|range|text",
      "category": "categoria_do_produto",
      "options": ["opção1", "opção2"] ou null para text/range,
      "confidence": 0.95,
      "extracted_value": "valor_extraído_do_produto"
    }
  ],
  "product_attributes": {
    "material_quadro": "carbono",
    "tipo_freio": "disco_hidraulico",
    "modalidade": "xc"
  }
}
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productId, title, description, category, brand } = await req.json();
    
    console.log(`Analyzing product: ${productId} - ${title}`);
    
    const productText = `
Título: ${title}
Descrição: ${description || ''}
Categoria: ${category}
Marca: ${brand || ''}
    `.trim();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: CYCLING_ATTRIBUTES_PROMPT },
          { role: 'user', content: productText }
        ],
        temperature: 0.3,
      }),
    });

    const aiResponse = await response.json();
    const aiContent = aiResponse.choices[0].message.content;
    
    console.log('AI Response:', aiContent);
    
    let analysisResult;
    try {
      analysisResult = JSON.parse(aiContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return new Response(JSON.stringify({ error: 'Invalid AI response format' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Salvar dados de aprendizado
    const { error: learningError } = await supabase
      .from('ai_learning_data')
      .insert({
        product_id: productId,
        extracted_attributes: analysisResult,
        ai_model_version: 'gpt-4o-mini',
        processing_time_ms: Date.now()
      });

    if (learningError) {
      console.error('Error saving learning data:', learningError);
    }

    // Criar sugestões de filtros
    for (const suggestion of analysisResult.suggested_filters || []) {
      const { error: suggestionError } = await supabase
        .from('filter_suggestions')
        .insert({
          product_id: productId,
          suggested_filter_name: suggestion.name,
          suggested_filter_type: suggestion.type,
          suggested_options: suggestion.options,
          extracted_value: suggestion.extracted_value,
          confidence_score: suggestion.confidence,
          category_context: suggestion.category
        });

      if (suggestionError) {
        console.error('Error saving filter suggestion:', suggestionError);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      analysis: analysisResult,
      suggestions_count: analysisResult.suggested_filters?.length || 0
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-product-attributes function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
