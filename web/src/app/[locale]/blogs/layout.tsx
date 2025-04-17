import { getAppLinks } from "@/links";
import { getCurrentLocale, getScopedI18n } from "@/locales/server";
import { Container, Divider, Grid, GridCol, Stack, Title } from "@mantine/core";
import Link from "next/link";
import BlogSearch from "./_components/BlogSearch";
import { getTopNewPosts } from "./action";

export default async function BlogsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getCurrentLocale();
  const links = getAppLinks(lang);
  const pageT = await getScopedI18n("blogDetail");
  const newPosts = await getTopNewPosts();

  return (
    <Container size="lg" p="xl">
      <Grid gutter="xl">
        <GridCol span={{ base: 12, sm: 8 }}>{children}</GridCol>
        <GridCol span={{ base: 12, sm: 4 }}>
          <Title order={3} mb="md">
            {pageT("labels.search")}
          </Title>
          <Divider size="sm" mb="xl" />
          <BlogSearch />
          <Divider size="xl" my="xl" />
          <Title order={3} mb="md">
            {pageT("labels.newPosts")}
          </Title>
          <Divider size="sm" mb="xl" />
          <Stack gap="lg">
            {newPosts.map((post, index) => (
              <div key={post.slug}>
                <Link href={links.blogDetails(post.slug)}>{post.title}</Link>
                {index !== newPosts.length - 1 && <Divider mt="lg" />}
              </div>
            ))}
          </Stack>
        </GridCol>
      </Grid>
    </Container>
  );
}
