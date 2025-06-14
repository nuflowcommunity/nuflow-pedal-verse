
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditorialHero from '@/components/home/EditorialHero';
import EditorialFeaturedEvents from '@/components/home/EditorialFeaturedEvents';
import EditorialFeaturedProducts from '@/components/home/EditorialFeaturedProducts';
import EditorialFeaturedSections from '@/components/home/EditorialFeaturedSections';
import PolymerEditorialSection from '@/components/home/PolymerEditorialSection';
import BackToTopButton from '@/components/BackToTopButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <EditorialHero />
        <PolymerEditorialSection />
        <EditorialFeaturedEvents />
        <EditorialFeaturedProducts />
        <EditorialFeaturedSections />
        <BackToTopButton />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
