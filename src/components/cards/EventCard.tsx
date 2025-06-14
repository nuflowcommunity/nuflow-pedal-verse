
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPin, Users, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  id: string;
  title: string;
  image?: string;
  image_url?: string;
  date: string;
  location: string;
  price: string;
  category: string;
  status?: string;
  difficulty?: string;
  distance?: string;
  registeredParticipants?: number;
  maxParticipants?: number;
  showBuyButton?: boolean;
}

const getDifficultyColor = (difficulty?: string) => {
  switch (difficulty?.toLowerCase()) {
    case 'iniciante':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'intermediario':
    case 'intermediário':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'avancado':
    case 'avançado':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'profissional':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'MTB':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'Speed':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Gravel':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Urbano':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const EventCard = ({ 
  id, 
  title, 
  image, 
  image_url, 
  date, 
  location, 
  price, 
  category,
  difficulty,
  distance,
  registeredParticipants = 0,
  maxParticipants,
  showBuyButton = false 
}: EventCardProps) => {
  const imageUrl = image || image_url || 'https://placehold.co/600x400?text=Evento+de+Ciclismo';
  const spotsLeft = maxParticipants ? maxParticipants - registeredParticipants : null;
  const isAlmostFull = spotsLeft !== null && spotsLeft <= 5 && spotsLeft > 0;
  const isFull = spotsLeft !== null && spotsLeft <= 0;
  
  return (
    <Link to={`/eventos/${id}`} className="group block polymer-product-card">
      <div className="bg-trailflow-white border border-trailflow-light/20 overflow-hidden transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
        <div className="relative polymer-aspect-editorial overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:blur-hover"
          />
          
          {/* Polymer overlay */}
          <div className="polymer-video-overlay absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Category Badge - Polymer Style */}
          <div className="absolute top-4 left-4">
            <Badge className={`${getCategoryColor(category)} border polymer-specs tracking-wider`}>
              {category}
            </Badge>
          </div>
          
          {/* Difficulty Badge */}
          {difficulty && (
            <div className="absolute top-4 right-4">
              <Badge className={`${getDifficultyColor(difficulty)} border polymer-specs tracking-wider`}>
                {difficulty}
              </Badge>
            </div>
          )}
          
          {/* Status Indicators - Polymer Style */}
          {isFull && (
            <div className="absolute bottom-4 left-4 bg-trailflow-dark text-white px-3 py-1 polymer-specs tracking-wider">
              Esgotado
            </div>
          )}
          {isAlmostFull && !isFull && (
            <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 polymer-specs tracking-wider">
              Últimas vagas
            </div>
          )}
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="polymer-heading text-xl text-trailflow-dark mb-4 leading-tight line-clamp-2 group-hover:text-trailflow-green transition-colors duration-300">
            {title}
          </h3>
          
          <div className="space-y-3 mb-6 flex-grow">
            <div className="flex items-center polymer-specs text-trailflow-medium tracking-wide">
              <CalendarIcon className="h-4 w-4 mr-3 text-trailflow-light" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center polymer-specs text-trailflow-medium tracking-wide">
              <MapPin className="h-4 w-4 mr-3 text-trailflow-light" />
              <span className="truncate">{location}</span>
            </div>
            
            {distance && (
              <div className="flex items-center polymer-specs text-trailflow-medium tracking-wide">
                <Zap className="h-4 w-4 mr-3 text-trailflow-light" />
                <span>{distance}</span>
              </div>
            )}
            
            {maxParticipants && (
              <div className="flex items-center polymer-specs text-trailflow-medium tracking-wide">
                <Users className="h-4 w-4 mr-3 text-trailflow-light" />
                <span>{registeredParticipants}/{maxParticipants} inscritos</span>
              </div>
            )}
          </div>
          
          <div className="polymer-editorial-line mb-6"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="polymer-heading text-2xl text-trailflow-dark mb-1">{price}</span>
              {price.toLowerCase().includes('gratuito') && (
                <span className="polymer-specs text-trailflow-green tracking-wider">
                  Inscrição gratuita
                </span>
              )}
            </div>
            
            {showBuyButton && (
              <Button 
                className="polymer-btn bg-trailflow-green text-white hover:bg-trailflow-green-dark transition-all duration-300 rounded-none px-6 py-2 flex items-center gap-2"
                disabled={isFull}
              >
                {isFull ? 'Esgotado' : (
                  <>
                    Inscrever-se
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
