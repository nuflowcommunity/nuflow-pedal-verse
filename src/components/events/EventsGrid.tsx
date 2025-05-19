
import React from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EventCard from '@/components/cards/EventCard';
import { CalendarIcon, MapPin, ShoppingBag } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  price: string;
  category: string;
}

interface EventsGridProps {
  events: Event[];
}

const EventsGrid = ({ events }: EventsGridProps) => {
  return (
    <section className="py-12 bg-nuflow-sand">
      <div className="container-custom">
        <Tabs defaultValue="grid" className="w-full">
          <TabsContent value="grid" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} {...event} showBuyButton={true} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <div className="space-y-4">
              {events.map((event) => (
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
                      <div className="flex space-x-2">
                        <Button className="bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss transition-all">
                          Agendar
                        </Button>
                        <Button className="bg-[#11C76F] hover:bg-[#0EA55A] text-white flex items-center gap-1">
                          <ShoppingBag size={16} />
                          Comprar
                        </Button>
                      </div>
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
        
        {events.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-heading font-semibold mb-2">Nenhum evento encontrado</h3>
            <p className="text-nuflow-charcoal/70">Tente ajustar seus filtros ou faça uma nova busca.</p>
          </div>
        )}
        
        {events.length > 0 && (
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
  );
};

export default EventsGrid;
