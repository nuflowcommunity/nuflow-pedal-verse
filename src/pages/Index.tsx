
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/home/Hero';
import FeaturedSections from '../components/home/FeaturedSections';
import FeaturedEvents from '../components/home/FeaturedEvents';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CommunityHighlight from '../components/home/CommunityHighlight';
import CallToAction from '../components/home/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      
      <main>
        <Hero />
        <FeaturedSections />
        <FeaturedEvents />
        <FeaturedProducts />
        <CommunityHighlight />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
