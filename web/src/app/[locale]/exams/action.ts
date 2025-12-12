"use server";

import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getCurrentLocale } from "@/locales/server";
import { RegistrationFormExamEntrySkeleton } from "@/types/RegistrationFormExam";
import { ExamEntrySkeleton } from "@/types/Exam";
import { cache } from "react";
import { render } from "@react-email/render";
import { sendEmail } from "@/helpers/sendEmail";
import {
    RegistrationEmailTemplate,
    RegistrationFormType,
} from "./_components/RegistrationEmailTemplate";

const contentfulClient = createContentfulClient();

export const getInformationRegisterForm = cache(async () => {
    const locale = await getCurrentLocale();
    const informationRegisterForm =
        await contentfulClient.withoutUnresolvableLinks.getEntries<RegistrationFormExamEntrySkeleton>(
            {
                locale,
                content_type: contentfulIds.registrationFormEnglishExam,
            }
        );
    return informationRegisterForm.items.at(0)?.fields;
});

export const getListExamsAvailable = cache(async () => {
    const locale = await getCurrentLocale();

    const listExamAvailable =
        await contentfulClient.withoutUnresolvableLinks.getEntries<ExamEntrySkeleton>({
            locale,
            content_type: contentfulIds.listExams,
        });

    return listExamAvailable.items
        ?.filter((item) => item && item.fields)
        .map((item) => item.fields);
});

export const sendRegistrationEmail = async (request: RegistrationFormType) => {
    "use server";
    try {
        const htmlContent = await render(RegistrationEmailTemplate(request));
        await sendEmail({
            to: process.env.RECIPIENT_EMAIL ?? "",
            subject: `[GuideStarEdu] Exam Registration request from ${request.email}`,
            html: htmlContent,
        });
        return true;
    } catch (_err) {
        console.error(_err);
        return false;
    }
};

export type TypeListExams = Awaited<ReturnType<typeof getListExamsAvailable>>;
