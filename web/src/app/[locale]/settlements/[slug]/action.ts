import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { SettlementEntrySkeleton } from "@/types/SettlementEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getSettlementDetailContent = cache(async (slug: string) => {
  const locale = getCurrentLocale();
  const detailEntries =
    await contentfulClient.withoutUnresolvableLinks.getEntries<SettlementEntrySkeleton>(
      {
        locale,
        content_type: contentfulIds.settlement,
        limit: 1,
        "fields.slug": slug,
      }
    );
  return detailEntries.items[0].fields;
});

export type SettlementContent = Awaited<
  ReturnType<typeof getSettlementDetailContent>
>;
