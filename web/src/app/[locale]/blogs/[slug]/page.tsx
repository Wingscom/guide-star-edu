import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { Stack, Title } from "@mantine/core";
import { getBlogDetailContent } from "./action";

type BlogDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blogContent = await getBlogDetailContent(slug);

  return (
    <Stack>
      <Title>{blogContent.title}</Title>
      {renderContentfulDocument(blogContent.content)}
    </Stack>
  );
}
