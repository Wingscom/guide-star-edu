import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { HeroEntrySkeleton } from "@/types/HeroEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getHeroContent = cache(async () => {
  const locale = getCurrentLocale();
  const response =
    await contentfulClient.withoutUnresolvableLinks.getEntries<HeroEntrySkeleton>(
      {
        locale,
        content_type: contentfulIds.hero,
        limit: 1,
      }
    );
  return response.items[0].fields;
});

export type HeroContent = Awaited<ReturnType<typeof getHeroContent>>;
