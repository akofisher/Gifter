import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { store } from '../Store/store';
import { en, ru, ka } from './locales';

const resources = {
  ka: {
    translation: ka,
  },
  ru: {
    translation: ru,
  },
  en: {
    translation: en,
  },
};

export type PossibleLanguages = 'ka' | 'ru' | 'en';

i18n.use(initReactI18next).init({
  resources,
  lng: store.getState().ui.language,
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
