
import React from 'react';
import { Bike, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const FeaturedSections = () => {
  const isMobile = useIsMobile();
  
  const features = [
    {
      id: 1,
      icon: <Calendar size={48} className="text-nuflow-lime" />,
      title: 'Rolês & Passes',
      description: 'Descubra experiências incríveis e trilhas selecionadas pelos melhores guias.',
      link: '/eventos',
      linkText: 'Ver Calendário'
    },
    {
      id: 2,
      icon: <Bike size={48} className="text-nuflow-lime" />,
      title: 'Marketplace',
      description: 'Compre e venda bikes e acessórios de maneira simples e segura.',
      link: '/marketplace',
      linkText: 'Explorar Produtos'
    },
    {
      id: 3,
      icon: <Users size={48} className="text-nuflow-lime" />,
      title: 'Comunidade',
      description: 'Conecte-se a outros ciclistas, compartilhe experiências e participe de clubs.',
      link: '/comunidade',
      linkText: 'Conhecer Comunidade'
    }
  ];

  return (
    <section className="py-20">
      <div className="container-custom">
        <h2 className="text-3xl md:text-4xl font-heading font-bold mb-16 text-center animate-fadeIn">
          <span className="inline-block border-b-4 border-nuflow-lime pb-2">Sua Jornada no Ciclismo</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all 
                          ${isMobile ? 'animate-mobile-scale' : 'hover:scale-105'}`}
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="bg-nuflow-moss/5 p-4 inline-block rounded-lg mb-6">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-3">{feature.title}</h3>
              <p className="text-nuflow-charcoal/70 mb-6">{feature.description}</p>
              <Link 
                to={feature.link} 
                className={`text-nuflow-moss font-medium flex items-center hover:underline 
                          ${isMobile ? 'active:text-nuflow-neon' : ''}`}
              >
                {feature.linkText}
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections;
