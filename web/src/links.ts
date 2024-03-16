export const getAppLinks = (lang: string) => {
  return {
    home: () => `/${lang}`,
    contact: () => `/${lang}/contacts`,
    search: () => `/${lang}/search`,
    blogs: (queryParams?: { search: string }) =>
      `/${lang}/blogs${
        queryParams?.search ? `?search=${queryParams.search}` : ""
      }`,
    blogDetails: (slug: string) => `/${lang}/blogs/${slug}`,
    settlements: (queryParams?: { search: string }) =>
      `/${lang}/settlements${
        queryParams?.search ? `?search=${queryParams.search}` : ""
      }`,
    settlementDetail: (slug: string) => `/${lang}/settlements/${slug}`,
    travels: (queryParams?: { search: string }) =>
      `/${lang}/travels${
        queryParams?.search ? `?search=${queryParams.search}` : ""
      }`,
    travelDetail: (slug: string) => `/${lang}/travels/${slug}`,
    news: (queryParams?: { search: string }) =>
      `/${lang}/blogs/news${
        queryParams?.search ? `?search=${queryParams.search}` : ""
      }`,
    events: (queryParams?: { search: string }) =>
      `/${lang}/blogs/events${
        queryParams?.search ? `?search=${queryParams.search}` : ""
      }`,
    scholarships: (queryParams?: { search: string }) =>
      `/${lang}/blogs/scholarships${
        queryParams?.search ? `?search=${queryParams.search}` : ""
      }`,
    overviewDetails: (slug: string) => `/${lang}/overviews/${slug}`,
  };
};
