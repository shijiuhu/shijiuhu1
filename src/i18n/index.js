import { createI18n } from 'vue-i18n'

import zh from '@/assets/i18n/zh'
import en from '@/assets/i18n/en'

const lang = navigator.language || navigator.userLanguage || 'zh'
const messages = {
    'zh': {
        ...zh
    },
    'en': {
        ...en
    }
}

const i18n = new createI18n({
    locale: lang,
    messages
})

export default i18n