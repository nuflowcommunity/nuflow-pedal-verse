import React, { useState } from 'react';
import { Calendar as CalendarIcon, Filter, Grid, List, Map, Search, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventCard from '@/components/cards/EventCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-nuflow-moss to-nuflow-green py-16 md:py-24">
          <div className="container-custom text-white">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Calendário de Eventos
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Descubra os melhores rolês pelas trilhas mais incríveis do Brasil.
                Escolha sua aventura e pedale com os melhores guias.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  className="bg-nuflow-lime text-nuflow-moss hover:bg-white hover:text-nuflow-neon transition-all"
                >
                  <CalendarIcon className="mr-2" size={20} />
                  Ver Calendário
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/20 transition-all"
                >
                  Encontre seu rolê ideal
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Breadcrumbs */}
        <section className="bg-nuflow-sand py-3">
          <div className="container-custom">
            <nav className="text-sm text-nuflow-charcoal/70">
              <ol className="flex items-center space-x-2">
                <li><a href="/" className="hover:text-nuflow-neon transition-colors">Home</a></li>
                <li className="flex items-center space-x-2">
                  <span>/</span>
                  <span className="font-medium text-nuflow-charcoal">Eventos</span>
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* View Options and Search */}
        <section className="py-6 bg-white border-b border-nuflow-mineral/20">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <Tabs defaultValue="grid" className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                  <TabsTrigger value="grid" className="flex items-center gap-2">
                    <Grid size={16} />
                    <span className="hidden sm:inline">Grid</span>
                  </TabsTrigger>
                  <TabsTrigger value="list" className="flex items-center gap-2">
                    <List size={16} />
                    <span className="hidden sm:inline">Lista</span>
                  </TabsTrigger>
                  <TabsTrigger value="map" className="flex items-center gap-2">
                    <Map size={16} />
                    <span className="hidden sm:inline">Mapa</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="relative w-full md:w-auto flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-nuflow-charcoal/50" size={20} />
                <Input 
                  type="text" 
                  placeholder="Buscar rolês..." 
                  className="pl-10 pr-4 py-6 w-full border border-nuflow-mineral/30 focus:ring-2 focus:ring-nuflow-neon focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-4 bg-nuflow-sand">
          <div className="container-custom">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={
                    activeCategory === category 
                      ? "bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss" 
                      : "border-nuflow-moss text-nuflow-moss hover:bg-nuflow-moss/10"
                  }
                >
                  {category}
                </Button>
              ))}
              
              <Button 
                variant="outline" 
                className="ml-auto border-nuflow-moss text-nuflow-moss hover:bg-nuflow-moss/10 flex items-center"
              >
                <Filter size={16} className="mr-2" />
                Mais Filtros
              </Button>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-12 bg-nuflow-sand">
          <div className="container-custom">
            <Tabs defaultValue="grid" className="w-full">
              <TabsContent value="grid" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} {...event} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="mt-0">
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} className="flex flex-col md:flex-row overflow-hidden hover:shadow-md transition-shadow">
                      <div className="md:w-1/4 h-48 md:h-auto">
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 p-6">
                        <CardHeader className="p-0 pb-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="hover:text-nuflow-neon transition-colors">{event.title}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <MapPin size={14} className="mr-1" />
                                {event.location}
                              </CardDescription>
                            </div>
                            <span className="bg-nuflow-lime text-nuflow-moss text-xs font-medium px-3 py-1 rounded-full">
                              {event.category}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0 py-4">
                          <div className="flex items-center text-sm">
                            <CalendarIcon size={14} className="mr-1" />
                            <span>{event.date}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center p-0 pt-2">
                          <span className="font-semibold text-nuflow-moss">{event.price}</span>
                          <Button className="bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss transition-all">
                            Agendar
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="map" className="mt-0">
                <div className="h-[60vh] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-nuflow-charcoal/70">Visualização de mapa em desenvolvimento</p>
                </div>
              </TabsContent>
            </Tabs>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-2xl font-heading font-semibold mb-2">Nenhum evento encontrado</h3>
                <p className="text-nuflow-charcoal/70">Tente ajustar seus filtros ou faça uma nova busca.</p>
              </div>
            )}
            
            {filteredEvents.length > 0 && (
              <div className="mt-12 text-center">
                <Button 
                  variant="outline" 
                  className="border-nuflow-moss text-nuflow-moss hover:bg-nuflow-moss hover:text-white px-8"
                >
                  Carregar mais
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Back to top button */}
        <div className="fixed right-8 bottom-8 z-10">
          <Button 
            className="rounded-full w-12 h-12 bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss transition-all shadow-lg flex items-center justify-center p-0"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-up">
              <path d="m5 12 7-7 7 7"/>
              <path d="M12 19V5"/>
            </svg>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EventsCalendar;
