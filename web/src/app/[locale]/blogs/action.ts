import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { EntryFieldTypes } from "contentful";
import { cache } from "react";

export type BlogFields = {
  title: EntryFieldTypes.Text;
  slug: EntryFieldTypes.Text;
  category: EntryFieldTypes.Text;
  date?: EntryFieldTypes.Date;
  thumbnail?: EntryFieldTypes.AssetLink;
  content: EntryFieldTypes.RichText;
};

export type BlogEntrySkeleton = {
  contentTypeId: typeof contentfulIds.blog;
  fields: BlogFields;
};

const contentfulClient = createContentfulClient();

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
