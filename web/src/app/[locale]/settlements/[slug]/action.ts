import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { SettlementEntrySkeleton } from "@/types/SettlementEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getSettlementDetailContent = cache(async (slug: string) => {
  const detailEntries =
    await contentfulClient.withoutUnresolvableLinks.getEntries<SettlementEntrySkeleton>({
      content_type: contentfulIds.settlement,
      limit: 1,
      "fields.slug": slug,
    });
  return detailEntries.items[0].fields;
});

export type SettlementContent = Awaited<ReturnType<typeof getSettlementDetailContent>>
