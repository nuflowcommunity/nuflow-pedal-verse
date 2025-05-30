
import React, { useEffect, useRef, useState } from 'react';
import { Bike, Calendar, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EditorialFeaturedSections = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const features = [
    {
      id: 1,
      icon: <Calendar size={32} className="text-trailflow-green" />,
      title: 'Rolês & Aventuras',
      description: 'Experiências épicas nas trilhas mais incríveis do Brasil. Guias especializados te levam aos lugares que você nunca imaginou.',
      link: '/roles',
      linkText: 'Descobrir Aventuras'
    },
    {
      id: 2,
      icon: <Bike size={32} className="text-trailflow-green" />,
      title: 'Marketplace Épico',
      description: 'As bikes mais cobiçadas e equipamentos premium. Encontre raridades e pechinchas que só existem aqui.',
      link: '/market',
      linkText: 'Explorar Produtos'
    },
    {
      id: 3,
      icon: <Users size={32} className="text-trailflow-green" />,
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
    <section ref={sectionRef} className="py-32 bg-trailflow-medium relative overflow-hidden">
      
      {/* Clean Editorial Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-trailflow-medium via-trailflow-medium/98 to-trailflow-dark/60"></div>
      
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.01]">
        <img 
          src="/lovable-uploads/adf44db0-c66b-4031-a615-a8e98fe5f77f.png" 
          alt="NuFlow Mountain Logo" 
          className="w-96 h-96 object-contain"
        />
      </div>
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className={`text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-tight transition-all duration-1200 ease-out font-mono ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            Sua Jornada
          </h2>
          <p className={`text-xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed transition-all duration-1200 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            Três universos conectados para transformar sua paixão pelo ciclismo
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`group transition-all duration-1200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ animationDelay: `${0.4 + (index * 0.2)}s` }}
            >
              <div className="bg-white/98 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 h-full hover:bg-white group-hover:border-trailflow-green/30">
                
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-trailflow-green/10 rounded-2xl flex items-center justify-center group-hover:bg-trailflow-green/20 transition-all duration-500 ease-out group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-trailflow-dark mb-4 group-hover:text-trailflow-medium transition-all duration-300 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-trailflow-medium/80 mb-8 leading-relaxed font-light">
                  {feature.description}
                </p>
                
                {/* Link */}
                <Link 
                  to={feature.link} 
                  className="inline-flex items-center text-trailflow-green font-medium hover:text-trailflow-dark transition-all duration-300 ease-out group-hover:translate-x-1"
                >
                  {feature.linkText}
                  <ArrowRight size={16} className="ml-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className={`text-center mt-20 transition-all duration-1200 ease-out delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-block bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-500">
            <h3 className="text-2xl font-bold text-white mb-4">Pronto para começar?</h3>
            <p className="text-white/80 mb-6 font-light">Junte-se a milhares de ciclistas que já transformaram sua paixão em aventura.</p>
            <Link 
              to="/login" 
              className="inline-flex items-center bg-trailflow-green text-white px-8 py-3 rounded-full font-medium hover:bg-trailflow-green/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
            >
              Começar Agora
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialFeaturedSections;
