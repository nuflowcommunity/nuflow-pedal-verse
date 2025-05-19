import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Bike, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarketHero from '@/components/market/MarketHero';
import BikeCategoryFilter from '@/components/market/BikeCategoryFilter';
import ProductsGrid from '@/components/market/ProductsGrid';
import BikeSearch from '@/components/market/BikeSearch';
import SortFilter from '@/components/market/SortFilter';
import ProductCard from '@/components/cards/ProductCard';

// Sample data for bikes
const bikes = [
  {
    id: '1',
    title: 'Specialized Epic Carbon',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=600',
    price: 'R$ 15.990',
    location: 'São Paulo, SP',
    condition: 'Usado - Ótimo estado',
    brand: 'Specialized'
  },
  {
    id: '2',
    title: 'Trek Madone SLR 7',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600',
    price: 'R$ 23.500',
    location: 'Curitiba, PR',
    condition: 'Usado - Como novo',
    brand: 'Trek'
  },
  {
    id: '3',
    title: 'Cannondale Scalpel Carbon 2',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=600',
    price: 'R$ 18.750',
    location: 'Rio de Janeiro, RJ',
    condition: 'Usado - Bom estado',
    brand: 'Cannondale'
  },
  {
    id: '4',
    title: 'Pinarello Dogma F12',
    image: 'https://images.unsplash.com/photo-1569943228307-a66beab7cd96?auto=format&fit=crop&w=600',
    price: 'R$ 32.000',
    location: 'Belo Horizonte, MG',
    condition: 'Novo',
    brand: 'Pinarello'
  },
  {
    id: '5',
    title: 'Scott Spark RC 900',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=600',
    price: 'R$ 19.890',
    location: 'Florianópolis, SC',
    condition: 'Usado - Bom estado',
    brand: 'Scott'
  },
  {
    id: '6',
    title: 'Giant Trance X Advanced Pro',
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?auto=format&fit=crop&w=600',
    price: 'R$ 22.450',
    location: 'Brasília, DF',
    condition: 'Usado - Ótimo estado',
    brand: 'Giant'
  },
  {
    id: '7',
    title: 'Santa Cruz Bronson Carbon',
    image: 'https://images.unsplash.com/photo-1533740566848-5f7d3e04e3d7?auto=format&fit=crop&w=600',
    price: 'R$ 26.900',
    location: 'Porto Alegre, RS',
    condition: 'Usado - Como novo',
    brand: 'Santa Cruz'
  },
  {
    id: '8',
    title: 'Cervélo R5 Disc',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=600',
    price: 'R$ 28.500',
    location: 'Salvador, BA',
    condition: 'Novo',
    brand: 'Cervélo'
  }
];

// Bike categories
const bikeCategories = [
  { id: 'mtb', name: 'Mountain Bike' },
  { id: 'road', name: 'Road Bike' },
  { id: 'gravel', name: 'Gravel' },
  { id: 'urban', name: 'Urbana' },
  { id: 'electric', name: 'E-Bike' },
  { id: 'kids', name: 'Infantil' },
];

const Bikes = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <MarketHero 
          title="Encontre sua bike ideal"
          description="Explore nossa seleção de bikes novas e usadas dos melhores fabricantes"
          showSearchForm={false}
        >
          <Button size="lg" className="bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90" asChild>
            <a href="/anunciar">
              <Bike className="mr-2" size={20} />
              Vender minha bike
            </a>
          </Button>
        </MarketHero>

        <div className="container-custom mt-6">
          <BikeSearch />
        </div>

        <BikeCategoryFilter 
          categories={bikeCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <section className="py-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-heading font-bold">
                Bikes ({bikes.length})
              </h2>
              
              <div className="flex items-center w-full md:w-auto gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal size={18} />
                  Filtros
                </Button>
                <SortFilter />
              </div>
            </div>
          </div>
        </section>

        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bikes.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" className="border-nuflow-moss text-nuflow-moss px-8">
              Carregar mais
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Bikes;
