import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import SEOHead from '@/components/seo/SEOHead';
import { ArrowLeft, Send, Upload, Info, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const FormularioParceiro = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
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
    diasDisponiveis: [] as string[],
    horarioPreferencial: '',
    nomeResponsavel: '',
    cpfResponsavel: '',
    contatoResponsavel: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fieldStatus, setFieldStatus] = useState<Record<string, 'valid' | 'invalid' | 'pending'>>({});

  const estadosBrasil = [
    { value: 'AC', label: 'Acre (AC)' },
    { value: 'AL', label: 'Alagoas (AL)' },
    { value: 'AP', label: 'Amapá (AP)' },
    { value: 'AM', label: 'Amazonas (AM)' },
    { value: 'BA', label: 'Bahia (BA)' },
    { value: 'CE', label: 'Ceará (CE)' },
    { value: 'DF', label: 'Distrito Federal (DF)' },
    { value: 'ES', label: 'Espírito Santo (ES)' },
    { value: 'GO', label: 'Goiás (GO)' },
    { value: 'MA', label: 'Maranhão (MA)' },
    { value: 'MT', label: 'Mato Grosso (MT)' },
    { value: 'MS', label: 'Mato Grosso do Sul (MS)' },
    { value: 'MG', label: 'Minas Gerais (MG)' },
    { value: 'PA', label: 'Pará (PA)' },
    { value: 'PB', label: 'Paraíba (PB)' },
    { value: 'PR', label: 'Paraná (PR)' },
    { value: 'PE', label: 'Pernambuco (PE)' },
    { value: 'PI', label: 'Piauí (PI)' },
    { value: 'RJ', label: 'Rio de Janeiro (RJ)' },
    { value: 'RN', label: 'Rio Grande do Norte (RN)' },
    { value: 'RS', label: 'Rio Grande do Sul (RS)' },
    { value: 'RO', label: 'Rondônia (RO)' },
    { value: 'RR', label: 'Roraima (RR)' },
    { value: 'SC', label: 'Santa Catarina (SC)' },
    { value: 'SP', label: 'São Paulo (SP)' },
    { value: 'SE', label: 'Sergipe (SE)' },
    { value: 'TO', label: 'Tocantins (TO)' }
  ];

  const diasSemana = [
    'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 
    'Sexta-feira', 'Sábado', 'Domingo'
  ];

  const opcoesComoConheceu = [
    { value: 'instagram', label: 'Instagram/Redes Sociais' },
    { value: 'indicacao', label: 'Indicação de amigos/colegas' },
    { value: 'evento', label: 'Evento ou feira do setor' },
    { value: 'google', label: 'Pesquisa no Google' },
    { value: 'parceiro', label: 'Outro parceiro NuFlow' },
    { value: 'outro', label: 'Outro' }
  ];

  // Funções de máscara
  const maskCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .slice(0, 18);
  };

  const maskCEP = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d)/, '$1-$2')
      .slice(0, 9);
  };

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  };

  const maskCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1-$2')
      .slice(0, 14);
  };

  // Enhanced validations with better error messages
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'nomeEmpresa':
        if (!value.trim()) return 'Nome da empresa é obrigatório';
        if (value.length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        if (/\d/.test(value)) return 'Nome não pode conter números';
        return '';
      
      case 'urlPersonalizada':
        if (!value.trim()) return 'URL personalizada é obrigatória';
        if (value.length < 3) return 'URL deve ter pelo menos 3 caracteres';
        if (!/^[a-zA-Z0-9-_]+$/.test(value)) return 'URL deve conter apenas letras, números, hífens e underscores (sem espaços)';
        if (value.startsWith('-') || value.endsWith('-')) return 'URL não pode começar ou terminar com hífen';
        return '';
      
      case 'cnpj':
        const cnpjNumbers = value.replace(/\D/g, '');
        if (!cnpjNumbers) return 'CNPJ é obrigatório';
        if (cnpjNumbers.length !== 14) return 'CNPJ deve ter 14 dígitos';
        return '';
      
      case 'cep':
        const cepNumbers = value.replace(/\D/g, '');
        if (!cepNumbers) return 'CEP é obrigatório';
        if (cepNumbers.length !== 8) return 'CEP deve ter 8 dígitos';
        return '';
      
      case 'cidade':
        if (!value.trim()) return 'Cidade é obrigatória';
        if (value.length < 2) return 'Nome da cidade deve ter pelo menos 2 caracteres';
        if (/\d/.test(value)) return 'Nome da cidade não pode conter números';
        return '';
      
      case 'logradouro':
        if (!value.trim()) return 'Logradouro é obrigatório';
        if (value.length < 5) return 'Logradouro deve ter pelo menos 5 caracteres';
        return '';
      
      case 'numero':
        if (!value.trim()) return 'Número é obrigatório';
        if (!/^\d+[a-zA-Z]?$/.test(value)) return 'Número deve conter apenas dígitos (ex: 123 ou 123A)';
        return '';
      
      case 'bairro':
        if (!value.trim()) return 'Bairro é obrigatório';
        if (value.length < 3) return 'Nome do bairro deve ter pelo menos 3 caracteres';
        return '';
      
      case 'emailContato':
        if (!value.trim()) return 'E-mail é obrigatório';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Digite um e-mail válido (ex: contato@empresa.com)';
        return '';
      
      case 'telefone1':
        const phone1Numbers = value.replace(/\D/g, '');
        if (!phone1Numbers) return 'Telefone principal é obrigatório';
        if (phone1Numbers.length < 10) return 'Telefone deve ter pelo menos 10 dígitos';
        if (phone1Numbers.length > 11) return 'Telefone deve ter no máximo 11 dígitos';
        return '';
      
      case 'telefone2':
        if (value) {
          const phone2Numbers = value.replace(/\D/g, '');
          if (phone2Numbers.length < 10) return 'Telefone deve ter pelo menos 10 dígitos';
          if (phone2Numbers.length > 11) return 'Telefone deve ter no máximo 11 dígitos';
        }
        return '';
      
      case 'sobreEmpresa':
        if (!value.trim()) return 'Descrição da empresa é obrigatória';
        if (value.length < 50) return 'Descrição deve ter pelo menos 50 caracteres para melhor avaliação';
        return '';
      
      case 'instagram':
        if (value && !value.startsWith('@') && !value.startsWith('http')) {
          return 'Instagram deve começar com @ (ex: @empresa) ou ser uma URL completa';
        }
        return '';
      
      case 'site':
        if (value && !value.startsWith('http')) return 'Site deve ser uma URL completa (ex: https://www.empresa.com)';
        return '';

      case 'nomeResponsavel':
        if (!value.trim()) return 'Nome do responsável é obrigatório';
        if (value.length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        if (/\d/.test(value)) return 'Nome não pode conter números';
        return '';

      case 'cpfResponsavel':
        const cpfNumbers = value.replace(/\D/g, '');
        if (!cpfNumbers) return 'CPF do responsável é obrigatório';
        if (cpfNumbers.length !== 11) return 'CPF deve ter 11 dígitos';
        return '';

      case 'contatoResponsavel':
        const contactNumbers = value.replace(/\D/g, '');
        if (!contactNumbers) return 'Contato do responsável é obrigatório';
        if (contactNumbers.length < 10) return 'Contato deve ter pelo menos 10 dígitos';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    let maskedValue = value;

    // Apply masks
    switch (field) {
      case 'cnpj':
        maskedValue = maskCNPJ(value);
        break;
      case 'cep':
        maskedValue = maskCEP(value);
        break;
      case 'telefone1':
      case 'telefone2':
      case 'contatoResponsavel':
        maskedValue = maskPhone(value);
        break;
      case 'cpfResponsavel':
        maskedValue = maskCPF(value);
        break;
    }

    setFormData(prev => ({
      ...prev,
      [field]: maskedValue
    }));

    // Validate field
    const error = validateField(field, maskedValue);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    // Set field status
    setFieldStatus(prev => ({
      ...prev,
      [field]: error ? 'invalid' : 'valid'
    }));
  };

  const handleDaysChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      diasDisponiveis: checked 
        ? [...prev.diasDisponiveis, day]
        : prev.diasDisponiveis.filter(d => d !== day)
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      'tipoParceiro', 'nomeEmpresa', 'urlPersonalizada', 'cnpj', 'cep',
      'estado', 'cidade', 'logradouro', 'numero', 'bairro', 'emailContato',
      'telefone1', 'sobreEmpresa', 'nomeResponsavel', 'cpfResponsavel', 'contatoResponsavel'
    ];

    const newErrors: Record<string, string> = {};

    // Check required fields
    requiredFields.forEach(field => {
      const value = formData[field as keyof typeof formData];
      if (!value || (typeof value === 'string' && !value.trim())) {
        newErrors[field] = 'Campo obrigatório';
      } else if (typeof value === 'string') {
        const fieldError = validateField(field, value);
        if (fieldError) newErrors[field] = fieldError;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
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

  const getFieldIcon = (field: string) => {
    const status = fieldStatus[field];
    if (status === 'valid') return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (status === 'invalid') return <AlertCircle className="w-4 h-4 text-red-500" />;
    return null;
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
                
                {/* Tipo de Parceiro */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Tipo de Parceiro
                  </h3>
                  <p className="text-sm text-gray-600 -mt-2">
                    Selecione o tipo que melhor descreve seu negócio
                  </p>
                  
                  <div>
                    <Label className="flex items-center gap-1">
                      Tipo de Parceiro *
                    </Label>
                    <RadioGroup 
                      value={formData.tipoParceiro} 
                      onValueChange={(value) => handleInputChange('tipoParceiro', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="bike-park" id="bike-park" />
                        <Label htmlFor="bike-park" className="flex-1 cursor-pointer">
                          <div>
                            <span className="font-medium">Bike Park</span>
                            <p className="text-sm text-gray-500">Trilhas, pistas de downhill, parques de mountain bike</p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="organizador" id="organizador" />
                        <Label htmlFor="organizador" className="flex-1 cursor-pointer">
                          <div>
                            <span className="font-medium">Organizador de Eventos</span>
                            <p className="text-sm text-gray-500">Competições, passeios, eventos de ciclismo</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    {errors.tipoParceiro && <p className="text-red-500 text-sm mt-1">{errors.tipoParceiro}</p>}
                  </div>
                </div>

                {/* Dados da Empresa */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Informações da Empresa
                  </h3>
                  <p className="text-sm text-gray-600 -mt-2">
                    Dados básicos sobre sua empresa ou organização
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nomeEmpresa" className="flex items-center gap-1">
                        Nome da Empresa/Parceiro *
                        {getFieldIcon('nomeEmpresa')}
                      </Label>
                      <Input
                        id="nomeEmpresa"
                        value={formData.nomeEmpresa}
                        onChange={(e) => handleInputChange('nomeEmpresa', e.target.value)}
                        placeholder="Ex: Bike Park Serra Verde"
                        className={errors.nomeEmpresa ? 'border-red-500' : fieldStatus.nomeEmpresa === 'valid' ? 'border-green-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.nomeEmpresa && <p className="text-red-500 text-sm mt-1">{errors.nomeEmpresa}</p>}
                      {!errors.nomeEmpresa && <p className="text-gray-500 text-xs mt-1">Nome completo da empresa ou marca</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="urlPersonalizada" className="flex items-center gap-1">
                        URL Personalizada *
                        {getFieldIcon('urlPersonalizada')}
                      </Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                          nuflowpass.com.br/
                        </span>
                        <Input
                          id="urlPersonalizada"
                          value={formData.urlPersonalizada}
                          onChange={(e) => handleInputChange('urlPersonalizada', e.target.value)}
                          placeholder="minha-empresa"
                          className={`rounded-l-none ${errors.urlPersonalizada ? 'border-red-500' : fieldStatus.urlPersonalizada === 'valid' ? 'border-green-500' : ''}`}
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors.urlPersonalizada && <p className="text-red-500 text-sm mt-1">{errors.urlPersonalizada}</p>}
                      {!errors.urlPersonalizada && <p className="text-gray-500 text-xs mt-1">Será sua página personalizada na plataforma</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cnpj" className="flex items-center gap-1">
                      CNPJ *
                      {getFieldIcon('cnpj')}
                    </Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) => handleInputChange('cnpj', e.target.value)}
                      placeholder="00.000.000/0000-00"
                      className={errors.cnpj ? 'border-red-500' : fieldStatus.cnpj === 'valid' ? 'border-green-500' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.cnpj && <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>}
                    {!errors.cnpj && <p className="text-gray-500 text-xs mt-1">CNPJ da empresa registrada</p>}
                  </div>

                  <div>
                    <Label htmlFor="sobreEmpresa" className="flex items-center gap-1">
                      Sobre a Empresa *
                      {getFieldIcon('sobreEmpresa')}
                    </Label>
                    <Textarea
                      id="sobreEmpresa"
                      value={formData.sobreEmpresa}
                      onChange={(e) => handleInputChange('sobreEmpresa', e.target.value)}
                      placeholder="Descreva sua empresa, histórico, principais atividades oferecidas, diferenciais e experiência no setor. Esta informação será importante para nossa análise..."
                      rows={4}
                      className={errors.sobreEmpresa ? 'border-red-500' : fieldStatus.sobreEmpresa === 'valid' ? 'border-green-500' : ''}
                      disabled={isSubmitting}
                    />
                    <div className="flex justify-between items-center mt-1">
                      {errors.sobreEmpresa && <p className="text-red-500 text-sm">{errors.sobreEmpresa}</p>}
                      <p className="text-gray-500 text-xs ml-auto">
                        {formData.sobreEmpresa.length}/50 caracteres mínimos
                      </p>
                    </div>
                  </div>
                </div>

                {/* Localização */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Endereço e Localização
                  </h3>
                  <p className="text-sm text-gray-600 -mt-2">
                    Endereço completo da sede ou local principal de operação
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cep" className="flex items-center gap-1">
                        CEP *
                        {getFieldIcon('cep')}
                      </Label>
                      <Input
                        id="cep"
                        value={formData.cep}
                        onChange={(e) => handleInputChange('cep', e.target.value)}
                        placeholder="00000-000"
                        className={errors.cep ? 'border-red-500' : fieldStatus.cep === 'valid' ? 'border-green-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="estado">Estado (UF) *</Label>
                      <Select 
                        value={formData.estado} 
                        onValueChange={(value) => handleInputChange('estado', value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className={errors.estado ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Selecione o estado..." />
                        </SelectTrigger>
                        <SelectContent>
                          {estadosBrasil.map(estado => (
                            <SelectItem key={estado.value} value={estado.value}>
                              {estado.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="cidade" className="flex items-center gap-1">
                        Cidade *
                        {getFieldIcon('cidade')}
                      </Label>
                      <Input
                        id="cidade"
                        value={formData.cidade}
                        onChange={(e) => handleInputChange('cidade', e.target.value)}
                        placeholder="Ex: São Paulo"
                        className={errors.cidade ? 'border-red-500' : fieldStatus.cidade === 'valid' ? 'border-green-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="logradouro" className="flex items-center gap-1">
                      Logradouro (Rua/Avenida) *
                      {getFieldIcon('logradouro')}
                    </Label>
                    <Input
                      id="logradouro"
                      value={formData.logradouro}
                      onChange={(e) => handleInputChange('logradouro', e.target.value)}
                      placeholder="Ex: Rua das Flores, Avenida Paulista"
                      className={errors.logradouro ? 'border-red-500' : fieldStatus.logradouro === 'valid' ? 'border-green-500' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.logradouro && <p className="text-red-500 text-sm mt-1">{errors.logradouro}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="numero" className="flex items-center gap-1">
                        Número *
                        {getFieldIcon('numero')}
                      </Label>
                      <Input
                        id="numero"
                        value={formData.numero}
                        onChange={(e) => handleInputChange('numero', e.target.value)}
                        placeholder="123 ou 123A"
                        className={errors.numero ? 'border-red-500' : fieldStatus.numero === 'valid' ? 'border-green-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="bairro" className="flex items-center gap-1">
                        Bairro *
                        {getFieldIcon('bairro')}
                      </Label>
                      <Input
                        id="bairro"
                        value={formData.bairro}
                        onChange={(e) => handleInputChange('bairro', e.target.value)}
                        placeholder="Ex: Centro, Vila Madalena"
                        className={errors.bairro ? 'border-red-500' : fieldStatus.bairro === 'valid' ? 'border-green-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.bairro && <p className="text-red-500 text-sm mt-1">{errors.bairro}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="complemento">Complemento</Label>
                      <Input
                        id="complemento"
                        value={formData.complemento}
                        onChange={(e) => handleInputChange('complemento', e.target.value)}
                        placeholder="Apto 101, Bloco A, Sala 203..."
                        disabled={isSubmitting}
                      />
                      <p className="text-gray-500 text-xs mt-1">Opcional - Apartamento, sala, etc.</p>
                    </div>
                  </div>
                </div>

                {/* Dados de Contato */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Informações de Contato
                  </h3>
                  <p className="text-sm text-gray-600 -mt-2">
                    Formas de contato para comunicação comercial e suporte
                  </p>
                  
                  <div>
                    <Label htmlFor="emailContato" className="flex items-center gap-1">
                      E-mail Comercial *
                      {getFieldIcon('emailContato')}
                    </Label>
                    <Input
                      id="emailContato"
                      type="email"
                      value={formData.emailContato}
                      onChange={(e) => handleInputChange('emailContato', e.target.value)}
                      placeholder="contato@empresa.com"
                      className={errors.emailContato ? 'border-red-500' : fieldStatus.emailContato === 'valid' ? 'border-green-500' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.emailContato && <p className="text-red-500 text-sm mt-1">{errors.emailContato}</p>}
                    {!errors.emailContato && <p className="text-gray-500 text-xs mt-1">E-mail principal para comunicações comerciais</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telefone1" className="flex items-center gap-1">
                        Telefone Principal *
                        {getFieldIcon('telefone1')}
                      </Label>
                      <Input
                        id="telefone1"
                        value={formData.telefone1}
                        onChange={(e) => handleInputChange('telefone1', e.target.value)}
                        placeholder="(11) 99999-9999"
                        className={errors.telefone1 ? 'border-red-500' : fieldStatus.telefone1 === 'valid' ? 'border-green-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.telefone1 && <p className="text-red-500 text-sm mt-1">{errors.telefone1}</p>}
                      {!errors.telefone1 && <p className="text-gray-500 text-xs mt-1">WhatsApp ou telefone comercial</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="telefone2" className="flex items-center gap-1">
                        Telefone Secundário
                        {getFieldIcon('telefone2')}
                      </Label>
                      <Input
                        id="telefone2"
                        value={formData.telefone2}
                        onChange={(e) => handleInputChange('telefone2', e.target.value)}
                        placeholder="(11) 99999-9999"
                        className={errors.telefone2 ? 'border-red-500' : fieldStatus.telefone2 === 'valid' ? 'border-green-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.telefone2 && <p className="text-red-500 text-sm mt-1">{errors.telefone2}</p>}
                      {!errors.telefone2 && <p className="text-gray-500 text-xs mt-1">Opcional - Telefone alternativo</p>}
                    </div>
                  </div>
                </div>

                {/* Informações Adicionais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Presença Digital e Marketing
                  </h3>
                  <p className="text-sm text-gray-600 -mt-2">
                    Informações sobre redes sociais e presença online (opcional)
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instagram" className="flex items-center gap-1">
                        Instagram da Empresa
                        {getFieldIcon('instagram')}
                      </Label>
                      <Input
                        id="instagram"
                        value={formData.instagram}
                        onChange={(e) => handleInputChange('instagram', e.target.value)}
                        placeholder="@minhaempresa ou https://instagram.com/minhaempresa"
                        className={errors.instagram ? 'border-red-500' : fieldStatus.instagram === 'valid' ? 'border-green-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>}
                      {!errors.instagram && <p className="text-gray-500 text-xs mt-1">Perfil oficial da empresa no Instagram</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="site" className="flex items-center gap-1">
                        Site Oficial
                        {getFieldIcon('site')}
                      </Label>
                      <Input
                        id="site"
                        value={formData.site}
                        onChange={(e) => handleInputChange('site', e.target.value)}
                        placeholder="https://www.minhaempresa.com"
                        className={errors.site ? 'border-red-500' : fieldStatus.site === 'valid' ? 'border-green-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.site && <p className="text-red-500 text-sm mt-1">{errors.site}</p>}
                      {!errors.site && <p className="text-gray-500 text-xs mt-1">Website oficial da empresa</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="comoConheceu">Como conheceu a NuFlow?</Label>
                    <Select 
                      value={formData.comoConheceu} 
                      onValueChange={(value) => handleInputChange('comoConheceu', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione como nos conheceu..." />
                      </SelectTrigger>
                      <SelectContent>
                        {opcoesComoConheceu.map(opcao => (
                          <SelectItem key={opcao.value} value={opcao.value}>
                            {opcao.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-gray-500 text-xs mt-1">Isso nos ajuda a entender nossos canais de divulgação</p>
                  </div>
                </div>

                {/* Disponibilidade para Contato */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Preferências de Contato
                  </h3>
                  <p className="text-sm text-gray-600 -mt-2">
                    Quando é melhor entrarmos em contato para discutir a parceria
                  </p>
                  
                  <div>
                    <Label>Dias da Semana Preferenciais</Label>
                    <p className="text-gray-500 text-xs mb-3">Selecione os dias em que prefere receber contato comercial</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {diasSemana.map(dia => (
                        <div key={dia} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <Checkbox
                            id={dia}
                            checked={formData.diasDisponiveis.includes(dia)}
                            onCheckedChange={(checked) => handleDaysChange(dia, checked as boolean)}
                            disabled={isSubmitting}
                          />
                          <Label htmlFor={dia} className="text-sm cursor-pointer">{dia}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="horarioPreferencial">Horário Preferencial para Contato</Label>
                    <Select 
                      value={formData.horarioPreferencial} 
                      onValueChange={(value) => handleInputChange('horarioPreferencial', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o melhor horário..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manha">Manhã (8h às 12h)</SelectItem>
                        <SelectItem value="tarde">Tarde (12h às 18h)</SelectItem>
                        <SelectItem value="noite">Noite (18h às 22h)</SelectItem>
                        <SelectItem value="comercial">Horário Comercial (8h às 18h)</SelectItem>
                        <SelectItem value="qualquer">Qualquer horário</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-gray-500 text-xs mt-1">Nosso time comercial respeitará sua preferência</p>
                  </div>
                </div>

                {/* Responsável pelo Espaço */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Responsável Legal/Comercial
                  </h3>
                  <p className="text-sm text-gray-600 -mt-2">
                    Dados da pessoa responsável pela empresa e assinatura de contratos
                  </p>
                  
                  <div>
                    <Label htmlFor="nomeResponsavel" className="flex items-center gap-1">
                      Nome Completo do Responsável *
                      {getFieldIcon('nomeResponsavel')}
                    </Label>
                    <Input
                      id="nomeResponsavel"
                      value={formData.nomeResponsavel}
                      onChange={(e) => handleInputChange('nomeResponsavel', e.target.value)}
                      placeholder="João Silva Santos"
                      className={errors.nomeResponsavel ? 'border-red-500' : fieldStatus.nomeResponsavel === 'valid' ? 'border-green-500' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.nomeResponsavel && <p className="text-red-500 text-sm mt-1">{errors.nomeResponsavel}</p>}
                    {!errors.nomeResponsavel && <p className="text-gray-500 text-xs mt-1">Sócio, proprietário ou responsável legal</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpfResponsavel" className="flex items-center gap-1">
                        CPF do Responsável *
                        {getFieldIcon('cpfResponsavel')}
                      </Label>
                      <Input
                        id="cpfResponsavel"
                        value={formData.cpfResponsavel}
                        onChange={(e) => handleInputChange('cpfResponsavel', e.target.value)}
                        placeholder="000.000.000-00"
                        className={errors.cpfResponsavel ? 'border-red-500' : fieldStatus.cpfResponsavel === 'valid' ? 'border-green-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.cpfResponsavel && <p className="text-red-500 text-sm mt-1">{errors.cpfResponsavel}</p>}
                      {!errors.cpfResponsavel && <p className="text-gray-500 text-xs mt-1">Para formalização do contrato</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="contatoResponsavel" className="flex items-center gap-1">
                        Contato Direto do Responsável *
                        {getFieldIcon('contatoResponsavel')}
                      </Label>
                      <Input
                        id="contatoResponsavel"
                        value={formData.contatoResponsavel}
                        onChange={(e) => handleInputChange('contatoResponsavel', e.target.value)}
                        placeholder="(11) 99999-9999"
                        className={errors.contatoResponsavel ? 'border-red-500' : fieldStatus.contatoResponsavel === 'valid' ? 'border-green-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.contatoResponsavel && <p className="text-red-500 text-sm mt-1">{errors.contatoResponsavel}</p>}
                      {!errors.contatoResponsavel && <p className="text-gray-500 text-xs mt-1">WhatsApp preferencial para contato direto</p>}
                    </div>
                  </div>
                </div>

                {/* Upload de Logo */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Identidade Visual (Opcional)
                  </h3>
                  <p className="text-sm text-gray-600 -mt-2">
                    Logo da empresa ou fotos do local para enriquecer seu perfil
                  </p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2 font-medium">Clique para fazer upload ou arraste as imagens aqui</p>
                    <p className="text-sm text-gray-500">PNG, JPG até 5MB por arquivo</p>
                    <p className="text-xs text-gray-400 mt-2">Recomendado: Logo da empresa, fotos do local, certificações</p>
                  </div>
                </div>
                
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
