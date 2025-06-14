
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/seo/SEOHead';
import { ArrowRight, Users, TrendingUp, Shield, Clock } from 'lucide-react';

const TornarParceiro = () => {
  const handleBecomePartner = () => {
    window.open('https://polymerworkshop.turis.app/forms/b2b', '_blank');
  };

  return (
    <>
      <SEOHead
        title="Torne-se um Parceiro - NuFlow"
        description="Junte-se à maior rede de parceiros do ciclismo no Brasil. Amplie seu negócio e alcance novos clientes."
        keywords={['parceiro', 'b2b', 'negócio', 'ciclismo', 'loja', 'guia']}
        url="/tornar-parceiro"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Logo no canto superior direito */}
        <div className="absolute top-6 right-6 z-10">
          <Link to="/">
            <img 
              src="/lovable-uploads/adf44db0-c66b-4031-a615-a8e98fe5f77f.png" 
              alt="NuFlow" 
              className="w-12 h-12 object-contain opacity-60 hover:opacity-100 transition-opacity" 
            />
          </Link>
        </div>

        <div className="flex min-h-screen items-center justify-center px-4 py-12">
          <div className="w-full max-w-4xl">
            
            {/* Main Content Card */}
            <div className="bg-white shadow-sm border border-gray-200 p-12">
              
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Torne-se um Parceiro
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                  Junte-se à maior rede de parceiros do ciclismo no Brasil. 
                  Amplie seu negócio e alcance milhares de ciclistas apaixonados.
                </p>
              </div>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Acesso a uma comunidade qualificada
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Conecte-se com milhares de ciclistas ativos em busca de produtos, serviços e experiências únicas.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Aumento nas vendas
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Nossos parceiros reportam um aumento médio de 35% nas vendas após se juntarem à plataforma.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Transações seguras
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Sistema de pagamentos integrado e seguro, com proteção completa para vendedores e compradores.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Suporte dedicado
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Equipe especializada para auxiliar no onboarding e crescimento do seu negócio na plataforma.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* CTA Section */}
              <div className="text-center border-t border-gray-200 pt-12">
                <h2 className="text-2xl font-light text-gray-900 mb-4">
                  Pronto para começar?
                </h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Preencha nosso formulário e nossa equipe entrará em contato em até 24 horas.
                </p>
                
                <Button 
                  onClick={handleBecomePartner}
                  className="bg-gray-900 text-white hover:bg-gray-800 focus:bg-gray-800 transition-colors duration-200 font-medium px-8 py-3 text-lg"
                >
                  Quero ser parceiro
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <p className="text-sm text-gray-500 mt-4">
                  Processo 100% gratuito • Sem taxas de adesão
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TornarParceiro;
