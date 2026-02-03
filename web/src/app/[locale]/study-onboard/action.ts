import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { StudyOnboardEntrySkeleton } from "@/types/StudyOnboardEntrySkeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getStudyOnboards = cache(async () => {
    const locale = await getCurrentLocale();
    const detailEntries =
        await contentfulClient.withoutUnresolvableLinks.getEntries<StudyOnboardEntrySkeleton>({
            locale,
            content_type: contentfulIds.studyOnboard,
        });
    return detailEntries.items.map((e) => e.fields);
});

export type StudyOnboardContent = Awaited<ReturnType<typeof getStudyOnboards>>;
