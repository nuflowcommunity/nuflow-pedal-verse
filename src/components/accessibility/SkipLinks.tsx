
import React from 'react';

const SkipLinks: React.FC = () => {
  const skipLinks = [
    { href: '#main-content', text: 'Pular para o conteúdo principal' },
    { href: '#main-navigation', text: 'Pular para a navegação' },
    { href: '#search', text: 'Pular para a busca' },
    { href: '#footer', text: 'Pular para o rodapé' }
  ];

  return (
    <div className="skip-links">
      {skipLinks.map(({ href, text }) => (
        <a
          key={href}
          href={href}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-nuflow-forest focus:text-white focus:rounded focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-nuflow-mint"
        >
          {text}
        </a>
      ))}
    </div>
  );
};

export default SkipLinks;
