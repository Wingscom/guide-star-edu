import { contentfulIds } from "@/constants/contentfulIds";
import { paginationConfig } from "@/constants/paginationConfig";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { SettlementEntrySkeleton } from "@/types/SettlementEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export type SearchSettlementsArgs = {
  search?: string;
  page?: number;
};

export const searchSettlements = cache(
  async (args: SearchSettlementsArgs = {}) => {
    const { search, page = 1 } = args;
    const locale = getCurrentLocale();
    const entries = search
      ? await contentfulClient.withoutUnresolvableLinks.getEntries<SettlementEntrySkeleton>(
          {
            locale,
            content_type: contentfulIds.settlement,
            limit: paginationConfig.perPage,
            skip: paginationConfig.perPage * (page - 1),
            order: ["-fields.date"],
            "fields.slug[match]": search,
            "fields.content[match]": search,
            "fields.title[match]": search,
          }
        )
      : await contentfulClient.withoutUnresolvableLinks.getEntries<SettlementEntrySkeleton>(
          {
            locale,
            content_type: contentfulIds.settlement,
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
