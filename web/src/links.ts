import { CourseSector } from "./app/[locale]/courses/_types/CourseSector";
import { getQueryString } from "./helpers/getQueryString";

export const getAppLinks = (lang: string) => {
    return {
        home: () => `/${lang}`,
        courses: (queryParams?: {
            search?: string;
            country?: string;
            state?: string;
            city?: string;
            sector?: CourseSector;
        }) => `/${lang}/courses${getQueryString(queryParams)}`,
        blogs: (queryParams?: { search: string }) => `/${lang}/blogs${getQueryString(queryParams)}`,
        blogDetails: (slug: string) => `/${lang}/blogs/${slug}`,
        immigrations: (queryParams?: { search: string }) =>
            `/${lang}/immigrations${getQueryString(queryParams)}`,
        immigrationDetail: (slug: string) => `/${lang}/immigrations/${slug}`,
        travels: (queryParams?: { search: string }) =>
            `/${lang}/travels${getQueryString(queryParams)}`,
        travelDetail: (slug: string) => `/${lang}/travels/${slug}`,
        news: (queryParams?: { search: string }) =>
            `/${lang}/blogs/news${getQueryString(queryParams)}`,
        events: (queryParams?: { search: string }) =>
            `/${lang}/blogs/events${getQueryString(queryParams)}`,
        scholarships: (queryParams?: { search: string }) =>
            `/${lang}/blogs/scholarships${getQueryString(queryParams)}`,
        overviewDetails: (slug: string) => `/${lang}/overviews/${slug}`,
        info: () => `/${lang}/info`,
        registrationExam: () => `/${lang}/exams`,
    };
};

export const LINK_PAGE_FACEBOOK = "https://www.facebook.com/guidestaredu";
