import { getAppLinks } from "@/links";
import { Container, Divider, Grid, GridCol, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { Language, getLocale } from "../locales";
import BlogSearch from "./_components/BlogSearch";
import { getTopNewPosts } from "./action";

export default async function BlogsLayout({
  children,
  params: { lang },
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Language };
  searchParams?: { search: string };
}>) {
  const links = getAppLinks(lang);
  const locale = await getLocale(lang);
  const newPosts = await getTopNewPosts();

  return (
    <Container size="lg" p="xl">
      <Grid gutter="xl">
        <GridCol span={{ base: 12, sm: 8 }}>{children}</GridCol>
        <GridCol span={{ base: 12, sm: 4 }}>
          <Title order={3} mb="md">
            {locale.blogDetail.labels.search}
          </Title>
          <Divider size="sm" mb="xl" />
          <BlogSearch lang={lang} value={searchParams?.search} />
          <Divider size="xl" my="xl" />
          <Title order={3} mb="md">
            {locale.blogDetail.labels.newPosts}
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
