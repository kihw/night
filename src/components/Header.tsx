import React, { useState } from 'react';
import { Moon, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">NightMod</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Fonctionnalités
            </button>
            <button 
              onClick={() => scrollToSection('screenshots')}
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Aperçu
            </button>
            <button 
              onClick={() => scrollToSection('download')}
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              Télécharger
            </button>
          </nav>
          
          <button 
            className="md:hidden text-slate-300 hover:text-white transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
            <div className="px-4 py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left text-slate-300 hover:text-white transition-colors duration-200"
              >
                Fonctionnalités
              </button>
              <button 
                onClick={() => scrollToSection('screenshots')}
                className="block w-full text-left text-slate-300 hover:text-white transition-colors duration-200"
              >
                Aperçu
              </button>
              <button 
                onClick={() => scrollToSection('download')}
                className="block w-full text-left text-slate-300 hover:text-white transition-colors duration-200"
              >
                Télécharger
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;