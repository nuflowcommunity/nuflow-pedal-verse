
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
  const [animateProducts, setAnimateProducts] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            setAnimateProducts(true);
          }, 300);
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
    <section ref={sectionRef} className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-trailflow-green/3 rounded-full blur-3xl transform -translate-x-32 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-trailflow-accent/20 rounded-full blur-3xl transform translate-x-48 translate-y-32"></div>
      
      <div className="container-modern relative z-10">
        {/* Header with Entrance Animation */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-5xl md:text-7xl font-light text-trailflow-dark leading-none mb-6 uppercase tracking-[0.2em]">
              Market
              <span className="text-trailflow-green block">place</span>
            </h2>
            <p className="text-xl text-trailflow-medium max-w-2xl mx-auto font-light">
              Equipamentos premium e bikes dos sonhos esperando por você
            </p>
          </div>
          
          <Link 
            to="/marketplace" 
            className={`group inline-flex items-center font-medium text-trailflow-green hover:text-trailflow-green-dark transition-all duration-500 mt-8 uppercase tracking-wide text-sm ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Ver Todos os Produtos
            <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </div>

        {/* Products Grid with Staggered Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Featured Product - Hero Card */}
          <div className={`lg:col-span-2 transition-all duration-1000 ease-out ${animateProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 relative">
              {/* Featured Badge */}
              <div className="absolute top-6 left-6 z-20">
                <div className="flex items-center gap-2 bg-trailflow-green text-white px-4 py-2 rounded-full font-medium text-sm uppercase tracking-wide">
                  <Zap size={16} />
                  Destaque
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
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:from-transparent"></div>
                  
                  {/* Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-all duration-300 hover:scale-110">
                      <Heart size={20} className="text-trailflow-green" />
                    </button>
                    <button className="bg-trailflow-green text-white p-3 rounded-full hover:bg-trailflow-green-dark transition-all duration-300 hover:scale-110">
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-trailflow-accent text-trailflow-green px-3 py-1 rounded-full text-sm font-medium uppercase tracking-wide">
                        {products[0].category}
                      </span>
                      <div className="flex items-center">
                        <Star size={16} className="text-yellow-400 mr-1" fill="currentColor" />
                        <span className="text-sm font-medium">{products[0].rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-light text-trailflow-dark mb-3 uppercase tracking-wide leading-tight group-hover:text-trailflow-green transition-colors duration-300">
                      {products[0].title}
                    </h3>
                    
                    <p className="text-trailflow-medium mb-2 font-light">{products[0].condition}</p>
                    <p className="text-sm text-trailflow-light mb-6">{products[0].location}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-end gap-3 mb-6">
                      <div className="text-3xl md:text-4xl font-light text-trailflow-green">
                        {formatPrice(products[0].price)}
                      </div>
                      {products[0].originalPrice && (
                        <div className="text-lg text-trailflow-light line-through">
                          {formatPrice(products[0].originalPrice)}
                        </div>
                      )}
                    </div>
                    
                    <button className="w-full bg-trailflow-green text-white py-4 rounded-2xl font-medium text-lg hover:bg-trailflow-green-dark transition-all duration-300 hover:shadow-lg uppercase tracking-wide">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Side Products with Staggered Animation */}
          {products.slice(1, 3).map((product, index) => (
            <div 
              key={product.id} 
              className={`transition-all duration-1000 ease-out ${animateProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
            >
              <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 relative h-full">
                {product.discount && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{product.discount}%
                    </div>
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 hover:scale-110">
                      <Heart size={16} className="text-trailflow-green" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-trailflow-accent text-trailflow-green px-2 py-1 rounded text-xs font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                    <div className="flex items-center">
                      <Star size={12} className="text-yellow-400 mr-1" fill="currentColor" />
                      <span className="text-xs">{product.rating}</span>
                    </div>
                  </div>
                  
                  <h4 className="font-light text-lg text-trailflow-dark mb-2 uppercase tracking-wide group-hover:text-trailflow-green transition-colors duration-300 line-clamp-2 flex-1">
                    {product.title}
                  </h4>
                  
                  <p className="text-xs text-trailflow-medium mb-4 font-light">{product.condition}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                      <div className="text-xl font-light text-trailflow-green">
                        {formatPrice(product.price)}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xs text-trailflow-light line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                    </div>
                    <button className="bg-trailflow-green text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-trailflow-green-dark transition-all duration-300 hover:shadow-md uppercase tracking-wide">
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Bottom Product - Wide Card with Animation */}
          <div className={`lg:col-span-4 transition-all duration-1000 ease-out ${animateProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '600ms' }}>
            <div className="bg-gradient-to-r from-trailflow-green to-trailflow-green-dark text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group">
              <div className="grid lg:grid-cols-4 items-center">
                <div className="lg:col-span-1 h-40 lg:h-auto">
                  <img 
                    src={products[3].image} 
                    alt={products[3].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="lg:col-span-2 p-8">
                  <h4 className="text-2xl md:text-3xl font-light mb-2 uppercase tracking-wide">{products[3].title}</h4>
                  <p className="text-white/90 mb-2 font-light">{products[3].condition}</p>
                  <p className="text-sm text-white/70">{products[3].location}</p>
                </div>
                <div className="lg:col-span-1 p-8 text-right">
                  <div className="text-3xl md:text-4xl font-light mb-6">{formatPrice(products[3].price)}</div>
                  <button className="bg-white text-trailflow-green px-8 py-3 rounded-xl font-medium hover:bg-trailflow-accent transition-all duration-300 hover:shadow-lg uppercase tracking-wide">
                    Ver Produto
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Stats with Animation */}
        <div className={`mt-20 text-center transition-all duration-1000 ease-out ${animateProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
          <div className="inline-flex items-center gap-12 bg-white/80 backdrop-blur-sm px-16 py-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500">
            <div>
              <div className="text-3xl font-light text-trailflow-green">1.2k+</div>
              <div className="text-sm text-trailflow-medium uppercase tracking-wide">Produtos ativos</div>
            </div>
            <div className="w-px h-16 bg-trailflow-lighter"></div>
            <div>
              <div className="text-3xl font-light text-trailflow-green">98%</div>
              <div className="text-sm text-trailflow-medium uppercase tracking-wide">Satisfação</div>
            </div>
            <div className="w-px h-16 bg-trailflow-lighter"></div>
            <div>
              <div className="text-3xl font-light text-trailflow-green">24h</div>
              <div className="text-sm text-trailflow-medium uppercase tracking-wide">Entrega média</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialFeaturedProducts;
