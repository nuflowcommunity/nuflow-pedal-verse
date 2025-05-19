import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Filter, Search, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/cards/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketHero from '@/components/market/MarketHero';
import SortFilter from '@/components/market/SortFilter';

// Sample data for products (combined bikes and parts)
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
    id: '9',
    title: 'Grupo SRAM XX1 Eagle',
    image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&w=600',
    price: 'R$ 4.990',
    location: 'São Paulo, SP',
    condition: 'Novo',
    brand: 'SRAM'
  },
  {
    id: '10',
    title: 'Rodas Mavic Crossmax Pro Carbon',
    image: 'https://images.unsplash.com/photo-1565965314243-4772d13a1e7a?auto=format&fit=crop&w=600',
    price: 'R$ 6.200',
    location: 'Rio de Janeiro, RJ',
    condition: 'Usado - Ótimo estado',
    brand: 'Mavic'
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
    id: '11',
    title: 'Capacete Specialized S-Works Prevail',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600',
    price: 'R$ 1.800',
    location: 'Florianópolis, SC',
    condition: 'Usado - Como novo',
    brand: 'Specialized'
  },
  {
    id: '12',
    title: 'Sapatilha Sidi Shot',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600',
    price: 'R$ 1.500',
    location: 'Porto Alegre, RS',
    condition: 'Usado - Bom estado',
    brand: 'Sidi'
  },
  {
    id: '4',
    title: 'Pinarello Dogma F12',
    image: 'https://images.unsplash.com/photo-1569943228307-a66beab7cd96?auto=format&fit=crop&w=600',
    price: 'R$ 32.000',
    location: 'Belo Horizonte, MG',
    condition: 'Novo',
    brand: 'Pinarello'
  }
];

// Product categories
const productCategories = [
  { id: 'all', name: 'Todos os produtos' },
  { id: 'bikes', name: 'Bikes' },
  { id: 'parts', name: 'Componentes' },
  { id: 'accessories', name: 'Acessórios' },
  { id: 'clothing', name: 'Vestuário' },
];

const Products = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-nuflow-moss text-white py-12">
          <div className="container-custom">
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Marketplace
            </h1>
            <p className="text-white/80 text-lg mb-6 max-w-3xl">
              Encontre bikes, componentes e acessórios para o seu estilo de pedal
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="relative w-full md:w-auto md:flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
                <input 
                  type="text" 
                  placeholder="O que você procura?" 
                  className="w-full pl-10 pr-4 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-nuflow-lime"
                />
              </div>
              <Button size="lg" className="bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90 rounded-full" asChild>
                <a href="/anunciar">
                  <Tag className="mr-2" size={20} />
                  Anunciar produto
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-8">
          <div className="container-custom">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-8">
                {productCategories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="py-3 data-[state=active]:bg-nuflow-moss data-[state=active]:text-white"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                  <h2 className="text-2xl font-heading font-semibold">
                    Todos os produtos ({products.length})
                  </h2>
                  
                  <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter size={18} />
                      Filtros
                    </Button>
                    
                    <SortFilter />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabsContent>
              
              {/* Additional tabs would be implemented similarly */}
              <TabsContent value="bikes" className="mt-0">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-heading font-semibold">Bikes</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabsContent>
              
              {/* Other tabs would follow similar pattern */}
            </Tabs>
            
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

export default Products;
