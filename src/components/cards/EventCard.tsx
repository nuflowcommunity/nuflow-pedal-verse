
import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventCardProps {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  price: string;
  category: string;
}

const EventCard = ({ id, title, image, date, location, price, category }: EventCardProps) => {
  return (
    <div className="card-highlight group">
      <Link to={`/roles/${id}`}>
        <div className="card-tag">{category}</div>
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5">
          <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
          
          <div className="flex items-center text-sm text-nuflow-charcoal/70 mb-2">
            <Calendar size={16} className="mr-1" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center text-sm text-nuflow-charcoal/70 mb-3">
            <MapPin size={16} className="mr-1" />
            <span className="line-clamp-1">{location}</span>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="font-semibold text-nuflow-moss">{price}</span>
            <button className="btn-primary py-2 px-4">Agendar</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
