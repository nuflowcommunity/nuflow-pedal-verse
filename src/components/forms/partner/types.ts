
export interface FormData {
  tipoParceiro: string;
  nomeEmpresa: string;
  urlPersonalizada: string;
  cnpj: string;
  cep: string;
  estado: string;
  cidade: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  emailContato: string;
  telefone1: string;
  telefone2: string;
  sobreEmpresa: string;
  instagram: string;
  site: string;
  comoConheceu: string;
  diasDisponiveis: string[];
  horarioPreferencial: string;
  nomeResponsavel: string;
  cpfResponsavel: string;
  contatoResponsavel: string;
}

export interface FieldStatus {
  [key: string]: 'valid' | 'invalid' | 'pending';
}

export interface Errors {
  [key: string]: string;
}
