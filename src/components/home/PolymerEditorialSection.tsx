
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PolymerEditorialSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const videos = [
    {
      url: 'https://videos.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Mountain Performance',
      subtitle: 'Desempenho em altitudes extremas'
    },
    {
      url: 'https://videos.unsplash.com/photo-1544191696-15693072f5a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      title: 'Urban Precision',
      subtitle: 'Precisão nas ruas da cidade'
    }
  ];

  const products = [
    {
      id: '1',
      name: 'Enhance Carbon Pro',
      category: 'Performance Wheelset',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800',
      specs: ['50mm depth', 'Carbon fiber', '1,420g'],
      price: 'R$ 8.500'
    },
    {
      id: '2',
      name: 'Venture Gravel System',
      category: 'Adventure Setup',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800',
      specs: ['Tubeless ready', 'All-terrain', '1,680g'],
      price: 'R$ 6.200'
    },
    {
      id: '3',
      name: 'Urban Flow Hub',
      category: 'City Components',
      image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=800',
      specs: ['Silent operation', 'Sealed bearings', '285g'],
      price: 'R$ 1.850'
    }
  ];

  return (
    <section ref={sectionRef} className="min-h-screen bg-white overflow-hidden">
      {/* Hero Video Section with Overlay Text */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-90"
          >
            <source src="https://videos.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" type="video/mp4" />
          </video>
        </div>
        
        {/* Overlay Content */}
        <div className={`relative z-10 text-center text-white transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light mb-8 tracking-[0.2em] uppercase">
            T R A I L F L O W
          </h1>
          <p className="text-xl md:text-2xl font-light mb-12 tracking-[0.1em] uppercase max-w-2xl mx-auto leading-relaxed">
            Equipment and components for high-performance bicycles
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group flex items-center gap-3 text-white hover:text-gray-300 transition-all duration-300 text-lg font-light tracking-wide uppercase">
              <Play size={20} className="transition-transform duration-300 group-hover:scale-110" />
              Explore Collection
            </button>
            <div className="w-px h-8 bg-white/30 hidden sm:block"></div>
            <Link 
              to="/marketplace" 
              className="group flex items-center gap-3 text-white hover:text-gray-300 transition-all duration-300 text-lg font-light tracking-wide uppercase"
            >
              Shop Now
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Editorial Grid Section */}
      <div className="container-editorial py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-[0.15em] uppercase text-trailflow-dark leading-none">
              Engineering<br />
              Excellence
            </h2>
            <p className="text-xl text-trailflow-medium font-light leading-relaxed mb-8">
              Cada componente é desenvolvido com precisão milimétrica, combinando tecnologia de ponta 
              com décadas de experiência em ciclismo de alta performance.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-trailflow-green"></div>
                <span className="text-sm font-light tracking-wider uppercase text-trailflow-medium">Carbon Fiber Technology</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-trailflow-green"></div>
                <span className="text-sm font-light tracking-wider uppercase text-trailflow-medium">Aerodynamic Optimization</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-trailflow-green"></div>
                <span className="text-sm font-light tracking-wider uppercase text-trailflow-medium">Precision Manufacturing</span>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '200ms' }}>
            <div className="aspect-square overflow-hidden bg-gray-100 group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=800" 
                alt="Engineering Excellence"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Products Grid - Editorial Style */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-light tracking-[0.1em] uppercase text-trailflow-dark mb-4">
              Featured Collection
            </h3>
            <p className="text-lg text-trailflow-medium font-light">
              Componentes selecionados para performance excepcional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className={`group cursor-pointer transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="aspect-square overflow-hidden mb-6 bg-gray-50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-90"
                  />
                </div>
                
                <div className="text-center">
                  <span className="text-xs font-light tracking-widest uppercase text-trailflow-light mb-2 block">
                    {product.category}
                  </span>
                  <h4 className="text-xl font-light tracking-wide uppercase text-trailflow-dark mb-4 group-hover:text-trailflow-green transition-colors duration-300">
                    {product.name}
                  </h4>
                  
                  <div className="space-y-1 mb-4">
                    {product.specs.map((spec, specIndex) => (
                      <div key={specIndex} className="text-sm text-trailflow-medium font-light">
                        {spec}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-lg font-light text-trailflow-dark mb-4">
                    {product.price}
                  </div>
                  
                  <button className="group/btn flex items-center justify-center gap-2 text-sm font-light tracking-wider uppercase text-trailflow-medium hover:text-trailflow-green transition-colors duration-300 mx-auto">
                    View Specs
                    <ChevronRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Width Image with Text Overlay */}
        <div className="relative h-96 md:h-[500px] overflow-hidden mb-32">
          <img 
            src="https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1920&q=80" 
            alt="Performance in Motion"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h3 className="text-4xl md:text-6xl font-light tracking-[0.15em] uppercase mb-4">
                Performance<br />in Motion
              </h3>
              <p className="text-lg font-light tracking-wide max-w-md mx-auto">
                Desenvolvido para ciclistas que buscam o máximo desempenho em qualquer terreno
              </p>
            </div>
          </div>
        </div>

        {/* Editorial Text Block */}
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-4xl font-light tracking-[0.1em] uppercase text-trailflow-dark mb-8">
            Design Philosophy
          </h3>
          <p className="text-lg text-trailflow-medium font-light leading-relaxed mb-8">
            Nossa filosofia de design combina função e forma em perfeita harmonia. Cada linha, cada curva, 
            cada especificação é cuidadosamente considerada para entregar não apenas performance superior, 
            mas também uma experiência estética que inspira confiança e paixão pelo ciclismo.
          </p>
          <Link 
            to="/sobre" 
            className="inline-flex items-center gap-3 text-trailflow-green hover:text-trailflow-green-dark transition-colors duration-300 text-lg font-light tracking-wide uppercase"
          >
            Read Our Story
            <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PolymerEditorialSection;
