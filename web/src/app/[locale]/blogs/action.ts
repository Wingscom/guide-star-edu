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

export type SearchPostsArgs = {
  search?: string;
  page?: number;
};

export const searchPosts = cache(async (args: SearchPostsArgs = {}) => {
  const { search, page = 1 } = args;
  const blogDetailEntries = search
    ? await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>({
        content_type: contentfulIds.blog,
        limit: 10,
        skip: 10 * (page - 1),
        order: ["-fields.date"],
        "fields.slug[match]": search,
        "fields.content[match]": search,
        "fields.title[match]": search,
      })
    : await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>({
        content_type: contentfulIds.blog,
        limit: 10,
        skip: 10 * (page - 1),
        order: ["-fields.date"],
      });
  return blogDetailEntries.items.map((item) => item.fields);
});
