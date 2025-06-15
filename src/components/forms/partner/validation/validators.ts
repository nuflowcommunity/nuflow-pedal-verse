
export const validateField = (field: string, value: string): string => {
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
