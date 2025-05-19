
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mountain } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#497052] text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <Mountain size={24} className="text-nuflow-sand mr-2" />
              <h2 className="text-2xl font-heading font-bold">NUFLOW</h2>
            </div>
            <p className="text-nuflow-sand/80 mb-6">
              Conectando ciclistas através de experiências, produtos e comunidade.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="hover:text-[#11f55c] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" className="hover:text-[#11f55c] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-[#11f55c] transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-heading font-medium mb-3 text-[#11f55c]">Navegação</h3>
            <ul className="space-y-2">
              <li><Link to="/roles" className="text-nuflow-sand/80 hover:text-white transition-colors">Rolês & Passes</Link></li>
              <li><Link to="/market" className="text-nuflow-sand/80 hover:text-white transition-colors">Marketplace</Link></li>
              <li><Link to="/comunidade" className="text-nuflow-sand/80 hover:text-white transition-colors">Comunidade</Link></li>
              <li><Link to="/parceiros" className="text-nuflow-sand/80 hover:text-white transition-colors">Seja Parceiro</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-medium mb-3 text-[#11f55c]">Links Úteis</h3>
            <ul className="space-y-2">
              <li><Link to="/sobre" className="text-nuflow-sand/80 hover:text-white transition-colors">Sobre nós</Link></li>
              <li><Link to="/politica-privacidade" className="text-nuflow-sand/80 hover:text-white transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/termos" className="text-nuflow-sand/80 hover:text-white transition-colors">Termos de Uso</Link></li>
              <li><Link to="/contato" className="text-nuflow-sand/80 hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-medium mb-3 text-[#11f55c]">Newsletter</h3>
            <p className="text-nuflow-sand/80 mb-4">Fique por dentro das novidades e lançamentos.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="px-4 py-2 rounded-l-full w-full outline-none text-nuflow-charcoal"
              />
              <button type="submit" className="bg-[#11f55c] text-[#497052] px-4 py-2 rounded-r-full font-medium transition-colors hover:bg-white">
                OK
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center md:text-left md:flex md:justify-between text-nuflow-sand/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Nuflow. Todos os direitos reservados.</p>
          <p className="mt-2 md:mt-0">Feito com ♥ para ciclistas</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
