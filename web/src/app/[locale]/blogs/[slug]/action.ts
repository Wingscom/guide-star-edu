import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { cache } from "react";
import { BlogEntrySkeleton } from "../action";

const contentfulClient = createContentfulClient();

export const getBlogDetailContent = cache(async (slug: string) => {
  const blogDetailEntries =
    await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>({
      content_type: contentfulIds.blog,
      limit: 1,
      "fields.slug": slug,
    });
  return blogDetailEntries.items[0].fields;
});

export type Blog = Awaited<ReturnType<typeof getBlogDetailContent>>

export const getTopNewPosts = cache(async () => {
  const blogDetailEntries =
    await contentfulClient.getEntries<BlogEntrySkeleton>({
      content_type: contentfulIds.blog,
      limit: 5,
      select: ["fields.slug", "fields.title"],
      order: ["-fields.date"],
    });
  return blogDetailEntries.items.map((item) => item.fields);
});
