import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-[60] bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-full p-3 hover:bg-slate-800/90 transition-all hover:scale-110 shadow-lg"
      aria-label={`Switch to ${language === 'es' ? 'English' : 'Spanish'}`}
      title={`Switch to ${language === 'es' ? 'English' : 'Spanish'}`}
    >
      <div className="flex items-center space-x-2">
        <div className="w-6 h-4 relative overflow-hidden rounded-sm border border-gray-400">
            {language === 'es' ? (
            // Bandera de Colombia
            <>
              <div className="absolute top-0 left-0 w-full h-1/2 bg-yellow-400"></div>
              <div className="absolute top-1/2 left-0 w-full h-1/4 bg-blue-600"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/4 bg-red-600"></div>
            </>
            ) : (
            // Bandera de Estados Unidos
            <>
              {/* Franjas rojas y blancas */}
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute left-0 w-full h-[2px] ${i % 2 === 0 ? 'bg-red-600' : 'bg-white'}`}
                  style={{ top: `${i * 2}px` }}
                />
              ))}
              {/* Recuadro azul con "estrellas" */}
              <div className="absolute top-0 left-0 w-[40%] h-[58%] bg-blue-700 flex flex-wrap items-center justify-center text-[3px] text-white leading-[1] px-[1px] py-[1px]">
                <span>******</span>
                <span>******</span>
                <span>******</span>
              </div>
            </>
          )}
        </div>
        <span className="text-xs font-medium text-gray-300">
          {language === 'es' ? 'ES' : 'EN'}
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;