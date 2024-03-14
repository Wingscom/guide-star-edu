import { createClient } from "contentful";

export const createContentfulClient = () => {
  return createClient({
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? "",
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? "",
  });
};
