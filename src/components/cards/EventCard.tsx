
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
  // Determine the correct link based on the current URL structure
  const linkPath = window.location.pathname.includes('/eventos') 
    ? `/eventos/${id}` 
    : `/roles/${id}`;
  
  return (
    <div className="card-highlight group bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg relative">
      <Link to={linkPath}>
        <div className="card-tag absolute top-4 left-4 z-10 bg-nuflow-lime text-nuflow-moss text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </div>
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-1 group-hover:text-nuflow-neon transition-colors">{title}</h3>
          
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
            <button className="py-2 px-4 rounded-full bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss transition-all">
              Agendar
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
