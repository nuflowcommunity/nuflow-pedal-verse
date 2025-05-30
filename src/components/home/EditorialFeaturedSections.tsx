
import React, { useEffect, useRef, useState } from 'react';
import { Bike, Calendar, Users, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const EditorialFeaturedSections = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  
  const features = [
    {
      id: 1,
      icon: <Calendar size={56} className="text-trailflow-green" />,
      title: 'Rolês & Aventuras',
      description: 'Experiências épicas nas trilhas mais incríveis do Brasil. Guias especializados te levam aos lugares que você nunca imaginou.',
      link: '/roles',
      linkText: 'Descobrir Aventuras',
      accent: 'from-trailflow-green/20 to-trailflow-accent',
      position: 'main'
    },
    {
      id: 2,
      icon: <Bike size={56} className="text-trailflow-green" />,
      title: 'Marketplace Épico',
      description: 'As bikes mais cobiçadas e equipamentos premium. Encontre raridades e pechinchas que só existem aqui.',
      link: '/market',
      linkText: 'Explorar Produtos',
      accent: 'from-trailflow-accent to-trailflow-green/10',
      position: 'overlap'
    },
    {
      id: 3,
      icon: <Users size={56} className="text-trailflow-green" />,
      title: 'Comunidade Viva',
      description: 'Conecte-se com riders apaixonados, compartilhe suas conquistas e faça parte da família TrailFlow.',
      link: '/comunidade',
      linkText: 'Entrar na Comunidade',
      accent: 'from-trailflow-green/10 to-trailflow-accent/50',
      position: 'elevated'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-trailflow-white to-trailflow-accent/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-trailflow-green/5 rounded-full editorial-float -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-trailflow-accent rounded-full editorial-float translate-y-16 -translate-x-16" style={{ animationDelay: '3s' }}></div>
      
      <div className="container-modern relative z-10">
        {/* Dramatic Title */}
        <div className="text-center mb-20">
          <h2 className={`editorial-title-mega text-trailflow-dark mb-6 ${isVisible ? 'animate' : ''}`}>
            Sua Jornada
          </h2>
          <p className={`editorial-subtitle text-trailflow-medium max-w-3xl mx-auto ${isVisible ? 'editorial-enter-delayed' : 'opacity-0'}`}>
            Três universos conectados para transformar sua paixão pelo ciclismo em aventuras inesquecíveis
          </p>
        </div>

        {/* Asymmetric Cards Grid */}
        <div className="asymmetric-grid">
          {features.map((feature, index) => {
            const getCardClass = () => {
              if (feature.position === 'main') return 'asymmetric-card-1';
              if (feature.position === 'overlap') return 'asymmetric-card-2';
              return 'asymmetric-card-3';
            };

            const getAnimationClass = () => {
              if (index === 0) return isVisible ? 'editorial-enter' : 'opacity-0';
              if (index === 1) return isVisible ? 'editorial-enter-delayed' : 'opacity-0';
              return isVisible ? 'editorial-enter-delayed-2' : 'opacity-0';
            };

            return (
              <div 
                key={feature.id} 
                className={`${getCardClass()} ${getAnimationClass()}`}
              >
                <div className={`editorial-card-advanced bg-gradient-to-br ${feature.accent} p-8 rounded-2xl border border-trailflow-lighter/50 shadow-lg hover:shadow-2xl relative overflow-hidden group`}>
                  
                  {/* Icon with Background */}
                  <div className="relative mb-6">
                    <div className="bg-white p-4 rounded-xl shadow-md editorial-morph inline-block">
                      {feature.icon}
                    </div>
                    {feature.position === 'main' && (
                      <div className="absolute -top-2 -right-2">
                        <Zap size={24} className="text-trailflow-green editorial-float" />
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-trailflow-dark mb-4 group-hover:text-trailflow-green transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-trailflow-medium mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* CTA */}
                  <Link 
                    to={feature.link} 
                    className="inline-flex items-center text-trailflow-green font-semibold hover:text-trailflow-green-dark transition-all duration-300 group-hover:translate-x-2"
                  >
                    {feature.linkText}
                    <ArrowRight size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  
                  {/* Decorative Element */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-trailflow-green/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className={`text-center mt-20 ${isVisible ? 'editorial-diagonal' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }}>
          <div className="inline-block bg-white p-8 rounded-2xl shadow-xl editorial-morph">
            <h3 className="text-2xl font-bold text-trailflow-dark mb-4">Pronto para começar?</h3>
            <p className="text-trailflow-medium mb-6">Junte-se a milhares de ciclistas que já transformaram sua paixão em aventura.</p>
            <Link 
              to="/login" 
              className="inline-flex items-center bg-trailflow-green text-white px-8 py-4 rounded-xl font-semibold hover:bg-trailflow-green-dark transition-all duration-300 editorial-ripple"
            >
              Começar Agora
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialFeaturedSections;
