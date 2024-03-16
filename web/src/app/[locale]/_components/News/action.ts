import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { cache } from "react";
import { BlogEntrySkeleton } from "../../blogs/action";

const contentfulClient = createContentfulClient();

export const getHomeNewPosts = cache(async () => {
  const locale = getCurrentLocale();
  const blogDetailEntries =
    await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
      {
        locale,
        content_type: contentfulIds.blog,
        limit: 6,
        select: ["fields.slug", "fields.title", "fields.thumbnail"],
        order: ["-fields.date"],
      }
    );
  return blogDetailEntries.items.map((item) => item.fields);
});
