
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/cards/EventCard';

// Sample data for events - expanded from our featured events
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

const Roles = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-nuflow-moss py-16 md:py-24">
          <div className="container-custom text-white">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                Rolês & Passes
              </h1>
              <p className="text-lg text-white/80 mb-8">
                Descubra os melhores rolês pelas trilhas mais incríveis do Brasil.
                Escolha sua aventura e pedale com os melhores guias.
              </p>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Button size="lg" className="bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90">
                  <Calendar className="mr-2" size={20} />
                  Ver Calendário
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Encontre seu rolê ideal
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="py-8 border-b border-nuflow-mineral/20">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-auto flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nuflow-charcoal/50" size={20} />
                <input 
                  type="text" 
                  placeholder="Buscar rolês..." 
                  className="w-full pl-10 pr-4 py-3 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-moss"
                />
              </div>
              
              <div className="flex items-center w-full md:w-auto gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={18} />
                  Filtros
                </Button>
                
                <select className="px-4 py-3 border border-nuflow-mineral/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-nuflow-moss">
                  <option value="">Todos os tipos</option>
                  <option value="MTB">MTB</option>
                  <option value="Speed">Speed</option>
                  <option value="Gravel">Gravel</option>
                  <option value="Urbano">Urbano</option>
                </select>
                
                <select className="px-4 py-3 border border-nuflow-mineral/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-nuflow-moss">
                  <option value="">Data</option>
                  <option value="upcoming">Próximos 7 dias</option>
                  <option value="month">Este mês</option>
                  <option value="all">Todos</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
              Próximos Rolês
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" className="border-nuflow-moss text-nuflow-moss px-8">
                Carregar mais
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Roles;
