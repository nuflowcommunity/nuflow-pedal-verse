
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementWizard from '@/components/announcements/AnnouncementWizard';

const NewAnnounce = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Polymer-style Background */}
      <div className="fixed inset-0 -z-10">
        {/* Main background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=80')`
          }}
        />
        
        {/* Polymer-style overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-trailflow-accent/20" />
        
        {/* Additional subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>

      <Navbar />
      
      <main className="flex-grow py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="container-modern">
          {/* Polymer-style Header with enhanced contrast */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="polymer-text-reveal animate">
              <h1 className="polymer-text-reveal-inner polymer-heading-md text-gray-800 mb-4 sm:mb-6 drop-shadow-lg">
                Anunciar Bicicleta
              </h1>
            </div>
            <div className="polymer-editorial-line w-24 mx-auto mb-6"></div>
            <p className="polymer-body-large text-gray-700 max-w-2xl mx-auto px-4 drop-shadow-md">
              Preencha os dados abaixo para anunciar sua bicicleta na maior comunidade de ciclistas do Brasil
            </p>
          </div>

          <AnnouncementWizard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewAnnounce;
