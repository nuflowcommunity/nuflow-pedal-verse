
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementWizard from '@/components/announcements/AnnouncementWizard';

const NewAnnounce = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Polymer-style Background with Better Mobile Optimization */}
      <div className="fixed inset-0 -z-10">
        {/* Main background image with better mobile performance */}
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
      
      <main className="flex-grow polymer-section-large relative z-10">
        <div className="container-editorial">
          {/* Polymer-style Header with enhanced contrast and mobile optimization */}
          <div className="text-center polymer-center-massive">
            <div className="polymer-text-reveal animate">
              <h1 className="polymer-text-reveal-inner polymer-heading-lg text-gray-800 mb-8 sm:mb-12 lg:mb-16 drop-shadow-lg polymer-thin">
                Anunciar Bicicleta
              </h1>
            </div>
            <div className="polymer-editorial-line w-32 mx-auto mb-8 sm:mb-12"></div>
            <div className="container-polymer-ultra-narrow">
              <p className="polymer-body-large text-gray-700 px-4 drop-shadow-md polymer-light">
                Preencha os dados abaixo para anunciar sua bicicleta na maior comunidade de ciclistas do Brasil
              </p>
            </div>
          </div>

          <AnnouncementWizard />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewAnnounce;
