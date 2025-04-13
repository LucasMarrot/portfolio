import { useLanguage } from '../contexts/LanguageContext';
import en from '../translations/en';
import fr from '../translations/fr';

const translations = { en, fr };
export type TStrings = typeof translations[keyof typeof translations];

export const useStrings = () => {
  const { language } = useLanguage();
  return translations[language as keyof typeof translations];
};