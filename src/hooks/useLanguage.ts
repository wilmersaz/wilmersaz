import { useContext } from "react";
import { LanguageContext } from "../contexts/LanguageContextObject";
import { Translation } from "../types/language";

export const useLanguage = (): {
  language: "es" | "en";
  toggleLanguage: () => void;
  t: Translation;
  isSpanish: boolean;
  isEnglish: boolean;
} => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
};
