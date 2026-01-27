import React, { useState, useEffect, ReactNode } from "react";
import { Language } from "../types/language";
import { translations } from "../translations";
import { LanguageContext } from "./LanguageContextObject";

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check if there's a saved language preference
    const saved = localStorage.getItem("preferred-language");
    if (saved && (saved === "es" || saved === "en")) {
      return saved;
    }

    // Default to Spanish
    return "es";
  });

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es";
    setLanguage(newLanguage);
    localStorage.setItem("preferred-language", newLanguage);
  };

  const t = translations[language];

  useEffect(() => {
    // Update document language attribute
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    toggleLanguage,
    t,
    isSpanish: language === "es",
    isEnglish: language === "en",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
