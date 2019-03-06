import i18n from "i18next";
import Backend from "i18next-chained-backend";

import LngDetector, {
  I18nextBrowserLanguageDetector
} from "i18next-browser-languagedetector";
import LocalStorageBackend from "i18next-localstorage-backend";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import config from "../config";

// https://stackoverflow.com/a/29106129/3581829
const getFirstBrowserLanguage = () => {
  const nav = window.navigator;
  const browserLanguagePropertyKeys = [
    "language",
    "browserLanguage",
    "systemLanguage",
    "userLanguage"
  ];

  // support for HTML 5.1 "navigator.languages"
  if (Array.isArray(nav.languages)) {
    for (const language of nav.languages) {
      if (language && language.length) {
        return language;
      }
    }
  }

  // support for other well known properties in browsers
  for (const property of browserLanguagePropertyKeys) {
    const language: string = (nav as { [key: string]: any })[property];
    if (language && language.length) {
      return language;
    }
  }

  return null;
};

let hasLocalStorageSupport: boolean;
try {
  hasLocalStorageSupport = window && window.localStorage !== null;
  const testKey = "i18next.translate.boo";
  window.localStorage.setItem(testKey, "foo");
  window.localStorage.removeItem(testKey);
} catch (e) {
  hasLocalStorageSupport = false;
}

const firstLanguageDetector: I18nextBrowserLanguageDetector.CustomDetector = {
  name: "firstLanguageDetector",
  lookup: () => {
    return getFirstBrowserLanguage().split("-")[0];
  },
  cacheUserLanguage(lng, options) {
    if (options.lookupLocalStorage && hasLocalStorageSupport) {
      window.localStorage.setItem(options.lookupLocalStorage, lng);
    }
  }
};

const lngDetector = new LngDetector();
lngDetector.addDetector(firstLanguageDetector);

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(lngDetector)
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
      backends: [
        // LocalStorageBackend,
        XHR
      ],
      backendOptions: [
        //   {
        //     prefix: "i18next_res_",

        //     // expiration
        //     expirationTime: 24 * 3600,

        //     // language versions
        //     versions: {},

        //     // can be either window.localStorage or window.sessionStorage. Default: window.localStorage
        //     store: window.localStorage
        //   },
        {
          loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
        }
      ]
    },
    react: {
      wait: true
    },
    detection: {
      order: [
        "firstLanguageDetector",
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
