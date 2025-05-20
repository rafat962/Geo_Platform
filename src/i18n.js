import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const savedLang = JSON.parse(localStorage.getItem("lang")) || "ar"; // Default to 'en' if nothing saved
// // Listen to language change and update `dir` attribute
// i18next.on("languageChanged", (lng) => {
//     document.documentElement.dir = lng === "ar" ? "ltr" : "ltr";
// });

// // Set initial dir on first load
// document.documentElement.dir = i18next.language === "ar" ? "rtl" : "ltr";
i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "ar",
        lng: savedLang, // 🔑 Use language from localStorage
        interpolation: {
            escapeValue: false,
        },
        supportedLngs: ["en", "ar", "fr"],
    });
