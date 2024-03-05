import { Language } from "./app/[lang]/locales"

export const getAppLinks = (lang: Language) => {
  return {
    home: () => `/${lang}`
  }
}
