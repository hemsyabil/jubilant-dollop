import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next"

const isDevelopment = import.meta.env.DEV

i18n
  .use(Backend) // load JSON files
  .use(LanguageDetector) // detect user language
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // make sure this matches your folder name
    debug: isDevelopment, // only enable debug in development
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  })

export default i18n
