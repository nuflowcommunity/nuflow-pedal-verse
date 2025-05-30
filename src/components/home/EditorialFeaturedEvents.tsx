
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Calendar, MapPin, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const events = [
  {
    id: '1',
    title: 'Circuito Épico Mantiqueira',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800',
    date: '27 Mai',
    location: 'Serra da Mantiqueira, SP',
    price: 'R$ 180',
    participants: 24,
    difficulty: 'Intermediário',
    category: 'MTB',
    featured: true
  },
  {
    id: '2',
    title: 'Pedal Costeiro Noturno',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800',
    date: '03 Jun',
    location: 'Santos, SP',
    price: 'R$ 120',
    participants: 18,
    difficulty: 'Fácil',
    category: 'Speed'
  },
  {
    id: '3',
    title: 'Aurora Trail Experience',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800',
    date: '15 Jun',
    location: 'Campos do Jordão, SP',
    price: 'R$ 220',
    participants: 12,
    difficulty: 'Avançado',
    category: 'Gravel'
  },
  {
    id: '4',
    title: 'Urban Night Ride SP',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800',
    date: '22 Jun',
    location: 'São Paulo, SP',
    price: 'R$ 90',
    participants: 32,
    difficulty: 'Fácil',
    category: 'Urbano'
  }
];

const EditorialFeaturedEvents = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section ref={sectionRef} className="py-32 bg-white relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-white"></div>
      
      <div className="container mx-auto px-8 sm:px-12 lg:px-16 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20">
          <div className={`max-w-2xl ${isVisible ? 'editorial-enter' : 'opacity-0'}`}>
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-bold text-trailflow-dark leading-[0.9] mb-8 font-mono">
              Próximos
              <span className="text-trailflow-dark block">Rolês</span>
            </h2>
            <p className="text-xl sm:text-2xl text-trailflow-medium leading-relaxed font-light max-w-lg">
              Aventuras selecionadas que vão expandir seus limites e conectar você com a natureza
            </p>
          </div>
          
          <Link 
            to="/roles" 
            className={`group flex items-center text-lg font-medium text-trailflow-dark hover:text-trailflow-medium transition-all duration-300 mt-8 lg:mt-0 ${isVisible ? 'editorial-enter-delayed' : 'opacity-0'}`}
          >
            Ver Calendário Completo
            <ArrowRight size={20} className="ml-3 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>

        {/* Events Grid - Masonry Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 auto-rows-auto">
          
          {/* Featured Event - Large Card */}
          <div className={`lg:col-span-7 lg:row-span-2 ${isVisible ? 'editorial-enter' : 'opacity-0'}`}>
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 h-full relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-80 lg:h-96 overflow-hidden">
                <img 
                  src={events[0].image} 
                  alt={events[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <span className="bg-white text-trailflow-dark px-4 py-2 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                </div>
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl">
                  <div className="text-trailflow-dark font-bold text-lg">{events[0].date}</div>
                  <div className="text-trailflow-medium text-xs uppercase tracking-wide">2024</div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-gray-100 text-trailflow-dark px-3 py-1 rounded-full text-sm font-medium">
                    {events[0].category}
                  </span>
                  <span className="text-gray-300 text-xs">•</span>
                  <span className="text-trailflow-medium text-sm">{events[0].difficulty}</span>
                </div>
                
                <h3 className="text-3xl font-bold text-trailflow-dark mb-4 group-hover:text-trailflow-medium transition-colors leading-tight">
                  {events[0].title}
                </h3>
                
                <div className="flex items-center text-trailflow-medium mb-6">
                  <MapPin size={18} className="mr-2" />
                  <span className="text-base">{events[0].location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-3xl font-bold text-trailflow-dark">{events[0].price}</div>
                    <div className="flex items-center text-trailflow-medium">
                      <Users size={18} className="mr-2" />
                      {events[0].participants} inscritos
                    </div>
                  </div>
                  <button className="bg-trailflow-dark text-white px-8 py-3 rounded-xl font-semibold hover:bg-trailflow-medium transition-colors">
                    Participar
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Smaller Event Cards */}
          {events.slice(1).map((event, index) => (
            <div 
              key={event.id} 
              className={`lg:col-span-5 ${index === 0 ? 'lg:row-span-1' : index === 1 ? 'lg:col-span-12 lg:row-span-1' : 'lg:col-span-5'} ${
                isVisible ? `editorial-enter-delayed${index > 0 ? '-2' : ''}` : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 1) * 0.2}s` }}
            >
              <div className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                index === 1 ? 'md:flex md:items-center' : ''
              }`}>
                <div className={`relative overflow-hidden ${index === 1 ? 'md:w-1/2 h-48 md:h-full' : 'h-48'}`}>
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg">
                    <div className="text-trailflow-dark font-bold text-sm">{event.date}</div>
                  </div>
                </div>
                
                <div className={`p-6 ${index === 1 ? 'md:w-1/2' : ''}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-gray-100 text-trailflow-dark px-3 py-1 rounded-full text-xs font-medium">
                      {event.category}
                    </span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-trailflow-dark mb-3 group-hover:text-trailflow-medium transition-colors leading-tight">
                    {event.title}
                  </h4>
                  
                  <div className="flex items-center text-trailflow-medium mb-4 text-sm">
                    <MapPin size={14} className="mr-2" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-trailflow-dark">{event.price}</div>
                    <div className="flex items-center text-trailflow-medium text-sm">
                      <Users size={14} className="mr-1" />
                      {event.participants}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className={`text-center mt-20 ${isVisible ? 'editorial-diagonal' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="inline-flex items-center gap-4 bg-gray-50 text-trailflow-dark px-8 py-4 rounded-2xl border border-gray-200">
            <Calendar size={24} />
            <span className="font-semibold text-lg">Mais de 50 eventos este mês</span>
            <Star size={20} className="text-yellow-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialFeaturedEvents;
