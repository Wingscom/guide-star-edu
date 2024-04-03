import { getScopedI18n } from "@/locales/server";
import { Container, Stack, Title } from "@mantine/core";
import { PartnerCarousel } from "./PartnerCarousel";
import { getPartners } from "./action";

export async function Partners() {
  const pageT = await getScopedI18n("home");
  const partners = await getPartners();

  return (
    <Container size="xl" p={{ base: 2, sm: "xl"}}>
      <Stack align="center">
        <Title order={2} mb="lg">
          {pageT("labels.ourPartners")}
        </Title>
        <PartnerCarousel partners={partners} />
      </Stack>
    </Container>
  );
}
