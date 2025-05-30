
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
    <section ref={sectionRef} className="section-padding bg-trailflow-medium relative overflow-hidden">
      
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
      
      <div className="container mx-auto px-8 sm:px-12 lg:px-16 max-w-7xl relative z-10">
        
        {/* Enhanced Title Section */}
        <div className="text-center mb-24">
          <div className="breathing-room-lg">
            <h2 className={`text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-12 leading-tight transition-all duration-1200 ease-out font-mono ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              Sua Jornada
            </h2>
            <p className={`text-2xl sm:text-3xl text-white/90 max-w-5xl mx-auto font-light leading-relaxed transition-all duration-1200 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              Três universos conectados para transformar sua paixão pelo ciclismo
            </p>
          </div>
        </div>

        {/* Enhanced Grid with Better Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {features.map((feature, index) => (
            <div 
              key={feature.id} 
              className={`group transition-all duration-1200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ animationDelay: `${0.4 + (index * 0.2)}s` }}
            >
              <div className="bg-white/98 backdrop-blur-sm border border-white/20 rounded-3xl breathing-room-lg hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-3 h-full hover:bg-white group-hover:border-trailflow-green/30">
                
                {/* Icon with Enhanced Spacing */}
                <div className="mb-8">
                  <div className="w-20 h-20 bg-trailflow-green/10 rounded-3xl flex items-center justify-center group-hover:bg-trailflow-green/20 transition-all duration-500 ease-out group-hover:scale-110">
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content with Perfect Typography */}
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-trailflow-dark group-hover:text-trailflow-medium transition-all duration-300 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xl text-trailflow-medium/80 leading-relaxed font-light">
                    {feature.description}
                  </p>
                  
                  {/* Link with Enhanced Spacing */}
                  <div className="pt-4">
                    <Link 
                      to={feature.link} 
                      className="inline-flex items-center text-lg text-trailflow-green font-medium hover:text-trailflow-dark transition-all duration-300 ease-out group-hover:translate-x-1"
                    >
                      {feature.linkText}
                      <ArrowRight size={18} className="ml-3 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enhanced CTA with Perfect Spacing */}
        <div className={`text-center mt-32 transition-all duration-1200 ease-out delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-block bg-white/10 backdrop-blur-lg breathing-room-xl rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-500">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white">Pronto para começar?</h3>
              <p className="text-xl text-white/90 font-light leading-relaxed">Junte-se a milhares de ciclistas que já transformaram sua paixão em aventura.</p>
              <Link 
                to="/login" 
                className="inline-flex items-center bg-trailflow-green text-white px-10 py-4 rounded-full font-medium text-lg hover:bg-trailflow-green/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
              >
                Começar Agora
                <ArrowRight size={20} className="ml-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialFeaturedSections;
