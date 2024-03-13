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
  };
};
