import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { Stack, Title } from "@mantine/core";
import { getTravelDetailContent } from "./action";
import { getProcessingApplicationVisa } from "../action";
import { ProcessApplication } from "../_components";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import WrapperSignUpForm from "../_components/WrapperSignupForm";
import { getScopedI18n } from "@/locales/server";

export default async function TravelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const travelContent = await getTravelDetailContent(slug);

    const processingVisaContent = await getProcessingApplicationVisa();

    const document = await richTextFromMarkdown(travelContent.description as unknown as string);

    return (
        <Stack style={{ position: "relative" }}>
            <Title>{travelContent.title}</Title>
            {renderContentfulDocument(document)}
            <ProcessApplication
                steps={processingVisaContent.steps}
                title={processingVisaContent.title}
            />
            <div style={{ height: 30 }} />
            <WrapperSignUpForm />
        </Stack>
    );
}
