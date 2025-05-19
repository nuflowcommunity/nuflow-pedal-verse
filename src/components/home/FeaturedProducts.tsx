
import React from 'react';
import ProductCard from '../cards/ProductCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample data for featured products
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
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-2">Destaques no Marketplace</h2>
            <p className="text-nuflow-charcoal/70">As melhores ofertas de bikes e acessórios</p>
          </div>
          <Link to="/market" className="mt-4 md:mt-0 flex items-center text-nuflow-moss font-medium hover:underline">
            Ver todos os produtos
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
