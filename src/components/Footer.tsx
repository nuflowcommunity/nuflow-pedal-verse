
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-trailflow-dark pt-20 pb-12">
      <div className="container mx-auto px-8 sm:px-12 lg:px-16 max-w-7xl">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-8">
              <img 
                src="/lovable-uploads/7e2ed504-8934-4c4e-a36e-077e7b054a17.png" 
                alt="NuFlow Logo" 
                className="w-10 h-10 mr-4" 
              />
              <h2 className="text-3xl font-bold text-trailflow-dark font-mono">NuFlow</h2>
            </div>
            <p className="text-lg text-trailflow-medium leading-relaxed mb-8 font-light">
              A plataforma completa para ciclistas. Conectando riders através de experiências, produtos e comunidade.
            </p>
            <div className="flex space-x-6">
              <a 
                href="https://instagram.com" 
                className="w-12 h-12 bg-trailflow-lighter rounded-full flex items-center justify-center text-trailflow-medium hover:bg-trailflow-green hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                className="w-12 h-12 bg-trailflow-lighter rounded-full flex items-center justify-center text-trailflow-medium hover:bg-trailflow-green hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                className="w-12 h-12 bg-trailflow-lighter rounded-full flex items-center justify-center text-trailflow-medium hover:bg-trailflow-green hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-trailflow-dark">Navegação</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/roles" 
                  className="text-lg text-trailflow-medium hover:text-trailflow-green transition-colors duration-300 font-light"
                >
                  Rolês & Passes
                </Link>
              </li>
              <li>
                <Link 
                  to="/market" 
                  className="text-lg text-trailflow-medium hover:text-trailflow-green transition-colors duration-300 font-light"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link 
                  to="/comunidade" 
                  className="text-lg text-trailflow-medium hover:text-trailflow-green transition-colors duration-300 font-light"
                >
                  Comunidade
                </Link>
              </li>
              <li>
                <Link 
                  to="/parceiros" 
                  className="text-lg text-trailflow-medium hover:text-trailflow-green transition-colors duration-300 font-light"
                >
                  Seja Parceiro
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-trailflow-dark">Suporte</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/sobre" 
                  className="text-lg text-trailflow-medium hover:text-trailflow-green transition-colors duration-300 font-light"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link 
                  to="/contato" 
                  className="text-lg text-trailflow-medium hover:text-trailflow-green transition-colors duration-300 font-light"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link 
                  to="/politica-privacidade" 
                  className="text-lg text-trailflow-medium hover:text-trailflow-green transition-colors duration-300 font-light"
                >
                  Privacidade
                </Link>
              </li>
              <li>
                <Link 
                  to="/termos" 
                  className="text-lg text-trailflow-medium hover:text-trailflow-green transition-colors duration-300 font-light"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-trailflow-dark">Newsletter</h3>
            <p className="text-lg text-trailflow-medium mb-6 font-light leading-relaxed">
              Receba as novidades, eventos e lançamentos direto no seu e-mail.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-trailflow-lighter text-trailflow-dark placeholder-trailflow-light focus:border-trailflow-green focus:outline-none transition-colors duration-300"
              />
              <button 
                type="submit" 
                className="w-full bg-trailflow-green text-white px-6 py-4 rounded-2xl font-semibold hover:bg-trailflow-dark transition-colors duration-300"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-trailflow-lighter pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            <p className="text-lg text-trailflow-light font-light">
              &copy; {new Date().getFullYear()} NuFlow. Todos os direitos reservados.
            </p>
            <p className="text-lg text-trailflow-light font-light">
              Feito com <span className="text-trailflow-green">♥</span> para ciclistas apaixonados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
