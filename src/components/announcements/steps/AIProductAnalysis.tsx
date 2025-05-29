
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, CheckCircle } from 'lucide-react';
import { analyzeProductWithAI } from '@/services/marketplace/dynamicFilters';
import { useToast } from '@/hooks/use-toast';

interface AIProductAnalysisProps {
  productData: {
    title: string;
    description?: string;
    category: string;
    brand?: string;
  };
  onAnalysisComplete: (analyzed: boolean) => void;
}

const AIProductAnalysis: React.FC<AIProductAnalysisProps> = ({
  productData,
  onAnalysisComplete
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!productData.title || !productData.category) {
      toast({
        title: "Dados incompletos",
        description: "É necessário ter pelo menos título e categoria para análise",
        variant: "destructive"
      });
      return;
    }

    setAnalyzing(true);
    
    try {
      const success = await analyzeProductWithAI({
        productId: 'temp-' + Date.now(), // ID temporário para produtos em criação
        ...productData
      });

      if (success) {
        setAnalyzed(true);
        onAnalysisComplete(true);
        toast({
          title: "Análise concluída!",
          description: "A IA analisou seu produto e pode ter criado novos filtros úteis para outros usuários.",
        });
      } else {
        throw new Error('Análise falhou');
      }
    } catch (error) {
      console.error('Error analyzing product:', error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível analisar o produto. Você pode continuar mesmo assim.",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Card className="border-2 border-dashed border-blue-300 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Brain size={24} />
          Análise Inteligente do Produto
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-blue-700">
          Nossa IA pode analisar seu produto e sugerir filtros relevantes para facilitar a busca de outros usuários. 
          Isso ajuda a criar uma experiência de compra mais inteligente!
        </p>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-blue-700 border-blue-300">
            <Sparkles size={14} className="mr-1" />
            Detecção automática de atributos
          </Badge>
          <Badge variant="outline" className="text-blue-700 border-blue-300">
            <Brain size={14} className="mr-1" />
            Filtros inteligentes
          </Badge>
          <Badge variant="outline" className="text-blue-700 border-blue-300">
            <CheckCircle size={14} className="mr-1" />
            Melhora a experiência de busca
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleAnalyze}
            disabled={analyzing || analyzed}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {analyzing ? (
              <>
                <span className="animate-spin mr-2">🧠</span>
                Analisando...
              </>
            ) : analyzed ? (
              <>
                <CheckCircle size={16} className="mr-2" />
                Análise Concluída
              </>
            ) : (
              <>
                <Brain size={16} className="mr-2" />
                Analisar com IA
              </>
            )}
          </Button>
          
          {!analyzed && (
            <Button
              variant="outline"
              onClick={() => onAnalysisComplete(false)}
              className="text-gray-600"
            >
              Pular análise
            </Button>
          )}
        </div>

        {analyzed && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-800 text-sm">
              ✅ Produto analisado com sucesso! A IA pode ter sugerido novos filtros que estarão disponíveis após aprovação do admin.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIProductAnalysis;
