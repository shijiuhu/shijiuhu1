import { createI18n } from 'vue-i18n'

import zh from 'assets/i18n/zh'
import en from 'assets/i18n/en'
import i18nAppleEn from 'assets/i18n/i18nApple/i18nAppleEn'
import i18nAppleZh from 'assets/i18n/i18nApple/i18nAppleZh'
import i18nOrangeEn from 'assets/i18n/i18nOrange/i18nOrangeEn'
import i18nOrangeZh from 'assets/i18n/i18nOrange/i18nOrangeZh'

const lang = navigator.language || navigator.userLanguage || 'zh'
const messages = {
    'zh': {
        ...zh,
        ...i18nAppleZh,
        ...i18nOrangeZh
    },
    'en': {
        ...en,
        ...i18nAppleEn,
        ...i18nOrangeEn
    }
}

const i18n = new createI18n({
    locale: lang,
    messages
})

export default i18n