import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { Image, Stack, Title } from "@mantine/core";
import { getOverviewDetailContent } from "./action";

export default async function OverViewDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const overviewContent = await getOverviewDetailContent(slug);

  return (
    <Stack>
      <Title>{overviewContent.title}</Title>
      {overviewContent.thumbnail?.fields.file?.url && (
        <Image alt="banner" src={overviewContent.thumbnail.fields.file.url} />
      )}
      {renderContentfulDocument(overviewContent.content)}
    </Stack>
  );
}
