
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { CalendarIcon, MapPin, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventCardProps {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  price: string;
  category: string;
  showBuyButton?: boolean;
}

const EventCard = ({ id, title, image, date, location, price, category, showBuyButton = false }: EventCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Link to={`/eventos/${id}`}>
          <img 
            src={image} 
            alt={title} 
            className="h-48 w-full object-cover"
          />
        </Link>
        <span className="absolute top-3 right-3 bg-nuflow-lime text-nuflow-moss text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </span>
      </div>
      
      <div className="p-4">
        <h3 className="font-heading font-medium text-lg hover:text-nuflow-neon transition-colors line-clamp-1">
          <Link to={`/eventos/${id}`}>
            {title}
          </Link>
        </h3>
        
        <div className="flex items-center mt-2 text-sm text-nuflow-charcoal/80">
          <CalendarIcon size={14} className="mr-1" />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center mt-1 text-sm text-nuflow-charcoal/80">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <span className="font-semibold text-nuflow-moss">{price}</span>
          <div className="flex space-x-2">
            {showBuyButton ? (
              <Button className="bg-[#11C76F] hover:bg-[#0EA55A] text-white flex items-center gap-1 py-1 h-8 px-3">
                <ShoppingBag size={14} />
                <span className="text-xs">Comprar</span>
              </Button>
            ) : null}
            <Button className="bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss py-1 h-8 px-3">
              <span className="text-xs">Detalhes</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
