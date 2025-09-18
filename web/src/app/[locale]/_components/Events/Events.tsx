import { getScopedI18n } from "@/locales/server";
import { Stack, Title } from "@mantine/core";
import { searchPostsWithCategory } from "../../blogs/action";
import { BlogCategory } from "@/types/BlogCategory";
import { EventCarousel } from "./EventCarousel";

export async function Events() {
  const pageT = await getScopedI18n("home");

  const posts = await searchPostsWithCategory({
    category: BlogCategory.Event,
  });

  return (
    <Stack bg="url(/countries-bg.avif)" pt="xl" pb="lg" align="center">
      <Title order={2} mb="xl">
        {pageT("labels.events")}
      </Title>
      <EventCarousel events={posts.items} actionLabel={pageT("actions.read")} />
    </Stack>
  );
}
