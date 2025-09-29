import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { Stack, Title } from "@mantine/core";
import { getTravelDetailContent } from "./action";
import { getProcessingApplicationVisa } from "../action";
import { ProcessApplication } from "../_components";

export default async function TravelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const travelContent = await getTravelDetailContent(slug);

    const processingVisaContent = await getProcessingApplicationVisa();

    return (
        <Stack>
            <Title>{travelContent.title}</Title>
            {renderContentfulDocument(travelContent.description)}
            <ProcessApplication
                steps={processingVisaContent.steps}
                title={processingVisaContent.title}
            />
        </Stack>
    );
}
