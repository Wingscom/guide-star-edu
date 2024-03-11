import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { getAppLinks } from "@/links";
import { getCurrentLocale, getScopedI18n } from "@/locales/server";
import {
  Container,
  Divider,
  Grid,
  GridCol,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent } from "react";
import { getBlogDetailContent, getTopNewPosts } from "./action";

export default async function BlogDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const lang = getCurrentLocale();
  const links = getAppLinks(lang);
  const pageT = await getScopedI18n("blogDetail");
  const blogContent = await getBlogDetailContent(slug);
  const newPosts = await getTopNewPosts();

  const handleSearchSubmit = (e: FormEvent<HTMLInputElement>) => {
    redirect(links.blogs({ search: e.currentTarget.value }));
  };

  return (
    <Container size="lg" p="xl">
      <Grid gutter="xl">
        <GridCol span={{ base: 12, sm: 8 }}>
          <Stack>
            <Title>{blogContent.title}</Title>
            {renderContentfulDocument(blogContent.content)}
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, sm: 4 }}>
          <Title order={3} mb="md">
            {pageT("labels.search")}
          </Title>
          <Divider size="md" mb="xl" />
          <TextInput onKeyDown={handleSearchSubmit} />
          <Divider size="md" my="xl" />
          <Title order={3} mb="md">
            {pageT("labels.newPosts")}
          </Title>
          <Divider size="md" mb="xl" />
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
