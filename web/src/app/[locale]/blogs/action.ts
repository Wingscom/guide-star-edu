import { contentfulIds } from "@/constants/contentfulIds";
import { paginationConfig } from "@/constants/paginationConfig";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { BlogCategory } from "@/types/BlogCategory";
import { BlogEntrySkeleton } from "@/types/BlogEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getTopNewPosts = cache(async () => {
  const locale = await getCurrentLocale();
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
  const locale = await getCurrentLocale();
  const blogDetailEntries = search
    ? await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
        {
          locale,
          content_type: contentfulIds.blog,
          limit: paginationConfig.perPage,
          skip: paginationConfig.perPage * (page - 1),
          order: ["-fields.date"],
          "query": search,
        }
      )
    : await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
        {
          locale,
          content_type: contentfulIds.blog,
          limit: paginationConfig.perPage,
          skip: paginationConfig.perPage * (page - 1),
          order: ["-fields.date"],
        }
      );
  return {
    total: blogDetailEntries.total,
    items: blogDetailEntries.items.map((item) => item.fields),
  };
});

export type SearchPostsWithCategoryArgs = SearchPostsArgs & {
  category?: BlogCategory;
};

export const searchPostsWithCategory = cache(
  async (args: SearchPostsWithCategoryArgs = {}) => {
    const { search, page = 1, category } = args;
    const locale = await getCurrentLocale();
    const blogDetailEntries = search
      ? await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
          {
            locale,
            content_type: contentfulIds.blog,
            limit: paginationConfig.perPage,
            skip: paginationConfig.perPage * (page - 1),
            order: ["-fields.date"],
            "query": search,
            "fields.category": category,
          }
        )
      : await contentfulClient.withoutUnresolvableLinks.getEntries<BlogEntrySkeleton>(
          {
            locale,
            content_type: contentfulIds.blog,
            limit: paginationConfig.perPage,
            skip: paginationConfig.perPage * (page - 1),
            order: ["-fields.date"],
            "fields.category": category,
          }
        );
    return {
      total: blogDetailEntries.total,
      items: blogDetailEntries.items.map((item) => item.fields),
    };
  }
);
