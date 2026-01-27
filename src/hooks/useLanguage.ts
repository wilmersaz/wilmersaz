import { useState, useEffect } from "react";
import { Language } from "../types/language";
import { translations } from "../translations";

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check if there's a saved language preference
    const saved = localStorage.getItem("preferred-language");
    if (saved && (saved === "es" || saved === "en")) {
      return saved;
    }

    // Default to browser's language if available, otherwise Spanish
    const browserLang = navigator.language?.slice(0, 2);
    if (browserLang === "es" || browserLang === "en") {
      return browserLang;
    }
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

  return {
    language,
    toggleLanguage,
    t,
    isSpanish: language === "es",
    isEnglish: language === "en",
  };
};
