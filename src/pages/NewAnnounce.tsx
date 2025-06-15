
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementWizard from '@/components/announcements/AnnouncementWizard';

const NewAnnounce = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow py-8 sm:py-12 lg:py-16">
        <div className="container-modern">
          {/* Polymer-style Header */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="polymer-text-reveal animate">
              <h1 className="polymer-text-reveal-inner polymer-heading-md text-trailflow-dark mb-4 sm:mb-6">
                Anunciar Bicicleta
              </h1>
            </div>
            <div className="polymer-editorial-line w-24 mx-auto mb-6"></div>
            <p className="polymer-body-large text-trailflow-medium max-w-2xl mx-auto px-4">
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
