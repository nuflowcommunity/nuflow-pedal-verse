import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Icon } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

// TikTok icon component since it's not in the main lucide-react package
const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.307-1.956-1.307-3.16V1h-3.117v13.8c0 .847-.341 1.67-.948 2.263a3.308 3.308 0 0 1-2.263.948c-1.221 0-2.37-.476-3.238-1.344a4.612 4.612 0 0 1-1.344-3.238c0-2.538 2.062-4.6 4.6-4.6.254 0 .507.021.757.063V5.775a7.708 7.708 0 0 0-.757-.039c-4.258 0-7.717 3.459-7.717 7.717 0 2.061.803 3.999 2.262 5.455A7.659 7.659 0 0 0 12.883 21c4.258 0 7.717-3.459 7.717-7.717V8.967a9.338 9.338 0 0 0 5.4 1.725V7.575a6.187 6.187 0 0 1-6.679-2.013Z"/>
  </svg>
);

const Footer = () => {
  const [clickedIcon, setClickedIcon] = useState<string | null>(null);

  const handleIconClick = (iconName: string) => {
    setClickedIcon(iconName);
    // Reset the clicked state after a short delay
    setTimeout(() => setClickedIcon(null), 200);
  };

  return (
    <footer className="bg-gradient-to-t from-gray-100 to-white text-trailflow-dark pt-20 pb-12 font-mono">
      <div className="container mx-auto px-8 sm:px-12 lg:px-16 max-w-7xl">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <img 
              src="/lovable-uploads/16a87e5f-efde-44b6-b0af-91e0ece61fe3.png" 
              alt="TrailFlow Logo" 
              className="h-8 mb-6"
            />
            <p className="text-lg text-trailflow-medium leading-relaxed mb-8 font-light">
              A plataforma completa para ciclistas. Conectando riders através de experiências, produtos e comunidade.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                className={`transition-all duration-300 hover:scale-110 ${
                  clickedIcon === 'instagram' ? 'text-trailflow-green' : 'hover:text-trailflow-green'
                }`}
                style={{ color: clickedIcon === 'instagram' ? '#84B067' : '#595959' }}
                aria-label="Instagram"
                onClick={() => handleIconClick('instagram')}
              >
                <Instagram size={24} strokeWidth={1.5} />
              </a>
              <a 
                href="https://facebook.com" 
                className={`transition-all duration-300 hover:scale-110 ${
                  clickedIcon === 'facebook' ? 'text-trailflow-green' : 'hover:text-trailflow-green'
                }`}
                style={{ color: clickedIcon === 'facebook' ? '#84B067' : '#595959' }}
                aria-label="Facebook"
                onClick={() => handleIconClick('facebook')}
              >
                <Facebook size={24} fill="#595959" color="#595959" strokeWidth={0} />
              </a>
              <a 
                href="https://twitter.com" 
                className={`transition-all duration-300 hover:scale-110 ${
                  clickedIcon === 'twitter' ? 'text-trailflow-green' : 'hover:text-trailflow-green'
                }`}
                style={{ color: clickedIcon === 'twitter' ? '#84B067' : '#595959' }}
                aria-label="Twitter"
                onClick={() => handleIconClick('twitter')}
              >
                <Twitter size={24} fill="#595959" color="#595959" strokeWidth={0} />
              </a>
              <a 
                href="https://linkedin.com" 
                className={`transition-all duration-300 hover:scale-110 ${
                  clickedIcon === 'linkedin' ? 'text-trailflow-green' : 'hover:text-trailflow-green'
                }`}
                style={{ color: clickedIcon === 'linkedin' ? '#84B067' : '#595959' }}
                aria-label="LinkedIn"
                onClick={() => handleIconClick('linkedin')}
              >
                <Linkedin size={24} strokeWidth={1.5} />
              </a>
              <a 
                href="https://tiktok.com" 
                className={`transition-all duration-300 hover:scale-110 ${
                  clickedIcon === 'tiktok' ? 'text-trailflow-green' : 'hover:text-trailflow-green'
                }`}
                style={{ color: clickedIcon === 'tiktok' ? '#84B067' : '#595959' }}
                aria-label="TikTok"
                onClick={() => handleIconClick('tiktok')}
              >
                <TikTokIcon size={24} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-trailflow-dark">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/roles" className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300">
                  Rolês & Passes
                </Link>
              </li>
              <li>
                <Link to="/market" className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/comunidade" className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300">
                  Comunidade
                </Link>
              </li>
              <li>
                <Link to="/parceiros" className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300">
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
                <Link to="/sobre" className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidade" className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link to="/termos" className="text-base text-trailflow-medium hover:text-trailflow-green transition-colors duration-300">
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
              <input type="email" placeholder="Digite seu e-mail" className="w-full px-4 py-3 rounded-xl bg-white border border-trailflow-lighter text-trailflow-dark placeholder-trailflow-light focus:border-trailflow-green focus:outline-none transition-colors duration-300" />
              <button type="submit" className="w-full bg-trailflow-green text-white px-4 py-3 rounded-xl font-semibold hover:bg-trailflow-dark transition-colors duration-300">
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
