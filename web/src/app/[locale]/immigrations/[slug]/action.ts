import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { ImmigrationEntrySkeleton } from "@/types/ImmigrationEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getImmigrationDetailContent = cache(async (slug: string) => {
  const locale = getCurrentLocale();
  const detailEntries =
    await contentfulClient.withoutUnresolvableLinks.getEntries<ImmigrationEntrySkeleton>(
      {
        locale,
        content_type: contentfulIds.immigration,
        limit: 1,
        "fields.slug": slug,
      }
    );
  return detailEntries.items[0].fields;
});

export type ImmigrationContent = Awaited<
  ReturnType<typeof getImmigrationDetailContent>
>;
