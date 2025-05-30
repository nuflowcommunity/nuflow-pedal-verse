
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EditorialHero from '../components/home/EditorialHero';
import EditorialFeaturedSections from '../components/home/EditorialFeaturedSections';
import EditorialFeaturedEvents from '../components/home/EditorialFeaturedEvents';
import EditorialFeaturedProducts from '../components/home/EditorialFeaturedProducts';
import CommunityHighlight from '../components/home/CommunityHighlight';
import CallToAction from '../components/home/CallToAction';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Navbar />
      
      <main>
        <EditorialHero />
        <EditorialFeaturedSections />
        <EditorialFeaturedEvents />
        <EditorialFeaturedProducts />
        <CommunityHighlight />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
