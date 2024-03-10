import { Language } from "./app/[lang]/locales";

export const getAppLinks = (lang: Language) => {
  return {
    home: () => `/${lang}`,
    contact: () => `/${lang}/contacts`,
    search: () => `/${lang}/search`,
    news: () => `/${lang}/blogs/news`,
    events: () => `/${lang}/blogs/events`,
    scholarships: () => `/${lang}/blogs/scholarships`
  };
};
