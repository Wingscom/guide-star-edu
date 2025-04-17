import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { Image, Stack, Title } from "@mantine/core";
import { getTravelDetailContent } from "./action";

export default async function TravelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const travelContent = await getTravelDetailContent(slug);

  return (
    <Stack>
      <Title>{travelContent.title}</Title>
      {travelContent.bannerImage?.fields.file?.url && (
        <Image
          alt="banner"
          src={travelContent.bannerImage.fields.file.url}
        />
      )}
      {renderContentfulDocument(travelContent.content)}
    </Stack>
  );
}
