import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { OverviewEntrySkeleton } from "@/types/OverviewEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getOverviewDetailContent = cache(async (slug: string) => {
  const blogDetailEntries =
    await contentfulClient.withoutUnresolvableLinks.getEntries<OverviewEntrySkeleton>({
      content_type: contentfulIds.countryOverview,
      limit: 1,
      "fields.slug": slug,
    });
  return blogDetailEntries.items[0].fields;
});

export type OverviewContent = Awaited<ReturnType<typeof getOverviewDetailContent>>
