import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import ar from "./locales/ar";

export const LANGUAGE_STORAGE_KEY = "portfolio-language";

const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: savedLanguage === "ar" ? "ar" : "en",
  fallbackLng: "en",
  supportedLngs: ["en", "ar"],
  interpolation: { escapeValue: false },
  returnNull: false,
});

i18n.on("languageChanged", (language) => {
  if (language === "en" || language === "ar") {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }
});

export default i18n;
