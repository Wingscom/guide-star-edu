import { getAppLinks } from "@/links";
import { getCurrentLocale } from "@/locales/server";
import { SimpleGrid, Stack } from "@mantine/core";
import { NewsCard } from "../_components/News/NewsCard";
import { Pagination } from "../_components/ui/Pagination/Pagination";
import { searchImmigrations } from "./action";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: number }>;
}) {
  const { search, page } = await searchParams;
  const locale = await getCurrentLocale();
  const links = getAppLinks(locale);
  const posts = await searchImmigrations({ search, page });

  return (
    <Stack align="center">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        {posts.items.map((post) => (
          <NewsCard
            key={post.slug}
            link={links.immigrationDetail(post.slug)}
            image={post.thumbnail?.fields.file?.url}
            title={post.title}
            date={post.date ?? ""}
            description={""}
          />
        ))}
      </SimpleGrid>
      <Pagination totalItems={posts.total} />
    </Stack>
  );
}
