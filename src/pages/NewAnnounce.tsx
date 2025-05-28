
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AnnouncementWizard from '@/components/announcements/AnnouncementWizard';

const NewAnnounce = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2 text-nuflow-darkForest">
              Anunciar Bicicleta
            </h1>
            <p className="text-nuflow-charcoal/70 max-w-2xl mx-auto">
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
