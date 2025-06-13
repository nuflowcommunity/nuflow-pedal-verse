
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQItem } from '@/types/faq';

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs }) => {
  if (faqs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">
          Nenhuma dúvida encontrada no momento.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Tente alterar os filtros ou entre em contato conosco.
        </p>
      </div>
    );
  }

  const formatAnswer = (answer: string) => {
    return answer.split('\n').map((line, index) => {
      if (line.startsWith('• ')) {
        return (
          <li key={index} className="ml-4">
            {line.substring(2)}
          </li>
        );
      }
      return (
        <p key={index} className={index > 0 ? 'mt-2' : ''}>
          {line}
        </p>
      );
    });
  };

  return (
    <Accordion 
      type="single" 
      collapsible 
      defaultValue={faqs[0]?.id}
      className="w-full space-y-2"
    >
      {faqs.map((faq) => (
        <AccordionItem 
          key={faq.id} 
          value={faq.id}
          className="border border-gray-200 rounded-lg px-4 bg-white hover:shadow-sm transition-shadow"
        >
          <AccordionTrigger className="text-left py-4 hover:no-underline">
            <span className="font-medium text-trailflow-dark pr-4">
              {faq.question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4 text-gray-600 leading-relaxed">
            <div className="space-y-2">
              {formatAnswer(faq.answer)}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
