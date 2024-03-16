import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { Image, Stack, Title } from "@mantine/core";
import { getSettlementDetailContent } from "./action";

export default async function SettlementDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const settlementContent = await getSettlementDetailContent(slug);

  return (
    <Stack>
      <Title>{settlementContent.title}</Title>
      {settlementContent.thumbnail?.fields.file?.url && (
        <Image alt="banner" src={settlementContent.thumbnail.fields.file.url} />
      )}
      {renderContentfulDocument(settlementContent.content)}
    </Stack>
  );
}
