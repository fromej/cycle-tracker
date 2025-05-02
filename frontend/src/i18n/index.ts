import { createI18n } from 'vue-i18n';
import messages from '@intlify/unplugin-vue-i18n/messages';

const defaultLocale = 'en';

const supportedLocales = Object.keys(messages as Object);

// 3. Function to get the initial locale with browser language fallback
function getStartingLocale() {
    const localStorageKey = 'user-locale';
    const savedLocale = localStorage.getItem(localStorageKey);

    // Priority 1: Check localStorage
    // Use saved locale if it exists and is supported
    if (savedLocale && supportedLocales.includes(savedLocale)) {
        console.log(`Using saved locale: ${savedLocale}`); // Optional log
        return savedLocale;
    }

    // Priority 2: Check browser language
    // Use browser language if it's supported (checking only the primary language code)
    if (navigator.language) {
        const browserLangCode = navigator.language.split('-')[0]; // Gets 'en' from 'en-US', 'fr' from 'fr-FR', etc.
        if (supportedLocales.includes(browserLangCode)) {
            console.log(`Using browser locale: ${browserLangCode}`); // Optional log
            // Optional: You might want to save this detected browser language
            // to localStorage for the next visit:
            // localStorage.setItem(localStorageKey, browserLangCode);
            return browserLangCode;
        } else {
            console.log(`Browser locale '${browserLangCode}' not supported.`); // Optional log
        }
    } else {
        console.log('Browser language detection not available.'); // Optional log
    }


    // Priority 3: Fallback to default locale
    console.log(`Using default locale: ${defaultLocale}`); // Optional log
    return defaultLocale;
}

// --- Create i18n Instance ---

const i18n = createI18n({
    legacy: false, // Use Composition API mode (important for Vue 3)
    locale: getStartingLocale(), // Set the initial locale based on the logic above
    fallbackLocale: defaultLocale, // Fallback locale if translation key is missing
    availableLocales: supportedLocales, // Let vue-i18n know which locales are available
    messages: messages // Your loaded translation messages
    // Optional: uncomment to suppress console warnings
    // silentTranslationWarn: process.env.NODE_ENV === 'production',
    // missingWarn: process.env.NODE_ENV === 'production',
    // silentFallbackWarn: process.env.NODE_ENV === 'production',
    // fallbackWarn: process.env.NODE_ENV === 'production',
});

// Optional: Set initial HTML lang attribute
// This runs once when the module is loaded.
// If the locale changes later, you'll need to update it elsewhere (e.g., in a watcher or component).
try {
    document.documentElement.lang = i18n.global.locale.value;
} catch (e) {
    console.error("Could not set initial document lang attribute.", e);
}


export default i18n;