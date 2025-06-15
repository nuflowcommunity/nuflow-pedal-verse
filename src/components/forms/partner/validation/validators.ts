
export const validateField = (field: string, value: string): string => {
  // Required fields validation
  const requiredFields = [
    'tipoParceiro', 'nomeEmpresa', 'urlPersonalizada', 'cnpj', 'cep',
    'estado', 'cidade', 'logradouro', 'numero', 'bairro', 'emailContato',
    'telefone1', 'sobreEmpresa', 'comoConheceu', 'horarioPreferencial',
    'nomeResponsavel', 'cpfResponsavel', 'contatoResponsavel'
  ];

  if (requiredFields.includes(field) && (!value || !value.trim())) {
    return 'Campo obrigatório';
  }

  // Specific field validations
  switch (field) {
    case 'emailContato':
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'E-mail inválido';
      }
      break;
    
    case 'cnpj':
      if (value && value.replace(/\D/g, '').length !== 14) {
        return 'CNPJ deve ter 14 dígitos';
      }
      break;
    
    case 'cep':
      if (value && value.replace(/\D/g, '').length !== 8) {
        return 'CEP deve ter 8 dígitos';
      }
      break;
    
    case 'telefone1':
    case 'telefone2':
    case 'contatoResponsavel':
      if (value && value.replace(/\D/g, '').length < 10) {
        return 'Telefone deve ter pelo menos 10 dígitos';
      }
      break;
    
    case 'cpfResponsavel':
      if (value && value.replace(/\D/g, '').length !== 11) {
        return 'CPF deve ter 11 dígitos';
      }
      break;
    
    case 'sobreEmpresa':
      if (value && value.length < 50) {
        return 'Mínimo de 50 caracteres';
      }
      break;
    
    case 'urlPersonalizada':
      if (value && !/^[a-zA-Z0-9-]+$/.test(value)) {
        return 'Use apenas letras, números e hífens';
      }
      break;
  }

  return '';
};
