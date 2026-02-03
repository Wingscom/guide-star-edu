import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Container, Title, Text } from "@mantine/core";
import { notFound } from "next/navigation";
import { getStudyOnboardDetailContent } from "./action";
import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";

interface StudyOnboardDetailPageProps {
    params: Promise<{ slug: string }>;
}

export default async function StudyOnboardDetailPage({ params }: StudyOnboardDetailPageProps) {
    const { slug } = await params;
    const post = await getStudyOnboardDetailContent(slug);

    if (!post) {
        notFound();
    }

    return (
        <Container size="lg" py="xl">
            <Title order={1} mb="md">
                {post?.title}
            </Title>

            {renderContentfulDocument(post?.content)}
        </Container>
    );
}

export async function generateMetadata({ params }: StudyOnboardDetailPageProps) {
    const { slug } = await params;
    const content = await getStudyOnboardDetailContent(slug);

    if (!content) {
        return {
            title: "Study Onboard Not Found",
        };
    }

    return {
        title: content.title,
        description: content.description,
    };
}
