import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, Clock, Share, Users } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import BackToTopButton from '@/components/BackToTopButton';

// Sample data for events - will be replaced with API data in a real app
const events = [
  {
    id: '1',
    title: 'Circuito Mantiqueira',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200',
    date: '27 Mai, 2024',
    time: '07:00 - 16:00',
    location: 'Serra da Mantiqueira, SP',
    price: 'R$ 180',
    category: 'MTB',
    organizer: 'Bike Brasil Adventures',
    description: 'Uma incrível aventura pelas trilhas da Serra da Mantiqueira. Percorra paisagens deslumbrantes e desafie seus limites neste percurso técnico e emocionante. Ideal para ciclistas experientes com boa resistência física.',
    distance: '45km',
    elevation: '1200m',
    difficulty: 'Difícil',
    maxParticipants: 50,
    registeredParticipants: 32,
    includes: ['Café da manhã', 'Suporte mecânico', 'Hidratação', 'Medalha de participação', 'Seguro de atividade'],
    meetingPoint: 'Praça Central, Campos do Jordão',
    googleMapsUrl: 'https://goo.gl/maps/123',
    requirements: ['Capacete obrigatório', 'Bicicleta em bom estado', 'Câmara de ar reserva', 'Caramanhola com água'],
    images: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600',
      'https://images.unsplash.com/photo-1586016413664-864c0dd76f53?auto=format&fit=crop&w=600',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600',
    ]
  },
  {
    id: '2',
    title: 'Pedal Costeiro Santos',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200',
    date: '03 Jun, 2024',
    time: '08:30 - 13:00',
    location: 'Santos, SP',
    price: 'R$ 120',
    category: 'Speed',
    organizer: 'Litoral Cycling Club',
    description: 'Um percurso deslumbrante pelo litoral paulista. Pedale pelas orlas de Santos e São Vicente, aproveitando a vista do mar e a brisa refrescante. Percurso plano e ideal para ciclistas de todos os níveis.',
    distance: '35km',
    elevation: '150m',
    difficulty: 'Fácil',
    maxParticipants: 80,
    registeredParticipants: 45,
    includes: ['Kit lanche', 'Suporte técnico', 'Hidratação', 'Foto oficial'],
    meetingPoint: 'Canal 2, Santos',
    googleMapsUrl: 'https://goo.gl/maps/456',
    requirements: ['Capacete obrigatório', 'Bicicleta speed ou híbrida'],
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600',
      'https://images.unsplash.com/photo-1535981767287-35259dbf7d0e?auto=format&fit=crop&w=600',
      'https://images.unsplash.com/photo-1508789454646-bef72439f197?auto=format&fit=crop&w=600',
    ]
  },
  // We keep the remaining events definition consistent with the original data structure...
];

const EventDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<any | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    const foundEvent = events.find((e) => e.id === eventId);
    if (foundEvent) {
      setEvent(foundEvent);
      setActiveImage(foundEvent.image);
    }
  }, [eventId]);
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container-custom py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Evento não encontrado</h1>
            <p className="mb-6">O evento que você está procurando não existe ou foi removido.</p>
            <Link to="/eventos">
              <Button>
                <ArrowLeft className="mr-2" size={18} />
                Voltar para Eventos
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Confira este evento: ${event.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // In a real app, show a toast notification
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-nuflow-mineral/10 py-3">
          <div className="container-custom">
            <nav className="flex items-center text-sm">
              <Link to="/" className="text-nuflow-charcoal/70 hover:text-nuflow-charcoal">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/eventos" className="text-nuflow-charcoal/70 hover:text-nuflow-charcoal">Eventos</Link>
              <span className="mx-2">/</span>
              <span className="text-nuflow-charcoal">{event.title}</span>
            </nav>
          </div>
        </div>
        
        {/* Back Button */}
        <div className="container-custom py-4">
          <Link to="/eventos" className="inline-flex items-center text-nuflow-moss hover:text-nuflow-neon transition-colors">
            <ArrowLeft size={18} className="mr-1" />
            <span>Voltar para todos os eventos</span>
          </Link>
        </div>
        
        {/* Event Detail Content */}
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-[400px] overflow-hidden">
                  <img 
                    src={activeImage} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-nuflow-lime text-nuflow-moss text-xs font-medium px-3 py-1 rounded-full">
                    {event.category}
                  </div>
                </div>
                
                <div className="p-4 overflow-x-auto">
                  <div className="flex gap-3">
                    {event.images.map((img: string, idx: number) => (
                      <div 
                        key={idx}
                        className={`cursor-pointer rounded-md overflow-hidden w-24 h-24 flex-shrink-0 border-2 transition-all ${activeImage === img ? 'border-nuflow-neon' : 'border-transparent hover:border-nuflow-moss/50'}`}
                        onClick={() => setActiveImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={`${event.title} thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Event Description */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md mt-8 p-6">
                <h2 className="text-xl font-semibold mb-4">Descrição do Evento</h2>
                <p className="text-nuflow-charcoal/80 mb-6">{event.description}</p>
                
                <h3 className="text-lg font-semibold mb-3">Detalhes do Percurso</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-nuflow-sand p-4 rounded-md">
                    <p className="text-sm text-nuflow-charcoal/60">Distância</p>
                    <p className="font-semibold">{event.distance}</p>
                  </div>
                  <div className="bg-nuflow-sand p-4 rounded-md">
                    <p className="text-sm text-nuflow-charcoal/60">Elevação</p>
                    <p className="font-semibold">{event.elevation}</p>
                  </div>
                  <div className="bg-nuflow-sand p-4 rounded-md">
                    <p className="text-sm text-nuflow-charcoal/60">Dificuldade</p>
                    <p className="font-semibold">{event.difficulty}</p>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-3">O que está incluído</h3>
                <ul className="list-disc pl-5 mb-6">
                  {event.includes.map((item: string, idx: number) => (
                    <li key={idx} className="text-nuflow-charcoal/80 mb-1">{item}</li>
                  ))}
                </ul>
                
                <h3 className="text-lg font-semibold mb-3">Requisitos</h3>
                <ul className="list-disc pl-5">
                  {event.requirements.map((item: string, idx: number) => (
                    <li key={idx} className="text-nuflow-charcoal/80 mb-1">{item}</li>
                  ))}
                </ul>
              </div>
              
              {/* Meeting Point Section */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md mt-8 p-6">
                <h2 className="text-xl font-semibold mb-4">Ponto de Encontro</h2>
                <p className="flex items-center text-nuflow-charcoal/80 mb-4">
                  <MapPin size={18} className="mr-2 text-nuflow-moss" />
                  {event.meetingPoint}
                </p>
                
                <div className="bg-gray-200 h-60 rounded-md flex items-center justify-center">
                  <p className="text-nuflow-charcoal/60">Mapa em desenvolvimento</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Event Info & Registration */}
            <div>
              <div className="bg-white rounded-lg overflow-hidden shadow-md p-6 sticky top-4">
                <h1 className="text-2xl font-heading font-bold mb-4">{event.title}</h1>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-xl text-nuflow-moss">{event.price}</span>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-nuflow-mineral/30 hover:bg-nuflow-mineral/10"
                    onClick={handleShare}
                  >
                    <Share size={16} />
                    <span className="ml-1">Compartilhar</span>
                  </Button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar size={18} className="text-nuflow-moss mr-3" />
                    <div>
                      <p className="font-medium">{event.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={18} className="text-nuflow-moss mr-3" />
                    <div>
                      <p className="font-medium">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin size={18} className="text-nuflow-moss mr-3" />
                    <div>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users size={18} className="text-nuflow-moss mr-3" />
                    <div>
                      <p className="font-medium">{event.registeredParticipants} / {event.maxParticipants} inscritos</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="mb-2 text-sm text-nuflow-charcoal/70">Organizado por</p>
                  <p className="font-medium">{event.organizer}</p>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss">
                    Inscrever-se Agora
                  </Button>
                  
                  <Button variant="outline" className="w-full border-nuflow-moss text-nuflow-moss hover:bg-nuflow-moss/10">
                    Adicionar ao Calendário
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Events Section */}
        <section className="py-12 bg-nuflow-sand">
          <div className="container-custom">
            <h2 className="text-2xl font-heading font-bold mb-8">Eventos Relacionados</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events
                .filter(e => e.id !== event.id && e.category === event.category)
                .slice(0, 4)
                .map(relatedEvent => (
                  <div key={relatedEvent.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <Link to={`/roles/${relatedEvent.id}`}>
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={relatedEvent.image} 
                          alt={relatedEvent.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-lg mb-2 hover:text-nuflow-neon transition-colors">{relatedEvent.title}</h3>
                        <div className="flex items-center text-sm text-nuflow-charcoal/70 mb-1">
                          <Calendar size={14} className="mr-1" />
                          <span>{relatedEvent.date}</span>
                        </div>
                        <div className="flex items-center text-sm text-nuflow-charcoal/70">
                          <MapPin size={14} className="mr-1" />
                          <span>{relatedEvent.location}</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </section>
        
        <BackToTopButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
