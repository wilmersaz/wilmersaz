import { createContext } from "react";
import { Language, Translation } from "../types/language";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: Translation;
  isSpanish: boolean;
  isEnglish: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);
