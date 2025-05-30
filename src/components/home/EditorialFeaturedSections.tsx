
import React, { useEffect, useRef, useState } from 'react';
import { Bike, Calendar, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EditorialFeaturedSections = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const features = [
    {
      id: 1,
      icon: <Calendar size={36} className="text-trailflow-light" />,
      title: 'Rolês & Aventuras',
      description: 'Experiências épicas nas trilhas mais incríveis do Brasil. Guias especializados te levam aos lugares que você nunca imaginou.',
      link: '/roles',
      linkText: 'Descobrir Aventuras'
    },
    {
      id: 2,
      icon: <Bike size={36} className="text-trailflow-light" />,
      title: 'Marketplace Épico',
      description: 'As bikes mais cobiçadas e equipamentos premium. Encontre raridades e pechinchas que só existem aqui.',
      link: '/market',
      linkText: 'Explorar Produtos'
    },
    {
      id: 3,
      icon: <Users size={36} className="text-trailflow-light" />,
      title: 'Comunidade Viva',
      description: 'Conecte-se com riders apaixonados, compartilhe suas conquistas e faça parte da família NuFlow.',
      link: '/comunidade',
      linkText: 'Entrar na Comunidade'
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
    <section ref={sectionRef} className="py-40 bg-trailflow-medium relative overflow-hidden">
      
      {/* Clean Editorial Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-trailflow-medium via-trailflow-dark/15 to-trailflow-medium"></div>
      
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.015]">
        <img 
          src="/lovable-uploads/adf44db0-c66b-4031-a615-a8e98fe5f77f.png" 
          alt="NuFlow Mountain Logo" 
          className="w-96 h-96 object-contain"
        />
      </div>
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl relative z-10">
        
        {/* Title */}
        <div className="text-center mb-24">
          <h2 className={`text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-8 leading-tight transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            Sua Jornada
          </h2>
          <p className={`text-2xl text-trailflow-light max-w-4xl mx-auto font-light transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            Três universos conectados para transformar sua paixão pelo ciclismo
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`group transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ animationDelay: `${0.4 + (index * 0.2)}s` }}
            >
              <div className="bg-white/98 backdrop-blur-sm border border-white/30 rounded-3xl p-10 hover:shadow-2xl transition-all duration-700 ease-out hover:-translate-y-3 h-full hover:bg-white group-hover:border-white/50">
                
                {/* Icon */}
                <div className="mb-8">
                  <div className="w-20 h-20 bg-trailflow-medium/8 rounded-3xl flex items-center justify-center group-hover:bg-trailflow-green/15 transition-all duration-700 ease-out group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-3xl font-bold text-trailflow-dark mb-6 group-hover:text-trailflow-medium transition-all duration-500">
                  {feature.title}
                </h3>
                <p className="text-trailflow-medium mb-10 leading-relaxed font-light text-lg">
                  {feature.description}
                </p>
                
                {/* Link */}
                <Link 
                  to={feature.link} 
                  className="inline-flex items-center text-trailflow-medium font-medium hover:text-trailflow-green transition-all duration-500 ease-out group-hover:translate-x-2"
                >
                  {feature.linkText}
                  <ArrowRight size={18} className="ml-3 transition-transform duration-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className={`text-center mt-24 transition-all duration-1000 ease-out delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-block bg-white/8 backdrop-blur-lg p-12 rounded-3xl border border-white/20 hover:bg-white/12 transition-all duration-700">
            <h3 className="text-3xl font-bold text-white mb-6">Pronto para começar?</h3>
            <p className="text-trailflow-light mb-8 font-light text-lg">Junte-se a milhares de ciclistas que já transformaram sua paixão em aventura.</p>
            <Link 
              to="/login" 
              className="inline-flex items-center bg-trailflow-green text-white px-10 py-5 rounded-full font-medium hover:bg-trailflow-green-dark transition-all duration-500 hover:shadow-2xl hover:scale-105"
            >
              Começar Agora
              <ArrowRight size={20} className="ml-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialFeaturedSections;
