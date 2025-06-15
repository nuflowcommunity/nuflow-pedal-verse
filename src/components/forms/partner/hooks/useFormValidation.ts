
import { useState } from 'react';
import { FormData, FieldStatus, Errors } from '../types';
import { validateField } from '../validation/validators';
import { maskCNPJ, maskCEP, maskPhone, maskCPF } from '../validation/masks';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Errors>({});
  const [fieldStatus, setFieldStatus] = useState<FieldStatus>({});

  const handleInputChange = (
    field: string, 
    value: string, 
    formData: FormData, 
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
  ) => {
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

  const validateForm = (formData: FormData): boolean => {
    const requiredFields = [
      'tipoParceiro', 'nomeEmpresa', 'urlPersonalizada', 'cnpj', 'cep',
      'estado', 'cidade', 'logradouro', 'numero', 'bairro', 'emailContato',
      'telefone1', 'sobreEmpresa', 'nomeResponsavel', 'cpfResponsavel', 'contatoResponsavel'
    ];

    const newErrors: Errors = {};

    // Check required fields
    requiredFields.forEach(field => {
      const value = formData[field as keyof FormData];
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

  return {
    errors,
    fieldStatus,
    handleInputChange,
    validateForm
  };
};
