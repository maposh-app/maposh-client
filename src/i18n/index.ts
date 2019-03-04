import i18n from "i18next";
import Backend from "i18next-chained-backend";

import LngDetector from "i18next-browser-languagedetector";
import LocalStorageBackend from "i18next-localstorage-backend";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import config from "../config";

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(LngDetector)
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: {
      default: [config.locale.default]
    },
    load: "languageOnly",
    debug: true,
    ns: ["common"],
    keySeparator: ".",
    defaultNS: "common",
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    backend: {
      backends: [LocalStorageBackend, XHR],
      backendOptions: [
        {
          prefix: "i18next_res_",

          // expiration
          expirationTime: 7 * 24 * 60 * 60 * 1000,

          // language versions
          versions: {},

          // can be either window.localStorage or window.sessionStorage. Default: window.localStorage
          store: window.localStorage
        },
        {
          loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
        }
      ]
    },
    detection: {
      order: [
        "path",
        "querystring",
        "cookie",
        "localStorage",
        "navigator",
        "htmlTag",
        "path",
        "subdomain"
      ],
      caches: ["cookie", "localStorage"],
      cookieMinutes: 160,
      lookupQuerystring: "lang",
      lookupFromPathIndex: 0
    }
  });

export default i18n;
