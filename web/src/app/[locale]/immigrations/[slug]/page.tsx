import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { Image, Stack, Title } from "@mantine/core";
import { getImmigrationDetailContent } from "./action";

export default async function ImmigrationDetailPage({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>;
}>) {
  const { slug } = await params;
  const immigrationContent = await getImmigrationDetailContent(slug);

  return (
    <Stack>
      <Title>{immigrationContent.title}</Title>
      {immigrationContent.thumbnail?.fields.file?.url && (
        <Image alt="banner" src={immigrationContent.thumbnail.fields.file.url} />
      )}
      {renderContentfulDocument(immigrationContent.content)}
    </Stack>
  );
}
