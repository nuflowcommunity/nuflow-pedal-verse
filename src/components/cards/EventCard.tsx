
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { CalendarIcon, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  showBuyButton?: boolean;
}

const EventCard = ({ 
  id, 
  title, 
  image, 
  image_url, 
  date, 
  location, 
  price, 
  category, 
  showBuyButton = false 
}: EventCardProps) => {
  const imageUrl = image || image_url || 'https://placehold.co/600x400?text=Sem+Imagem';
  
  return (
    <Link to={`/eventos/${id}`} className="group block">
      <Card className="overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
        <div className="relative">
          <div className="aspect-[4/3] overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-90"
            />
          </div>
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-normal px-3 py-1 rounded-full uppercase tracking-wide">
            {category}
          </span>
        </div>
        
        <div className="p-6 text-center">
          <h3 className="font-light text-lg text-gray-900 mb-3 uppercase tracking-wide leading-tight">
            {title}
          </h3>
          
          <div className="flex items-center justify-center mb-2 text-sm text-gray-500">
            <CalendarIcon size={14} className="mr-2" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center justify-center mb-4 text-sm text-gray-500">
            <MapPin size={14} className="mr-2" />
            <span>{location}</span>
          </div>
          
          <div className="flex justify-center items-center">
            <span className="font-normal text-gray-900 text-lg">{price}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default EventCard;
