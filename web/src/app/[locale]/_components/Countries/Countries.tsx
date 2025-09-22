import { getScopedI18n } from "@/locales/server";
import { Stack, Title } from "@mantine/core";
import { CountriesCarousel } from "./CountriesCarousel";

export async function Countries() {
  const pageT = await getScopedI18n("home");
  return (
    <Stack bg="url(/countries-bg.avif)" pt="xl" pb="lg" h={380} align="center">
      <Title
        order={2}
        mb="xl"
        c="light-dark(var(--mantine-color-gray-0), var(--mantine-color-gray-0))"
      >
        {pageT("labels.countries")}
      </Title>
      <CountriesCarousel actionLabel={pageT("actions.read")} />
    </Stack>
  );
}
