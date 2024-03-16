import { getAppLinks } from "@/links";
import { getCurrentLocale } from "@/locales/server";
import { SimpleGrid } from "@mantine/core";
import { NewsCard } from "../_components/News/NewsCard";
import { searchSettlements } from "./action";

export default async function BlogsPage({
  searchParams: { search, page },
}: {
  searchParams: { search?: string; page?: number };
}) {
  const locale = getCurrentLocale();
  const links = getAppLinks(locale);
  const posts = await searchSettlements({ search, page });

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {posts.map((post) => (
        <NewsCard
          key={post.slug}
          link={links.blogDetails(post.slug)}
          image={post.thumbnail?.fields.file?.url}
          title={post.title}
          date={post.date ?? ""}
          description={""}
        />
      ))}
    </SimpleGrid>
  );
}
