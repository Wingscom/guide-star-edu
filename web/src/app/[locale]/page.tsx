import { Stack } from "@mantine/core";
import { Countries } from "./_components/Countries/Countries";
import { Hero } from "./_components/Hero/Hero";
import { News } from "./_components/News/News";
import { Partners } from "./_components/Partners/Partners";

export default async function Home() {
  return (
    <Stack>
      <Hero />
      <Countries />
      <News />
      <Partners />
    </Stack>
  );
}
