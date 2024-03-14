import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { Image, Stack, Title } from "@mantine/core";
import { getOverviewDetailContent } from "./action";

export default async function OverViewDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const overviewContent = await getOverviewDetailContent(slug);

  return (
    <Stack>
      <Title>{overviewContent.title}</Title>
      {overviewContent.bannerImage?.fields.file?.url && (
        <Image
          alt="banner"
          src={overviewContent.bannerImage.fields.file.url}
        />
      )}
      {renderContentfulDocument(overviewContent.content)}
    </Stack>
  );
}
