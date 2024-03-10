import { Flex, Stack, Title } from "@mantine/core";
import { Language, getLocale } from "../../locales";
import { CountryCard } from "./CountryCard";
import { CountriesCarousel } from "./CountriesCarousel";

export type CountriesProps = {
  lang: Language;
};

export async function Countries({ lang }: CountriesProps) {
  const locale = await getLocale(lang);
  const pageLocale = locale.home;
  return (
    <Stack
      bg="url(https://pse.edu.vn/wp-content/uploads/2019/05/bg1.jpg)"
      pt="xl"
      pb="lg"
      h={380}
      align="center"
    >
      <Title order={2} mb="xl">{pageLocale.labels.countries}</Title>
      <CountriesCarousel actionLabel={pageLocale.actions.read} />
    </Stack>
  );
}
