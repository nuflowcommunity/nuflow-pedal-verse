
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
import { ArrowLeft, Send, Upload } from 'lucide-react';
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

  const estadosBrasil = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const diasSemana = [
    'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 
    'Sexta-feira', 'Sábado', 'Domingo'
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

  // Validações
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'nomeEmpresa':
        if (value.length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        if (/\d/.test(value)) return 'Nome não pode conter números';
        return '';
      
      case 'urlPersonalizada':
        if (!/^[a-zA-Z0-9-_]+$/.test(value)) return 'URL deve conter apenas letras, números, hífens e underscores';
        return '';
      
      case 'cnpj':
        const cnpjNumbers = value.replace(/\D/g, '');
        if (cnpjNumbers.length !== 14) return 'CNPJ deve ter 14 dígitos';
        return '';
      
      case 'cep':
        const cepNumbers = value.replace(/\D/g, '');
        if (cepNumbers.length !== 8) return 'CEP deve ter 8 dígitos';
        return '';
      
      case 'cidade':
        if (value.length < 3) return 'Cidade deve ter pelo menos 3 caracteres';
        if (/\d/.test(value)) return 'Cidade não pode conter números';
        return '';
      
      case 'numero':
        if (!/^\d+$/.test(value)) return 'Número deve conter apenas dígitos';
        return '';
      
      case 'bairro':
        if (value.length < 3) return 'Bairro deve ter pelo menos 3 caracteres';
        return '';
      
      case 'emailContato':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'E-mail inválido';
        return '';
      
      case 'telefone1':
      case 'telefone2':
        const phoneNumbers = value.replace(/\D/g, '');
        if (phoneNumbers.length < 10) return 'Telefone deve ter pelo menos 10 dígitos';
        return '';
      
      case 'sobreEmpresa':
        if (value.length < 20) return 'Descrição deve ter pelo menos 20 caracteres';
        return '';
      
      case 'instagram':
        if (value && !value.startsWith('@') && !value.startsWith('http')) {
          return 'Instagram deve começar com @ ou ser uma URL válida';
        }
        return '';
      
      case 'site':
        if (value && !value.startsWith('http')) return 'Site deve ser uma URL válida';
        return '';

      case 'nomeResponsavel':
        if (value.length < 3) return 'Nome deve ter pelo menos 3 caracteres';
        if (/\d/.test(value)) return 'Nome não pode conter números';
        return '';

      case 'cpfResponsavel':
        const cpfNumbers = value.replace(/\D/g, '');
        if (cpfNumbers.length !== 11) return 'CPF deve ter 11 dígitos';
        return '';

      case 'contatoResponsavel':
        const contactNumbers = value.replace(/\D/g, '');
        if (contactNumbers.length < 10) return 'Contato deve ter pelo menos 10 dígitos';
        return '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    let maskedValue = value;

    // Aplicar máscaras
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

    // Validar campo
    const error = validateField(field, maskedValue);
    setErrors(prev => ({
      ...prev,
      [field]: error
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
        title: "Erro na validação",
        description: "Por favor, corrija os campos destacados.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulação de envio do formulário
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
              </div>
              
              {/* Formulário */}
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Tipo de Parceiro */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Tipo de Parceiro
                  </h3>
                  
                  <div>
                    <Label>Tipo de Parceiro *</Label>
                    <RadioGroup 
                      value={formData.tipoParceiro} 
                      onValueChange={(value) => handleInputChange('tipoParceiro', value)}
                      className="mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bike-park" id="bike-park" />
                        <Label htmlFor="bike-park">Bike Park</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organizador" id="organizador" />
                        <Label htmlFor="organizador">Organizador</Label>
                      </div>
                    </RadioGroup>
                    {errors.tipoParceiro && <p className="text-red-500 text-sm mt-1">{errors.tipoParceiro}</p>}
                  </div>
                </div>

                {/* Dados da Empresa */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Dados da Empresa
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nomeEmpresa">Nome da Empresa/Parceiro *</Label>
                      <Input
                        id="nomeEmpresa"
                        value={formData.nomeEmpresa}
                        onChange={(e) => handleInputChange('nomeEmpresa', e.target.value)}
                        placeholder="Ex: Bike Park Serra Verde"
                        className={errors.nomeEmpresa ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.nomeEmpresa && <p className="text-red-500 text-sm mt-1">{errors.nomeEmpresa}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="urlPersonalizada">URL Personalizada *</Label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                          nuflowpass.com.br/
                        </span>
                        <Input
                          id="urlPersonalizada"
                          value={formData.urlPersonalizada}
                          onChange={(e) => handleInputChange('urlPersonalizada', e.target.value)}
                          placeholder="seu-nome"
                          className={`rounded-l-none ${errors.urlPersonalizada ? 'border-red-500' : ''}`}
                          disabled={isSubmitting}
                        />
                      </div>
                      {errors.urlPersonalizada && <p className="text-red-500 text-sm mt-1">{errors.urlPersonalizada}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) => handleInputChange('cnpj', e.target.value)}
                      placeholder="00.000.000/0000-00"
                      className={errors.cnpj ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.cnpj && <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>}
                  </div>

                  <div>
                    <Label htmlFor="sobreEmpresa">Sobre a Empresa *</Label>
                    <Textarea
                      id="sobreEmpresa"
                      value={formData.sobreEmpresa}
                      onChange={(e) => handleInputChange('sobreEmpresa', e.target.value)}
                      placeholder="Conte-nos sobre sua empresa, produtos e serviços oferecidos... (mínimo 20 caracteres)"
                      rows={4}
                      className={errors.sobreEmpresa ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.sobreEmpresa && <p className="text-red-500 text-sm mt-1">{errors.sobreEmpresa}</p>}
                  </div>
                </div>

                {/* Localização */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Localização
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        value={formData.cep}
                        onChange={(e) => handleInputChange('cep', e.target.value)}
                        placeholder="00000-000"
                        className={errors.cep ? 'border-red-500' : ''}
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
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {estadosBrasil.map(estado => (
                            <SelectItem key={estado} value={estado}>{estado}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="cidade">Cidade *</Label>
                      <Input
                        id="cidade"
                        value={formData.cidade}
                        onChange={(e) => handleInputChange('cidade', e.target.value)}
                        placeholder="Ex: São Paulo"
                        className={errors.cidade ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="logradouro">Logradouro (Rua/Avenida) *</Label>
                    <Input
                      id="logradouro"
                      value={formData.logradouro}
                      onChange={(e) => handleInputChange('logradouro', e.target.value)}
                      placeholder="Ex: Rua das Flores"
                      className={errors.logradouro ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.logradouro && <p className="text-red-500 text-sm mt-1">{errors.logradouro}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="numero">Número *</Label>
                      <Input
                        id="numero"
                        value={formData.numero}
                        onChange={(e) => handleInputChange('numero', e.target.value)}
                        placeholder="123"
                        className={errors.numero ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="bairro">Bairro *</Label>
                      <Input
                        id="bairro"
                        value={formData.bairro}
                        onChange={(e) => handleInputChange('bairro', e.target.value)}
                        placeholder="Ex: Centro"
                        className={errors.bairro ? 'border-red-500' : ''}
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
                        placeholder="Apto 101, Bloco A..."
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                {/* Dados de Contato */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Dados de Contato
                  </h3>
                  
                  <div>
                    <Label htmlFor="emailContato">E-mail de Contato *</Label>
                    <Input
                      id="emailContato"
                      type="email"
                      value={formData.emailContato}
                      onChange={(e) => handleInputChange('emailContato', e.target.value)}
                      placeholder="contato@empresa.com"
                      className={errors.emailContato ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.emailContato && <p className="text-red-500 text-sm mt-1">{errors.emailContato}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telefone1">Telefone 1 *</Label>
                      <Input
                        id="telefone1"
                        value={formData.telefone1}
                        onChange={(e) => handleInputChange('telefone1', e.target.value)}
                        placeholder="(11) 99999-9999"
                        className={errors.telefone1 ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.telefone1 && <p className="text-red-500 text-sm mt-1">{errors.telefone1}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="telefone2">Telefone 2</Label>
                      <Input
                        id="telefone2"
                        value={formData.telefone2}
                        onChange={(e) => handleInputChange('telefone2', e.target.value)}
                        placeholder="(11) 99999-9999"
                        className={errors.telefone2 ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.telefone2 && <p className="text-red-500 text-sm mt-1">{errors.telefone2}</p>}
                    </div>
                  </div>
                </div>

                {/* Informações Adicionais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Informações Adicionais
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instagram">Instagram da Empresa</Label>
                      <Input
                        id="instagram"
                        value={formData.instagram}
                        onChange={(e) => handleInputChange('instagram', e.target.value)}
                        placeholder="@empresa ou https://instagram.com/empresa"
                        className={errors.instagram ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.instagram && <p className="text-red-500 text-sm mt-1">{errors.instagram}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="site">Site</Label>
                      <Input
                        id="site"
                        value={formData.site}
                        onChange={(e) => handleInputChange('site', e.target.value)}
                        placeholder="https://www.empresa.com"
                        className={errors.site ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.site && <p className="text-red-500 text-sm mt-1">{errors.site}</p>}
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
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="indicacao">Indicação</SelectItem>
                        <SelectItem value="evento">Evento</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Disponibilidade para Contato */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Disponibilidade para Contato
                  </h3>
                  
                  <div>
                    <Label>Dias da Semana Preferenciais</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                      {diasSemana.map(dia => (
                        <div key={dia} className="flex items-center space-x-2">
                          <Checkbox
                            id={dia}
                            checked={formData.diasDisponiveis.includes(dia)}
                            onCheckedChange={(checked) => handleDaysChange(dia, checked as boolean)}
                            disabled={isSubmitting}
                          />
                          <Label htmlFor={dia} className="text-sm">{dia}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="horarioPreferencial">Horário Preferencial</Label>
                    <Select 
                      value={formData.horarioPreferencial} 
                      onValueChange={(value) => handleInputChange('horarioPreferencial', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manha">Manhã (8h - 12h)</SelectItem>
                        <SelectItem value="tarde">Tarde (12h - 18h)</SelectItem>
                        <SelectItem value="noite">Noite (18h - 22h)</SelectItem>
                        <SelectItem value="comercial">Horário Comercial (8h - 18h)</SelectItem>
                        <SelectItem value="qualquer">Qualquer horário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Responsável pelo Espaço */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Responsável pelo Espaço
                  </h3>
                  
                  <div>
                    <Label htmlFor="nomeResponsavel">Nome do Responsável *</Label>
                    <Input
                      id="nomeResponsavel"
                      value={formData.nomeResponsavel}
                      onChange={(e) => handleInputChange('nomeResponsavel', e.target.value)}
                      placeholder="João Silva"
                      className={errors.nomeResponsavel ? 'border-red-500' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.nomeResponsavel && <p className="text-red-500 text-sm mt-1">{errors.nomeResponsavel}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cpfResponsavel">CPF do Responsável *</Label>
                      <Input
                        id="cpfResponsavel"
                        value={formData.cpfResponsavel}
                        onChange={(e) => handleInputChange('cpfResponsavel', e.target.value)}
                        placeholder="000.000.000-00"
                        className={errors.cpfResponsavel ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.cpfResponsavel && <p className="text-red-500 text-sm mt-1">{errors.cpfResponsavel}</p>}
                    </div>
                    
                    <div>
                      <Label htmlFor="contatoResponsavel">Contato do Responsável *</Label>
                      <Input
                        id="contatoResponsavel"
                        value={formData.contatoResponsavel}
                        onChange={(e) => handleInputChange('contatoResponsavel', e.target.value)}
                        placeholder="(11) 99999-9999"
                        className={errors.contatoResponsavel ? 'border-red-500' : ''}
                        disabled={isSubmitting}
                      />
                      {errors.contatoResponsavel && <p className="text-red-500 text-sm mt-1">{errors.contatoResponsavel}</p>}
                    </div>
                  </div>
                </div>

                {/* Upload de Logo */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
                    Logo/Foto do Local (Opcional)
                  </h3>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Clique para fazer upload ou arraste a imagem aqui</p>
                    <p className="text-sm text-gray-500">PNG, JPG até 5MB</p>
                  </div>
                </div>
                
                {/* Botão de Envio */}
                <div className="pt-6 border-t border-gray-200">
                  <Button 
                    type="submit" 
                    className="w-full border-2 border-green-500 bg-white text-green-500 hover:bg-green-500 hover:text-white transition-all duration-300 font-medium relative overflow-hidden group"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span>
                          Enviando para análise...
                        </>
                      ) : (
                        <>
                          Enviar para análise
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
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
