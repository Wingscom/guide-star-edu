import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { Stack, Title } from "@mantine/core";
import { getBlogDetailContent } from "./action";

export default async function BlogDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const blogContent = await getBlogDetailContent(slug);

  return (
    <Stack>
      <Title>{blogContent.title}</Title>
      {renderContentfulDocument(blogContent.content)}
    </Stack>
  );
}
