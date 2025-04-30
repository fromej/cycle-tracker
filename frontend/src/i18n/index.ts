import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages'

const i18n = createI18n({
    legacy: false,
    locale: 'en', // Set the initial locale
    fallbackLocale: 'en', // Fallback if a translation is missing
    messages
});

export default i18n;