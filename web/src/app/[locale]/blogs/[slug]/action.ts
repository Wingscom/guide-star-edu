import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { cache } from "react";
import { BlogEntrySkeleton } from "../action";
import { getCurrentLocale } from "@/locales/server";

const contentfulClient = createContentfulClient();

export const getBlogDetailContent = cache(async (slug: string) => {
  const locale = getCurrentLocale();
  const blogDetailEntries =
    await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
      {
        locale,
        content_type: contentfulIds.blog,
        limit: 1,
        "fields.slug": slug,
      }
    );
  return blogDetailEntries.items[0].fields;
});

export type Blog = Awaited<ReturnType<typeof getBlogDetailContent>>;
