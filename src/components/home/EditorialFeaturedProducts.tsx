
import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: '1',
    title: 'Specialized Epic Carbon Pro',
    image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=800',
    price: 15990,
    originalPrice: 18500,
    location: 'São Paulo, SP',
    condition: 'Seminovo - Estado impecável',
    brand: 'Specialized',
    category: 'MTB',
    rating: 4.9,
    discount: 14,
    featured: true
  },
  {
    id: '2',
    title: 'Trek Madone SLR 7 Disc',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800',
    price: 23500,
    location: 'Curitiba, PR',
    condition: 'Novo na caixa',
    brand: 'Trek',
    category: 'Speed',
    rating: 5.0,
    featured: false
  },
  {
    id: '3',
    title: 'Cannondale Scalpel Carbon 2',
    image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=800',
    price: 18750,
    originalPrice: 21000,
    location: 'Rio de Janeiro, RJ',
    condition: 'Usado - Ótimo estado',
    brand: 'Cannondale',
    category: 'MTB',
    rating: 4.7,
    discount: 11
  },
  {
    id: '4',
    title: 'Pinarello Dogma F12',
    image: 'https://images.unsplash.com/photo-1569943228307-a66beab7cd96?auto=format&fit=crop&w=800',
    price: 32000,
    location: 'Belo Horizonte, MG',
    condition: 'Novo - Edição limitada',
    brand: 'Pinarello',
    category: 'Speed',
    rating: 5.0,
    featured: false
  }
];

const EditorialFeaturedProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-br from-trailflow-white to-trailflow-accent/40 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-trailflow-green/5 rounded-full editorial-float -translate-x-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-trailflow-accent rounded-full editorial-float translate-x-48 translate-y-32" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-modern relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16">
          <div className={`max-w-2xl ${isVisible ? 'editorial-enter' : 'opacity-0'}`}>
            <h2 className="editorial-title-mega text-trailflow-dark leading-none mb-6">
              Market
              <span className="text-trailflow-green block">place</span>
            </h2>
            <p className="editorial-subtitle text-trailflow-medium">
              Equipamentos premium e bikes dos sonhos esperando por você
            </p>
          </div>
          
          <Link 
            to="/marketplace" 
            className={`group flex items-center font-bold text-trailflow-green hover:text-trailflow-green-dark transition-all duration-300 mt-8 lg:mt-0 ${isVisible ? 'editorial-enter-delayed' : 'opacity-0'}`}
          >
            Ver Todos os Produtos
            <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>

        {/* Products Grid - Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 auto-rows-auto">
          
          {/* Featured Product - Hero Card */}
          <div className={`lg:col-span-8 ${isVisible ? 'editorial-enter' : 'opacity-0'}`}>
            <div className="editorial-card-advanced bg-white rounded-2xl overflow-hidden shadow-2xl relative group">
              {/* Featured Badge */}
              <div className="absolute top-6 left-6 z-20">
                <div className="flex items-center gap-2 bg-trailflow-green text-white px-4 py-2 rounded-full font-semibold">
                  <Zap size={16} />
                  Destaque Premium
                </div>
              </div>
              
              {/* Discount Badge */}
              {products[0].discount && (
                <div className="absolute top-6 right-6 z-20">
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{products[0].discount}%
                  </div>
                </div>
              )}
              
              <div className="grid lg:grid-cols-2 h-full">
                {/* Image Section */}
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <img 
                    src={products[0].image} 
                    alt={products[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:from-transparent"></div>
                  
                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all editorial-morph">
                      <Heart size={20} className="text-trailflow-green" />
                    </button>
                    <button className="bg-trailflow-green text-white p-2 rounded-full hover:bg-trailflow-green-dark transition-all editorial-morph">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-trailflow-accent text-trailflow-green px-3 py-1 rounded-full text-sm font-medium">
                        {products[0].category}
                      </span>
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{products[0].rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-trailflow-dark mb-3 group-hover:text-trailflow-green transition-colors">
                      {products[0].title}
                    </h3>
                    
                    <p className="text-trailflow-medium mb-4">{products[0].condition}</p>
                    <p className="text-sm text-trailflow-light mb-6">{products[0].location}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-end gap-3 mb-6">
                      <div className="text-4xl font-bold text-trailflow-green">
                        {formatPrice(products[0].price)}
                      </div>
                      {products[0].originalPrice && (
                        <div className="text-lg text-trailflow-light line-through">
                          {formatPrice(products[0].originalPrice)}
                        </div>
                      )}
                    </div>
                    
                    <button className="w-full bg-trailflow-green text-white py-4 rounded-xl font-bold text-lg hover:bg-trailflow-green-dark transition-all editorial-ripple">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Side Products */}
          <div className="lg:col-span-4 space-y-6">
            {products.slice(1, 3).map((product, index) => (
              <div 
                key={product.id} 
                className={`${isVisible ? `editorial-enter-delayed${index > 0 ? '-2' : ''}` : 'opacity-0'}`}
                style={{ animationDelay: `${(index + 1) * 0.2}s` }}
              >
                <div className="editorial-card-advanced bg-white rounded-xl overflow-hidden shadow-lg relative group">
                  {product.discount && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        -{product.discount}%
                      </div>
                    </div>
                  )}
                  
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 right-2 flex gap-1">
                      <button className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white transition-all">
                        <Heart size={14} className="text-trailflow-green" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-trailflow-accent text-trailflow-green px-2 py-1 rounded text-xs font-medium">
                        {product.category}
                      </span>
                      <div className="flex items-center">
                        <Star size={12} className="text-yellow-400 mr-1" />
                        <span className="text-xs">{product.rating}</span>
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-trailflow-dark mb-2 group-hover:text-trailflow-green transition-colors line-clamp-2">
                      {product.title}
                    </h4>
                    
                    <p className="text-xs text-trailflow-medium mb-3">{product.condition}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="text-lg font-bold text-trailflow-green">
                          {formatPrice(product.price)}
                        </div>
                        {product.originalPrice && (
                          <div className="text-xs text-trailflow-light line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                        )}
                      </div>
                      <button className="bg-trailflow-green text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-trailflow-green-dark transition-all">
                        Ver
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom Product - Wide Card */}
          <div className={`lg:col-span-12 ${isVisible ? 'editorial-diagonal' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <div className="editorial-card-advanced bg-gradient-to-r from-trailflow-green to-trailflow-green-dark text-white rounded-xl overflow-hidden shadow-xl">
              <div className="grid lg:grid-cols-4 items-center">
                <div className="lg:col-span-1 h-32 lg:h-auto">
                  <img 
                    src={products[3].image} 
                    alt={products[3].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:col-span-2 p-6">
                  <h4 className="text-2xl font-bold mb-2">{products[3].title}</h4>
                  <p className="text-white/90 mb-2">{products[3].condition}</p>
                  <p className="text-sm text-white/70">{products[3].location}</p>
                </div>
                <div className="lg:col-span-1 p-6 text-right">
                  <div className="text-3xl font-bold mb-4">{formatPrice(products[3].price)}</div>
                  <button className="bg-white text-trailflow-green px-6 py-3 rounded-lg font-bold hover:bg-trailflow-accent transition-all editorial-ripple">
                    Ver Produto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Stats */}
        <div className={`mt-16 text-center ${isVisible ? 'editorial-enter-delayed-2' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
          <div className="inline-flex items-center gap-8 bg-white px-12 py-6 rounded-2xl shadow-xl editorial-morph">
            <div>
              <div className="text-2xl font-bold text-trailflow-green">1.2k+</div>
              <div className="text-sm text-trailflow-medium">Produtos ativos</div>
            </div>
            <div className="w-px h-12 bg-trailflow-lighter"></div>
            <div>
              <div className="text-2xl font-bold text-trailflow-green">98%</div>
              <div className="text-sm text-trailflow-medium">Satisfação</div>
            </div>
            <div className="w-px h-12 bg-trailflow-lighter"></div>
            <div>
              <div className="text-2xl font-bold text-trailflow-green">24h</div>
              <div className="text-sm text-trailflow-medium">Entrega média</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialFeaturedProducts;
