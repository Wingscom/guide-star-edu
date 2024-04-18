import { contentfulIds } from "@/constants/contentfulIds";
import { paginationConfig } from "@/constants/paginationConfig";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { ImmigrationEntrySkeleton } from "@/types/ImmigrationEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getTopNewImmigrationPosts = cache(async () => {
  const locale = getCurrentLocale();
  const result =
    await contentfulClient.withoutUnresolvableLinks.getEntries<ImmigrationEntrySkeleton>(
      {
        locale,
        content_type: contentfulIds.immigration,
        limit: 5,
        select: ["fields.slug", "fields.title"],
        order: ["-fields.date"],
      }
    );
  return result.items.map((item) => item.fields);
});

export type SearchImmigrationsArgs = {
  search?: string;
  page?: number;
};

export const searchImmigrations = cache(
  async (args: SearchImmigrationsArgs = {}) => {
    const { search, page = 1 } = args;
    const locale = getCurrentLocale();
    const entries = search
      ? await contentfulClient.withoutUnresolvableLinks.getEntries<ImmigrationEntrySkeleton>(
          {
            locale,
            content_type: contentfulIds.immigration,
            limit: paginationConfig.perPage,
            skip: paginationConfig.perPage * (page - 1),
            order: ["-fields.date"],
            query: search,
          }
        )
      : await contentfulClient.withoutUnresolvableLinks.getEntries<ImmigrationEntrySkeleton>(
          {
            locale,
            content_type: contentfulIds.immigration,
            limit: paginationConfig.perPage,
            skip: paginationConfig.perPage * (page - 1),
            order: ["-fields.date"],
          }
        );
    return {
      total: entries.total,
      items: entries.items.map((item) => item.fields),
    };
  }
);
