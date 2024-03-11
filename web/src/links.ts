import { Language } from "./app/[lang]/locales";

export const getAppLinks = (lang: Language) => {
  return {
    home: () => `/${lang}`,
    contact: () => `/${lang}/contacts`,
    search: () => `/${lang}/search`,
    blogs: (queryParams?: { search: string }) =>
      `/${lang}/blogs${queryParams?.search ? `?search=${queryParams.search}` : ""}`,
    blogDetails: (slug: string) => `/${lang}/blogs/${slug}`,
    news: () => `/${lang}/blogs/news`,
    events: () => `/${lang}/blogs/events`,
    scholarships: () => `/${lang}/blogs/scholarships`,
  };
};
