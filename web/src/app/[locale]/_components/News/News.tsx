import { getScopedI18n } from "@/locales/server";
import { Container, Stack, Title } from "@mantine/core";
import { NewsCarousel } from "./_components/NewsCarousel";
import { getHomeNewPosts } from "./action";

export async function News() {
  const pageT = await getScopedI18n("home");
  const topPosts = await getHomeNewPosts();

  return (
    <Container size="xl" p="lg">
      <Stack align="center">
        <Title order={2} mb="lg">
          {pageT("labels.news")}
        </Title>
        <NewsCarousel posts={topPosts} />
      </Stack>
    </Container>
  );
}
