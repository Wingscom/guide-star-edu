const locales = {
  en: () => import("@/locales/en.json").then((module) => module.default),
  vi: () => import("@/locales/vi.json").then((module) => module.default),
};

export type Language = keyof typeof locales
export const getLocale = (locale: Language) => locales[locale]?.();
