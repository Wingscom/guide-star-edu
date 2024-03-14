import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { cache } from "react";
import { BlogEntrySkeleton } from "../../blogs/action";

const contentfulClient = createContentfulClient();

export const getHomeNewPosts = cache(async () => {
  const blogDetailEntries =
    await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
      {
        content_type: contentfulIds.blog,
        limit: 6,
        select: ["fields.slug", "fields.title", "fields.thumbnail"],
        order: ["-fields.date"],
      }
    );
  return blogDetailEntries.items.map((item) => item.fields);
});
