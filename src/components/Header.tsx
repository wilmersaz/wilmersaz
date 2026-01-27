import React from "react";
import { Menu, X } from "lucide-react";

interface HeaderTranslations {
  home: string;
  about: string;
  skills: string;
  education: string;
  certifications: string;
  portfolio: string;
  experience: string;
  contact: string;
  // Puedes agregar más claves si es necesario
}

interface HeaderProps {
  t: HeaderTranslations;
  activeSection: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  t,
  activeSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
}) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="flex justify-between items-center h-16 relative">
        {/* Logo a la izquierda */}
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          WS
        </div>

        {/* Botón menú móvil a la izquierda (visible en < 992px) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-md hover:bg-slate-800 transition-colors absolute left-0 ml-16"
          style={{ zIndex: 10 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu centrado (visible en >= 992px) */}
        <div className="hidden lg:flex space-x-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs md:text-sm lg:text-base">
          {[
            "home",
            "about",
            "skills",
            "education",
            "certifications",
            "portfolio",
            "experience",
            "contact",
          ].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`capitalize transition-colors hover:text-blue-400 px-0 md:px-1 lg:px-2 whitespace-nowrap ${
                activeSection === item ? "text-blue-400" : "text-gray-300"
              }`}
            >
              {t[item as keyof typeof t] as string}
            </button>
          ))}
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {[
            "home",
            "about",
            "skills",
            "education",
            "certifications",
            "portfolio",
            "experience",
            "contact",
          ].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="block w-full text-left px-3 py-2 text-base font-medium capitalize hover:text-blue-400 hover:bg-slate-800 rounded-md transition-colors"
            >
              {t[item as keyof typeof t] as string}
            </button>
          ))}
        </div>
      </div>
    )}
  </nav>
);

export default Header;
