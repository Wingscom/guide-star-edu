import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { TravelEntrySkeleton, StepApplicationVisaEntrySkeleton } from "@/types/TravelEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getTravels = cache(async () => {
    const locale = await getCurrentLocale();
    const detailEntries =
        await contentfulClient.withoutUnresolvableLinks.getEntries<TravelEntrySkeleton>({
            locale,
            content_type: contentfulIds.travel,
        });
    return detailEntries.items.map((e) => e.fields);
});

export const getProcessingApplicationVisa = cache(async () => {
    const locale = await getCurrentLocale();
    const data =
        await contentfulClient.withoutUnresolvableLinks.getEntries<StepApplicationVisaEntrySkeleton>(
            {
                locale,
                content_type: contentfulIds.processApplicationVisa,
            }
        );

    return data.items[0].fields;
});

export type TravelContent = Awaited<ReturnType<typeof getTravels>>;
