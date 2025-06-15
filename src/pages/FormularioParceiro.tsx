
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SEOHead from '@/components/seo/SEOHead';
import { ArrowLeft, Send, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Form sections
import { PartnerTypeSection } from '@/components/forms/partner/sections/PartnerTypeSection';
import { CompanyInfoSection } from '@/components/forms/partner/sections/CompanyInfoSection';
import { AddressSection } from '@/components/forms/partner/sections/AddressSection';
import { ContactSection } from '@/components/forms/partner/sections/ContactSection';
import { DigitalPresenceSection } from '@/components/forms/partner/sections/DigitalPresenceSection';
import { ContactPreferencesSection } from '@/components/forms/partner/sections/ContactPreferencesSection';
import { ResponsiblePersonSection } from '@/components/forms/partner/sections/ResponsiblePersonSection';
import { UploadSection } from '@/components/forms/partner/sections/UploadSection';

// Types and hooks
import { FormData } from '@/components/forms/partner/types';
import { useFormValidation } from '@/components/forms/partner/hooks/useFormValidation';

const FormularioParceiro = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    tipoParceiro: '',
    nomeEmpresa: '',
    urlPersonalizada: '',
    cnpj: '',
    cep: '',
    estado: '',
    cidade: '',
    logradouro: '',
    numero: '',
    bairro: '',
    complemento: '',
    emailContato: '',
    telefone1: '',
    telefone2: '',
    sobreEmpresa: '',
    instagram: '',
    site: '',
    comoConheceu: '',
    diasDisponiveis: [],
    horarioPreferencial: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    contatoResponsavel: ''
  });

  const { errors, fieldStatus, handleInputChange, validateForm } = useFormValidation();

  const onInputChange = (field: string, value: string) => {
    handleInputChange(field, value, formData, setFormData);
  };

  const handleDaysChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      diasDisponiveis: checked 
        ? [...prev.diasDisponiveis, day]
        : prev.diasDisponiveis.filter(d => d !== day)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, corrija os campos destacados em vermelho antes de continuar.",
        variant: "destructive"
      });
      
      // Scroll to first error
      const firstErrorField = document.querySelector('.border-red-500');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Cadastro enviado com sucesso!",
        description: "Recebemos seu cadastro. Ele será analisado em até 72h. Você será notificado por e-mail após a aprovação.",
      });
      
      navigate('/tornar-parceiro');
    } catch (error) {
      toast({
        title: "Erro ao enviar cadastro",
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
          <div className="w-full max-w-4xl">
            
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
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Info className="w-4 h-4" />
                    <span className="text-sm font-medium">Campos marcados com * são obrigatórios</span>
                  </div>
                </div>
              </div>
              
              {/* Formulário */}
              <form onSubmit={handleSubmit} className="space-y-8">
                
                <PartnerTypeSection
                  formData={formData}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  onInputChange={onInputChange}
                />

                <CompanyInfoSection
                  formData={formData}
                  fieldStatus={fieldStatus}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  onInputChange={onInputChange}
                />

                <AddressSection
                  formData={formData}
                  fieldStatus={fieldStatus}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  onInputChange={onInputChange}
                />

                <ContactSection
                  formData={formData}
                  fieldStatus={fieldStatus}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  onInputChange={onInputChange}
                />

                <DigitalPresenceSection
                  formData={formData}
                  fieldStatus={fieldStatus}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  onInputChange={onInputChange}
                />

                <ContactPreferencesSection
                  formData={formData}
                  isSubmitting={isSubmitting}
                  onInputChange={onInputChange}
                  onDaysChange={handleDaysChange}
                />

                <ResponsiblePersonSection
                  formData={formData}
                  fieldStatus={fieldStatus}
                  errors={errors}
                  isSubmitting={isSubmitting}
                  onInputChange={onInputChange}
                />

                <UploadSection />
                
                {/* Botão de Envio */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-700">
                        <p className="font-medium mb-1">O que acontece após o envio:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Análise do cadastro em até 72 horas úteis</li>
                          <li>• Verificação de documentos e informações</li>
                          <li>• Contato da nossa equipe comercial</li>
                          <li>• Definição de termos da parceria</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full border-2 border-green-500 bg-white text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 font-medium relative overflow-hidden group py-4 text-lg"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2 w-5 h-5 border-2 border-current border-t-transparent rounded-full"></span>
                          Enviando para análise...
                        </>
                      ) : (
                        <>
                          Enviar Cadastro para Análise
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Button>
                  
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Ao enviar este formulário, você concorda com nossos 
                    <span className="text-green-600 hover:underline cursor-pointer"> termos de parceria</span>
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
