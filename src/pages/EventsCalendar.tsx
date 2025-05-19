
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsHero from '@/components/events/EventsHero';
import EventsBreadcrumb from '@/components/events/EventsBreadcrumb';
import EventsSearch from '@/components/events/EventsSearch';
import EventsCategoryFilter from '@/components/events/EventsCategoryFilter';
import EventsGrid from '@/components/events/EventsGrid';
import BackToTopButton from '@/components/BackToTopButton';

// Sample data for events
const events = [
  {
    id: '1',
    title: 'Circuito Mantiqueira',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600',
    date: '27 Mai, 2024',
    location: 'Serra da Mantiqueira, SP',
    price: 'R$ 180',
    category: 'MTB'
  },
  {
    id: '2',
    title: 'Pedal Costeiro Santos',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600',
    date: '03 Jun, 2024',
    location: 'Santos, SP',
    price: 'R$ 120',
    category: 'Speed'
  },
  {
    id: '3',
    title: 'Aurora Trail Experience',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=600',
    date: '15 Jun, 2024',
    location: 'Campos do Jordão, SP',
    price: 'R$ 220',
    category: 'Gravel'
  },
  {
    id: '4',
    title: 'São Paulo Night Ride',
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600',
    date: '22 Jun, 2024',
    location: 'São Paulo, SP',
    price: 'R$ 90',
    category: 'Urbano'
  },
  {
    id: '5',
    title: 'Vale do Paraíba Tour',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600',
    date: '05 Jul, 2024',
    location: 'Vale do Paraíba, SP',
    price: 'R$ 160',
    category: 'Gravel'
  },
  {
    id: '6',
    title: 'Trilhas de Itatiaia',
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=600',
    date: '12 Jul, 2024',
    location: 'Itatiaia, RJ',
    price: 'R$ 200',
    category: 'MTB'
  },
  {
    id: '7',
    title: 'Cicloturismo Litoral Norte',
    image: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=600',
    date: '19 Jul, 2024',
    location: 'Ubatuba, SP',
    price: 'R$ 280',
    category: 'Speed'
  },
  {
    id: '8',
    title: 'Serra do Mar Adventure',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=600',
    date: '26 Jul, 2024',
    location: 'Cubatão, SP',
    price: 'R$ 190',
    category: 'MTB'
  }
];

const categories = ['Todos', 'MTB', 'Speed', 'Gravel', 'Urbano'];

const EventsCalendar = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter events based on active category and search query
  const filteredEvents = events.filter(event => {
    const matchesCategory = activeCategory === 'Todos' || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <EventsHero />
        <EventsBreadcrumb />
        <EventsSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <EventsCategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
        <EventsGrid events={filteredEvents} />
        <BackToTopButton />
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsCalendar;
