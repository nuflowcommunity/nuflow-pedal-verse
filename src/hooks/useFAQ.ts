
import { useState, useMemo } from 'react';
import { FAQItem, FAQCategory } from '@/types/faq';

const faqCategories: FAQCategory[] = [
  { id: 'todos', name: 'todos', label: 'Todas' },
  { id: 'compras-pagamentos', name: 'compras-pagamentos', label: 'Compras e Pagamentos' },
  { id: 'meus-passes', name: 'meus-passes', label: 'Meus Passes' },
  { id: 'cadastro-conta', name: 'cadastro-conta', label: 'Cadastro e Conta' },
  { id: 'outros', name: 'outros', label: 'Outros' }
];

const faqData: FAQItem[] = [
  // Compras e Pagamentos
  {
    id: '1',
    category: 'compras-pagamentos',
    question: 'Como posso comprar um passe?',
    answer: 'Você pode comprar passes através da nossa página de eventos. Basta selecionar o evento desejado, escolher o tipo de ingresso e seguir o processo de checkout. Aceitamos cartão de crédito, débito e PIX.'
  },
  {
    id: '2',
    category: 'compras-pagamentos',
    question: 'Quais formas de pagamento são aceitas?',
    answer: 'Aceitamos as seguintes formas de pagamento:\n• Cartão de crédito (Visa, Mastercard, American Express)\n• Cartão de débito\n• PIX (aprovação instantânea)\n• Boleto bancário (prazo de até 3 dias úteis)'
  },
  {
    id: '3',
    category: 'compras-pagamentos',
    question: 'Posso cancelar uma compra?',
    answer: 'Sim, você pode cancelar sua compra em até 7 dias corridos após a data da compra, desde que o evento não tenha ocorrido. Para solicitar o cancelamento, acesse "Meus Passes" e clique em "Solicitar Cancelamento" ou entre em contato conosco.'
  },
  {
    id: '4',
    category: 'compras-pagamentos',
    question: 'Como usar cupons de desconto?',
    answer: 'Durante o processo de checkout, você encontrará um campo "Cupom de Desconto". Digite o código do cupom e clique em "Aplicar". O desconto será calculado automaticamente no valor total.'
  },
  
  // Meus Passes
  {
    id: '5',
    category: 'meus-passes',
    question: 'Onde encontro meus passes comprados?',
    answer: 'Você pode acessar todos os seus passes através do menu "Meus Passes" no topo da página. Lá você encontrará o histórico completo de compras, QR codes e detalhes de cada evento.'
  },
  {
    id: '6',
    category: 'meus-passes',
    question: 'Como usar o QR Code do passe?',
    answer: 'Na entrada do evento, apresente o QR Code que está disponível na seção "Meus Passes". Você pode exibir direto pelo celular ou imprimir o passe. Nossa equipe fará a leitura do código para liberação da entrada.'
  },
  {
    id: '7',
    category: 'meus-passes',
    question: 'Posso transferir meu passe para outra pessoa?',
    answer: 'Sim, é possível transferir passes para outras pessoas através da função "Transferir Passe" disponível em "Meus Passes". A pessoa que receberá o passe deve ter uma conta na plataforma e aceitar a transferência.'
  },
  {
    id: '8',
    category: 'meus-passes',
    question: 'O que fazer se perder meu passe?',
    answer: 'Não se preocupe! Seus passes ficam salvos na sua conta. Acesse "Meus Passes" para visualizar novamente o QR Code. Caso tenha problemas para acessar sua conta, entre em contato conosco.'
  },
  
  // Cadastro e Conta
  {
    id: '9',
    category: 'cadastro-conta',
    question: 'Como criar uma conta?',
    answer: 'Clique em "Entrar" no menu superior e depois em "Criar conta". Preencha seus dados pessoais, e-mail e senha. Você receberá um e-mail de confirmação para ativar sua conta.'
  },
  {
    id: '10',
    category: 'cadastro-conta',
    question: 'Como alterar meus dados pessoais?',
    answer: 'Acesse a página "Perfil" através do menu de usuário. Lá você pode editar seus dados pessoais, alterar preferências de contato e gerenciar configurações de privacidade.'
  },
  {
    id: '11',
    category: 'cadastro-conta',
    question: 'Esqueci minha senha, como recuperar?',
    answer: 'Na página de login, clique em "Esqueci minha senha". Digite seu e-mail cadastrado e você receberá instruções para criar uma nova senha.'
  },
  {
    id: '12',
    category: 'cadastro-conta',
    question: 'Como excluir minha conta?',
    answer: 'Para excluir sua conta, acesse "Perfil" > "Configurações" > "Excluir Conta". Atenção: esta ação é irreversível e todos os seus dados serão permanentemente removidos.'
  },
  
  // Outros
  {
    id: '13',
    category: 'outros',
    question: 'O que é o Nuflow Pass?',
    answer: 'O Nuflow Pass é nossa plataforma completa para descoberta e participação em eventos de mountain bike, trail running e esportes outdoor. Oferecemos uma experiência integrada para encontrar eventos, comprar passes e gerenciar sua participação.'
  },
  {
    id: '14',
    category: 'outros',
    question: 'Há suporte técnico disponível?',
    answer: 'Sim! Nossa equipe de suporte está disponível de segunda a sexta-feira, das 9h às 18h. Você pode entrar em contato através do e-mail suporte@nuflowpass.com ou pelo WhatsApp (11) 99999-9999.'
  },
  {
    id: '15',
    category: 'outros',
    question: 'Como entrar em contato?',
    answer: 'Você pode nos contatar através de:\n• E-mail: contato@nuflowpass.com\n• WhatsApp: (11) 99999-9999\n• Redes sociais: @nuflowpass\n• Formulário de contato no site'
  }
];

export const useFAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredFAQs = useMemo(() => {
    let filtered = faqData;

    // Filtrar por categoria
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [selectedCategory, searchTerm]);

  return {
    categories: faqCategories,
    faqs: filteredFAQs,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    totalFAQs: faqData.length
  };
};
