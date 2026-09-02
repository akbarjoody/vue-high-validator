import { ref } from "vue";
import { messages as builtInMessages } from "./messages.js";

const dictionaries = {
  fa: { ...builtInMessages.fa },
  en: { ...builtInMessages.en },
};

const currentLocale = ref("fa");
const fallbackLocale = ref("en");

export const locale = currentLocale;

export function setLocale(lang) {
  currentLocale.value = lang;
}

export function getLocale() {
  return currentLocale.value;
}

export function setFallbackLocale(lang) {
  fallbackLocale.value = lang;
}

export function addLocale(lang, dictionary) {
  dictionaries[lang] = {
    ...(dictionaries[lang] || {}),
    ...dictionary,
  };
}

export function getAvailableLocales() {
  return Object.keys(dictionaries);
}

export function t(key, lang = currentLocale.value) {
  return (
    dictionaries[lang]?.[key] ??
    dictionaries[fallbackLocale.value]?.[key] ??
    dictionaries.en?.[key] ??
    dictionaries.fa?.[key] ??
    key
  );
}

export function localeMessage(key) {
  return (lang) => t(key, lang);
}
