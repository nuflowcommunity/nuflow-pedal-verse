
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

const Sobre = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-nuflow-moss text-white py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Conheça a Nuflow
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8">
                Conectando ciclistas e construindo uma comunidade apaixonada por duas rodas.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-nuflow-sand">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-heading font-bold mb-6">Nossa Missão</h2>
                <p className="text-lg mb-6">
                  A Nuflow nasceu da paixão por ciclismo e da necessidade de criar uma comunidade 
                  integrada onde ciclistas possam compartilhar experiências, encontrar novos percursos, 
                  comprar e vender equipamentos, e se conectar com pessoas que compartilham a mesma paixão.
                </p>
                <p className="text-lg mb-6">
                  Nosso objetivo é transformar a maneira como os ciclistas se conectam, oferecendo 
                  uma plataforma completa que atenda todas as necessidades dos amantes de bicicletas, 
                  desde iniciantes até profissionais experientes.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80" 
                  alt="Ciclistas em grupo" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-heading font-bold mb-12 text-center">Nossos Valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border border-nuflow-mineral/20 rounded-lg hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-full bg-nuflow-lime flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-nuflow-moss" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Comunidade</h3>
                <p>
                  Acreditamos no poder da comunidade para transformar experiências. Unidos pela paixão 
                  do ciclismo, criamos conexões que vão além das pedaladas.
                </p>
              </div>
              
              <div className="p-6 border border-nuflow-mineral/20 rounded-lg hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-full bg-nuflow-lime flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-nuflow-moss" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustentabilidade</h3>
                <p>
                  Promovemos o ciclismo como uma forma de transporte sustentável e incentivamos 
                  práticas que ajudam a preservar o meio ambiente para as futuras gerações.
                </p>
              </div>
              
              <div className="p-6 border border-nuflow-mineral/20 rounded-lg hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-full bg-nuflow-lime flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-nuflow-moss" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Segurança</h3>
                <p>
                  Priorizamos a segurança em todas as nossas atividades. Desde a organização 
                  de eventos até as dicas de rotas, a segurança dos ciclistas sempre vem em primeiro lugar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-nuflow-sand">
          <div className="container-custom">
            <h2 className="text-3xl font-heading font-bold mb-12 text-center">Nossa Equipe</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" 
                    alt="João Silva" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">João Silva</h3>
                <p className="text-nuflow-charcoal/70">CEO & Fundador</p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" 
                    alt="Ana Oliveira" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Ana Oliveira</h3>
                <p className="text-nuflow-charcoal/70">Diretora de Comunidade</p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80" 
                    alt="Pedro Santos" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Pedro Santos</h3>
                <p className="text-nuflow-charcoal/70">Diretor Técnico</p>
              </div>
              
              <div className="text-center">
                <div className="mb-4 relative mx-auto w-48 h-48 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80" 
                    alt="Maria Costa" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Maria Costa</h3>
                <p className="text-nuflow-charcoal/70">Marketing</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-heading font-bold mb-6">Entre em Contato</h2>
              <p className="text-lg mb-8">
                Tem alguma dúvida ou sugestão? Estamos sempre abertos para conversas e novas ideias.
              </p>
              
              <Button size="lg" className="bg-nuflow-moss text-white hover:bg-nuflow-neon hover:text-nuflow-moss">
                Fale Conosco
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sobre;
