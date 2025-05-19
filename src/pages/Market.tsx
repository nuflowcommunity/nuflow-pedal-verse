import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MarketHero from '@/components/market/MarketHero';
import ProductSearch from '@/components/market/ProductSearch';
import ProductsGrid from '@/components/market/ProductsGrid';
import BrandFilter from '@/components/market/BrandFilter';
import SortFilter from '@/components/market/SortFilter';

// Sample data for products - expanded from our featured products
const products = [
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

const Market = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <MarketHero 
          title="Marketplace" 
          description="Compre e venda bikes e acessórios na maior comunidade de ciclistas do Brasil"
        >
          <div className="flex space-x-4">
            <Button size="lg" className="bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90" asChild>
              <a href="/anunciar">
                <Bike className="mr-2" size={20} />
                Anunciar
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Como funciona
            </Button>
          </div>
        </MarketHero>

        <ProductSearch 
          additionalFilters={
            <>
              <BrandFilter />
              <SortFilter />
            </>
          }
        />

        <ProductsGrid 
          title="Produtos em destaque"
          products={products}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Market;
