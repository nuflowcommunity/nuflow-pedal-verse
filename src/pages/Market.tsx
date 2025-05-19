
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Filter, Search, ArrowRight, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/cards/ProductCard';

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
        {/* Hero Section */}
        <section className="bg-nuflow-moss text-white py-12">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="max-w-xl mb-8 md:mb-0">
                <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">
                  Marketplace
                </h1>
                <p className="text-white/80 text-lg mb-6">
                  Compre e venda bikes e acessórios na maior comunidade de ciclistas do Brasil
                </p>
                <div className="flex space-x-4">
                  <Button size="lg" className="bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90">
                    <Bike className="mr-2" size={20} />
                    Anunciar
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Como funciona
                  </Button>
                </div>
              </div>
              <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm w-full md:w-auto">
                <h3 className="text-xl font-heading font-semibold mb-3">Encontre sua bike ideal</h3>
                <div className="grid grid-cols-2 gap-3">
                  <select className="px-4 py-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-nuflow-lime">
                    <option value="">Categoria</option>
                    <option value="MTB">MTB</option>
                    <option value="Speed">Speed</option>
                    <option value="Gravel">Gravel</option>
                    <option value="Urbano">Urbano</option>
                  </select>
                  <select className="px-4 py-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-nuflow-lime">
                    <option value="">Marca</option>
                    <option value="Specialized">Specialized</option>
                    <option value="Trek">Trek</option>
                    <option value="Cannondale">Cannondale</option>
                    <option value="Scott">Scott</option>
                  </select>
                  <select className="px-4 py-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-nuflow-lime">
                    <option value="">Tamanho</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                  <select className="px-4 py-2 rounded bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-nuflow-lime">
                    <option value="">Faixa de preço</option>
                    <option value="1">Até R$ 5.000</option>
                    <option value="2">R$ 5.000 - R$ 10.000</option>
                    <option value="3">R$ 10.000 - R$ 20.000</option>
                    <option value="4">Acima de R$ 20.000</option>
                  </select>
                </div>
                <Button className="w-full mt-3 bg-nuflow-lime text-nuflow-moss hover:bg-nuflow-lime/90">
                  Buscar
                  <ArrowRight size={16} className="ml-2" />
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
                  placeholder="Buscar produtos..." 
                  className="w-full pl-10 pr-4 py-3 border border-nuflow-mineral/30 rounded-md focus:outline-none focus:ring-2 focus:ring-nuflow-moss"
                />
              </div>
              
              <div className="flex items-center w-full md:w-auto gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter size={18} />
                  Filtros
                </Button>
                
                <select className="px-4 py-3 border border-nuflow-mineral/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-nuflow-moss">
                  <option value="">Todas as marcas</option>
                  <option value="Specialized">Specialized</option>
                  <option value="Trek">Trek</option>
                  <option value="Cannondale">Cannondale</option>
                  <option value="Scott">Scott</option>
                </select>
                
                <select className="px-4 py-3 border border-nuflow-mineral/30 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-nuflow-moss">
                  <option value="">Ordenar por</option>
                  <option value="recent">Mais recentes</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">
              Produtos em destaque
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
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

export default Market;
