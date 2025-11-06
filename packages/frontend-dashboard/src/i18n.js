import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // load JSON files
  .use(LanguageDetector) // detect user language
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // make sure this matches your folder name
    debug: true, // helpful for debugging
    interpolation: { escapeValue: false },
    backend: {
        loadPath: '../public/locales/{{lng}}/translation.json'
    }
  });

export default i18n;
