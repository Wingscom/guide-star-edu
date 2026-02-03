import { cache } from "react";
import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { StudyOnboardEntrySkeleton } from "@/types/StudyOnboardEntrySkeleton";

const contentfulClient = createContentfulClient();

export const getStudyOnboardDetailContent = cache(async (slug: string) => {
    const locale = await getCurrentLocale();
    const studyOnboardDetailEntries =
        await contentfulClient.withoutUnresolvableLinks.getEntries<StudyOnboardEntrySkeleton>({
            locale,
            content_type: contentfulIds.studyOnboard,
            limit: 1,
            "fields.slug": slug,
        });
    return studyOnboardDetailEntries?.items[0]?.fields;
});

export type StudyOnboard = Awaited<ReturnType<typeof getStudyOnboardDetailContent>>;
