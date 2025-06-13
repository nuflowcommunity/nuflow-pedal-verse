
export interface FAQItem {
  id: string;
  category: 'compras-pagamentos' | 'meus-passes' | 'cadastro-conta' | 'outros';
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  label: string;
}
