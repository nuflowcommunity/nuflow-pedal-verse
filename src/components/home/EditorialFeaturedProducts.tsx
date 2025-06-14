
import React, { useEffect, useState, useRef } from 'react';
import FeaturedProductCard from './products/FeaturedProductCard';
import SideProductCard from './products/SideProductCard';
import BottomProductCard from './products/BottomProductCard';
import ProductStats from './products/ProductStats';
import ProductsHeader from './products/ProductsHeader';
import { products } from './products/productsData';

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
        <ProductsHeader isVisible={isVisible} />

        {/* Products Grid with Staggered Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Featured Product - Hero Card */}
          <FeaturedProductCard 
            product={products[0]} 
            animateProducts={animateProducts}
            formatPrice={formatPrice}
          />
          
          {/* Side Products with Staggered Animation */}
          {products.slice(1, 3).map((product, index) => (
            <SideProductCard
              key={product.id}
              product={product}
              animateProducts={animateProducts}
              index={index}
              formatPrice={formatPrice}
            />
          ))}
          
          {/* Bottom Product - Wide Card with Animation */}
          <BottomProductCard 
            product={products[3]} 
            animateProducts={animateProducts}
            formatPrice={formatPrice}
          />
        </div>
        
        <ProductStats animateProducts={animateProducts} />
      </div>
    </section>
  );
};

export default EditorialFeaturedProducts;
