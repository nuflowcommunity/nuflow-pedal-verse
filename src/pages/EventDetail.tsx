
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, Clock, Share, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import BackToTopButton from '@/components/BackToTopButton';
import { getEventById } from '@/services/events';
import { Event } from '@/types/events';
import { TicketType } from '@/types/tickets';
import TicketTypeSelector from '@/components/events/TicketTypeSelector';
import PurchaseSection from '@/components/events/PurchaseSection';
import { useEventPurchase } from '@/hooks/useEventPurchase';
import { useToast } from '@/hooks/use-toast';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const { toast } = useToast();
  
  // Dados mockados para tipos de ingresso - em um app real viriam da API
  const mockTicketTypes: TicketType[] = [
    {
      id: '1',
      name: 'Ingresso Bike Lover',
      price: 59.00,
      description: 'Acesso completo ao evento com kit básico',
      available: true,
      maxQuantity: 2
    },
    {
      id: '2',
      name: 'Ingresso Premium',
      price: 89.00,
      description: 'Acesso VIP + kit premium + café da manhã',
      available: true,
      maxQuantity: 1
    },
    {
      id: '3',
      name: 'Ingresso Família',
      price: 150.00,
      description: 'Para até 4 pessoas - ideal para famílias',
      available: true,
      maxQuantity: 1
    }
  ];

  const {
    selectedTicketType,
    setSelectedTicketType,
    appliedCoupon,
    isProcessing,
    handleCouponApplied,
    handleCouponRemoved,
    handlePurchase
  } = useEventPurchase(id || '', mockTicketTypes);
  
  useEffect(() => {
    const loadEvent = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const eventData = await getEventById(id);
        if (eventData) {
          setEvent(eventData);
          setActiveImage(eventData.image || eventData.image_url || '');
        } else {
          toast({
            title: "Evento não encontrado",
            description: "O evento que você está procurando não existe.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error('Erro ao carregar evento:', error);
        toast({
          title: "Erro ao carregar evento",
          description: "Ocorreu um erro ao buscar os detalhes do evento.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [id, toast]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-trailflow-green mx-auto mb-4"></div>
            <p>Carregando evento...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
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
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link do evento foi copiado para a área de transferência."
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-trailflow-accent/10 py-3">
          <div className="container mx-auto px-4">
            <nav className="flex items-center text-sm">
              <Link to="/" className="text-trailflow-dark/70 hover:text-trailflow-dark">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/eventos" className="text-trailflow-dark/70 hover:text-trailflow-dark">Eventos</Link>
              <span className="mx-2">/</span>
              <span className="text-trailflow-dark">{event.title}</span>
            </nav>
          </div>
        </div>
        
        {/* Back Button */}
        <div className="container mx-auto px-4 py-4">
          <Link to="/eventos" className="inline-flex items-center text-trailflow-green hover:text-trailflow-green-dark transition-colors">
            <ArrowLeft size={18} className="mr-1" />
            <span>Voltar para todos os eventos</span>
          </Link>
        </div>
        
        {/* Event Detail Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Images */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-[400px] overflow-hidden">
                  <img 
                    src={activeImage || 'https://placehold.co/600x400?text=Sem+Imagem'} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-trailflow-green text-white text-xs font-medium px-3 py-1 rounded-full">
                    {event.category}
                  </div>
                </div>
                
                {event.images && event.images.length > 0 && (
                  <div className="p-4 overflow-x-auto">
                    <div className="flex gap-3">
                      {event.images.map((img: string, idx: number) => (
                        <div 
                          key={idx}
                          className={`cursor-pointer rounded-md overflow-hidden w-24 h-24 flex-shrink-0 border-2 transition-all ${activeImage === img ? 'border-trailflow-green' : 'border-transparent hover:border-trailflow-green/50'}`}
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
                )}
              </div>
              
              {/* Event Description */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Descrição do Evento</h2>
                <p className="text-trailflow-dark/80 mb-6">
                  {event.description || 'Descrição não disponível.'}
                </p>
                
                {(event.distance || event.elevation || event.difficulty) && (
                  <>
                    <h3 className="text-lg font-semibold mb-3">Detalhes do Percurso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {event.distance && (
                        <div className="bg-trailflow-accent p-4 rounded-md">
                          <p className="text-sm text-trailflow-dark/60">Distância</p>
                          <p className="font-semibold">{event.distance}</p>
                        </div>
                      )}
                      {event.elevation && (
                        <div className="bg-trailflow-accent p-4 rounded-md">
                          <p className="text-sm text-trailflow-dark/60">Elevação</p>
                          <p className="font-semibold">{event.elevation}</p>
                        </div>
                      )}
                      {event.difficulty && (
                        <div className="bg-trailflow-accent p-4 rounded-md">
                          <p className="text-sm text-trailflow-dark/60">Dificuldade</p>
                          <p className="font-semibold">{event.difficulty}</p>
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {event.includes && event.includes.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mb-3">O que está incluído</h3>
                    <ul className="list-disc pl-5 mb-6">
                      {event.includes.map((item: string, idx: number) => (
                        <li key={idx} className="text-trailflow-dark/80 mb-1">{item}</li>
                      ))}
                    </ul>
                  </>
                )}
                
                {event.requirements && event.requirements.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mb-3">Requisitos</h3>
                    <ul className="list-disc pl-5">
                      {event.requirements.map((item: string, idx: number) => (
                        <li key={idx} className="text-trailflow-dark/80 mb-1">{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              {/* Ticket Types Section */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                <TicketTypeSelector
                  ticketTypes={mockTicketTypes}
                  selectedTicketType={selectedTicketType}
                  onTicketTypeChange={setSelectedTicketType}
                />
              </div>
              
              {/* Meeting Point Section */}
              {event.meetingPoint && (
                <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Ponto de Encontro</h2>
                  <p className="flex items-center text-trailflow-dark/80 mb-4">
                    <MapPin size={18} className="mr-2 text-trailflow-green" />
                    {event.meetingPoint}
                  </p>
                  
                  <div className="bg-gray-200 h-60 rounded-md flex items-center justify-center">
                    <p className="text-trailflow-dark/60">Mapa em desenvolvimento</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Event Info & Purchase */}
            <div className="space-y-6">
              {/* Event Basic Info */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md p-6">
                <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-xl text-trailflow-green">{event.price}</span>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-trailflow-green/30 hover:bg-trailflow-green/10"
                    onClick={handleShare}
                  >
                    <Share size={16} />
                    <span className="ml-1">Compartilhar</span>
                  </Button>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Calendar size={18} className="text-trailflow-green mr-3" />
                    <div>
                      <p className="font-medium">{event.date}</p>
                    </div>
                  </div>
                  
                  {event.time && (
                    <div className="flex items-center">
                      <Clock size={18} className="text-trailflow-green mr-3" />
                      <div>
                        <p className="font-medium">{event.time}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <MapPin size={18} className="text-trailflow-green mr-3" />
                    <div>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>
                  
                  {(event.registeredParticipants !== undefined && event.maxParticipants) && (
                    <div className="flex items-center">
                      <Users size={18} className="text-trailflow-green mr-3" />
                      <div>
                        <p className="font-medium">{event.registeredParticipants} / {event.maxParticipants} inscritos</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {event.organizer && (
                  <div className="mb-6">
                    <p className="mb-2 text-sm text-trailflow-dark/70">Organizado por</p>
                    <p className="font-medium">{event.organizer}</p>
                  </div>
                )}
              </div>
              
              {/* Purchase Section */}
              <PurchaseSection
                eventId={event.id}
                selectedTicketType={selectedTicketType}
                ticketTypes={mockTicketTypes}
                appliedCoupon={appliedCoupon}
                onCouponApplied={handleCouponApplied}
                onCouponRemoved={handleCouponRemoved}
                onPurchase={handlePurchase}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        </div>
        
        <BackToTopButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default EventDetail;
