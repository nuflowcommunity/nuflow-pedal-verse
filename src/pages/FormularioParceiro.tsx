
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SEOHead from '@/components/seo/SEOHead';
import { ArrowLeft, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FormularioParceiro = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    nomeEmpresa: '',
    tipoNegocio: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    descricaoNegocio: '',
    experiencia: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio do formulário
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Nossa equipe entrará em contato em até 24 horas.",
      });
      
      navigate('/tornar-parceiro');
    } catch (error) {
      toast({
        title: "Erro ao enviar formulário",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Formulário de Parceria - NuFlow"
        description="Preencha seus dados para se tornar um parceiro NuFlow."
        noIndex={true}
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
          <div className="w-full max-w-2xl">
            
            {/* Botão voltar */}
            <button
              onClick={() => navigate('/tornar-parceiro')}
              className="mb-6 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </button>
            
            {/* Formulário */}
            <div className="bg-white shadow-sm border border-gray-200 p-8">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-light text-gray-900 mb-4">
                  Formulário de Parceria
                </h1>
                <p className="text-gray-600 leading-relaxed">
                  Preencha os dados abaixo para iniciar sua jornada como parceiro NuFlow.
                </p>
              </div>
              
              {/* Formulário */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Dados Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Dados Pessoais
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nomeCompleto">Nome Completo *</Label>
                      <Input
                        id="nomeCompleto"
                        value={formData.nomeCompleto}
                        onChange={(e) => handleInputChange('nomeCompleto', e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => handleInputChange('telefone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                {/* Dados da Empresa */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Dados da Empresa
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
                      <Input
                        id="nomeEmpresa"
                        value={formData.nomeEmpresa}
                        onChange={(e) => handleInputChange('nomeEmpresa', e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tipoNegocio">Tipo de Negócio *</Label>
                      <Select 
                        value={formData.tipoNegocio} 
                        onValueChange={(value) => handleInputChange('tipoNegocio', value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="loja">Loja de Bikes</SelectItem>
                          <SelectItem value="oficina">Oficina/Manutenção</SelectItem>
                          <SelectItem value="guia">Guia de Turismo</SelectItem>
                          <SelectItem value="instrutor">Instrutor/Treinador</SelectItem>
                          <SelectItem value="evento">Organizador de Eventos</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="endereco">Endereço *</Label>
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => handleInputChange('endereco', e.target.value)}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cidade">Cidade *</Label>
                      <Input
                        id="cidade"
                        value={formData.cidade}
                        onChange={(e) => handleInputChange('cidade', e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="estado">Estado *</Label>
                      <Input
                        id="estado"
                        value={formData.estado}
                        onChange={(e) => handleInputChange('estado', e.target.value)}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        value={formData.cep}
                        onChange={(e) => handleInputChange('cep', e.target.value)}
                        placeholder="00000-000"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Informações Adicionais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Informações Adicionais
                  </h3>
                  
                  <div>
                    <Label htmlFor="descricaoNegocio">Descrição do Negócio *</Label>
                    <Textarea
                      id="descricaoNegocio"
                      value={formData.descricaoNegocio}
                      onChange={(e) => handleInputChange('descricaoNegocio', e.target.value)}
                      placeholder="Conte-nos sobre seu negócio, produtos e serviços oferecidos..."
                      rows={4}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experiencia">Experiência no Setor</Label>
                    <Textarea
                      id="experiencia"
                      value={formData.experiencia}
                      onChange={(e) => handleInputChange('experiencia', e.target.value)}
                      placeholder="Compartilhe sua experiência no mercado de ciclismo..."
                      rows={3}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                {/* Botão de Envio */}
                <div className="pt-6 border-t border-gray-200">
                  <Button 
                    type="submit" 
                    className="w-full bg-gray-900 text-white hover:bg-gray-800 focus:bg-gray-800 transition-colors duration-200 font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <span className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Enviando...
                      </span>
                    ) : (
                      <>
                        Enviar Formulário
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center mt-4">
                    * Campos obrigatórios
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormularioParceiro;
