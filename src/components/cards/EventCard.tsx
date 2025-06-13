
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Link to={`/eventos/${id}`}>
          <img 
            src={imageUrl} 
            alt={title} 
            className="h-48 w-full object-cover"
          />
        </Link>
        <span className="absolute top-3 right-3 bg-trailflow-green text-white text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="font-heading font-medium text-lg hover:text-trailflow-green transition-colors line-clamp-1">
          <Link to={`/eventos/${id}`}>
            {title}
          </Link>
        </h3>
        
        <div className="flex items-center mt-2 text-sm text-trailflow-medium">
          <CalendarIcon size={14} className="mr-1" />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center mt-1 text-sm text-trailflow-medium">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold text-trailflow-green">{price}</span>
          <Link to={`/eventos/${id}`}>
            <Button className="bg-trailflow-green text-white hover:bg-trailflow-green-dark py-1 h-8 px-4">
              <span className="text-xs">Ver detalhes</span>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
