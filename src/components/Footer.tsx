import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-100 to-white text-trailflow-dark pt-20 pb-12 font-mono">
      <div className="container mx-auto px-8 sm:px-12 lg:px-16 max-w-7xl">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-8">
              <img 
                src="/lovable-uploads/16a87e5f-efde-44b6-b0af-91e0ece61fe3.png" 
                alt="NuFlow Logo" 
                className="w-10 h-10 mr-4" 
              />
              <img 
                src="/lovable-uploads/ec81a495-9c9e-496e-9570-f43da7765d0a.png" 
                alt="NuFlow" 
                className="h-8" 
              />
            </div>
            <p className="text-lg text-trailflow-medium leading-relaxed mb-8 font-light">
              A plataforma completa para ciclistas. Conectando riders através de experiências, produtos e comunidade.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                className="w-10 h-10 bg-trailflow-lighter/50 rounded-2xl flex items-center justify-center text-trailflow-medium hover:bg-trailflow-green hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                className="w-10 h-10 bg-trailflow-lighter/50 rounded-2xl flex items-center justify-center text-trailflow-medium hover:bg-trailflow-green hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                className="w-10 h-10 bg-trailflow-lighter/50 rounded-2xl flex items-center justify-center text-trailflow-medium hover:bg-trailflow-green hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-trailflow-dark">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/roles" 
                  className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300"
                >
                  Rolês & Passes
                </Link>
              </li>
              <li>
                <Link 
                  to="/market" 
                  className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link 
                  to="/comunidade" 
                  className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300"
                >
                  Comunidade
                </Link>
              </li>
              <li>
                <Link 
                  to="/parceiros" 
                  className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300"
                >
                  Seja Parceiro
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-trailflow-dark">Suporte</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/sobre" 
                  className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link 
                  to="/contato" 
                  className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link 
                  to="/politica-privacidade" 
                  className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link 
                  to="/termos" 
                  className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-trailflow-dark">Newsletter</h3>
            <p className="text-base text-trailflow-medium mb-6 leading-relaxed">
              Receba as novidades, eventos e lançamentos direto no seu e-mail.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full px-4 py-3 rounded-xl bg-white border border-trailflow-lighter text-trailflow-dark placeholder-trailflow-light focus:border-trailflow-green focus:outline-none transition-colors duration-300"
              />
              <button 
                type="submit" 
                className="w-full bg-trailflow-green text-white px-4 py-3 rounded-xl font-semibold hover:bg-trailflow-dark transition-colors duration-300"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-trailflow-lighter pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            <p className="text-sm text-trailflow-light">
              &copy; {new Date().getFullYear()} NuFlow. Todos os direitos reservados.
            </p>
            <p className="text-sm text-trailflow-light">
              Feito com <span className="text-trailflow-green">♥</span> para ciclistas apaixonados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
