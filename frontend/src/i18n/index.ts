import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import nl from '@/locales/nl.json';

const i18n = createI18n({
    legacy: false,
    locale: 'en', // Set the initial locale
    fallbackLocale: 'en', // Fallback if a translation is missing
    messages: {
        en,
        nl
    }
});

export default i18n;