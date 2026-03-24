// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // <--- importante, conecta i18next con react-i18next
  .init({
    resources: {
      en: {
        translation: {
          closeBtn: "Close",
          translateBtn: "Translate to Spanish",
          noDescription: "No description available",
          descriptionTitle: "{{name}} - Description",
        },
      },
      es: {
        translation: {
          closeBtn: "Cerrar",
          translateBtn: "Traducir al Español",
          noDescription: "Sin descripción disponible",
          descriptionTitle: "{{name}} - Descripción",
        },
      },
    },
    lng: "en", // idioma por defecto
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;