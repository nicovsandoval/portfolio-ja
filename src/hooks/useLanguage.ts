import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: 'en' | 'es') => {
    i18n.changeLanguage(lang);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    changeLanguage(newLang);
  };

  const currentLanguage = i18n.language.startsWith('es') ? 'es' : 'en';

  return {
    language: currentLanguage,
    changeLanguage,
    toggleLanguage,
  };
}
