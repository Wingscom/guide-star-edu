import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { TravelEntrySkeleton } from "@/types/TravelEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getTravelDetailContent = cache(async (slug: string) => {
    const locale = await getCurrentLocale();
    const detailEntries =
        await contentfulClient.withoutUnresolvableLinks.getEntries<TravelEntrySkeleton>({
            locale,
            content_type: contentfulIds.travel,
            limit: 1,
            "fields.slug": slug,
        });
    return detailEntries.items[0].fields;
});

export type TravelContent = Awaited<ReturnType<typeof getTravelDetailContent>>;
