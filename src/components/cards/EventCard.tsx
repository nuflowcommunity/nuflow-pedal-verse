
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { CalendarIcon, MapPin, Users, Zap } from 'lucide-react';
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
      return 'bg-green-100 text-green-800';
    case 'intermediario':
    case 'intermediário':
      return 'bg-yellow-100 text-yellow-800';
    case 'avancado':
    case 'avançado':
      return 'bg-red-100 text-red-800';
    case 'profissional':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'MTB':
      return 'bg-emerald-100 text-emerald-800';
    case 'Speed':
      return 'bg-blue-100 text-blue-800';
    case 'Gravel':
      return 'bg-orange-100 text-orange-800';
    case 'Urbano':
      return 'bg-indigo-100 text-indigo-800';
    default:
      return 'bg-gray-100 text-gray-800';
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
    <Link to={`/eventos/${id}`} className="group block">
      <Card className="overflow-hidden bg-white shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Category Badge */}
          <Badge className={`absolute top-3 left-3 ${getCategoryColor(category)} border-0`}>
            {category}
          </Badge>
          
          {/* Difficulty Badge */}
          {difficulty && (
            <Badge className={`absolute top-3 right-3 ${getDifficultyColor(difficulty)} border-0`}>
              {difficulty}
            </Badge>
          )}
          
          {/* Status Indicators */}
          {isFull && (
            <div className="absolute bottom-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              Esgotado
            </div>
          )}
          {isAlmostFull && !isFull && (
            <div className="absolute bottom-3 left-3 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
              Últimas vagas
            </div>
          )}
        </div>
        
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="font-semibold text-lg text-gray-900 mb-3 leading-tight line-clamp-2 group-hover:text-trailflow-green transition-colors">
            {title}
          </h3>
          
          <div className="space-y-2 mb-4 flex-grow">
            <div className="flex items-center text-sm text-gray-600">
              <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              <span className="truncate">{location}</span>
            </div>
            
            {distance && (
              <div className="flex items-center text-sm text-gray-600">
                <Zap className="h-4 w-4 mr-2 text-gray-400" />
                <span>{distance}</span>
              </div>
            )}
            
            {maxParticipants && (
              <div className="flex items-center text-sm text-gray-600">
                <Users className="h-4 w-4 mr-2 text-gray-400" />
                <span>{registeredParticipants}/{maxParticipants} inscritos</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900">{price}</span>
              {price.toLowerCase().includes('gratuito') && (
                <span className="text-xs text-green-600 font-medium">Inscrição gratuita</span>
              )}
            </div>
            
            {showBuyButton && (
              <Button 
                size="sm" 
                className="bg-trailflow-green hover:bg-trailflow-green-dark text-white"
                disabled={isFull}
              >
                {isFull ? 'Esgotado' : 'Inscrever-se'}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default EventCard;
