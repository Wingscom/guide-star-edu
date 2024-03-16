import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { BlogCategory } from "@/types/BlogCategory";
import { BlogEntrySkeleton } from "@/types/BlogEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getTopNewPosts = cache(async () => {
  const locale = getCurrentLocale();
  const blogDetailEntries =
    await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
      {
        locale,
        content_type: contentfulIds.blog,
        limit: 5,
        select: ["fields.slug", "fields.title"],
        order: ["-fields.date"],
      }
    );
  return blogDetailEntries.items.map((item) => item.fields);
});

export type SearchPostsArgs = {
  search?: string;
  page?: number;
};

export const searchPosts = cache(async (args: SearchPostsArgs = {}) => {
  const { search, page = 1 } = args;
  const locale = getCurrentLocale();
  const blogDetailEntries = search
    ? await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
        {
          locale,
          content_type: contentfulIds.blog,
          limit: 10,
          skip: 10 * (page - 1),
          order: ["-fields.date"],
          "fields.slug[match]": search,
          "fields.content[match]": search,
          "fields.title[match]": search,
        }
      )
    : await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
        {
          locale,
          content_type: contentfulIds.blog,
          limit: 10,
          skip: 10 * (page - 1),
          order: ["-fields.date"],
        }
      );
  return blogDetailEntries.items.map((item) => item.fields);
});

export type SearchPostsWithCategoryArgs = SearchPostsArgs & {
  category?: BlogCategory;
};

export const searchPostsWithCategory = cache(
  async (args: SearchPostsWithCategoryArgs = {}) => {
    const { search, page = 1, category } = args;
    const locale = getCurrentLocale();
    const blogDetailEntries = search
      ? await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
          {
            locale,
            content_type: contentfulIds.blog,
            limit: 10,
            skip: 10 * (page - 1),
            order: ["-fields.date"],
            "fields.slug[match]": search,
            "fields.content[match]": search,
            "fields.title[match]": search,
            "fields.category": category,
          }
        )
      : await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
          {
            locale,
            content_type: contentfulIds.blog,
            limit: 10,
            skip: 10 * (page - 1),
            order: ["-fields.date"],
            "fields.category": category,
          }
        );
    return blogDetailEntries.items.map((item) => item.fields);
  }
);
