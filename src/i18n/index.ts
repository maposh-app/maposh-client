import i18n from "i18next";
import LngDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import config from "../config";

i18n
  .use(LngDetector)
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: config.locale.default,
    lng: config.locale.default,
    debug: true,
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    }
  });

export default i18n;
