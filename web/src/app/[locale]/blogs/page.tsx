import { getCurrentLocale } from "@/locales/server";
import { NewsCard } from "../_components/News/NewsCard";
import { searchPosts } from "./action";
import { getAppLinks } from "@/links";
import { BlogCategory } from "@/types/BlogCategory";
import { SimpleGrid } from "@mantine/core";

export default async function BlogsPage({
  searchParams: { search, page },
}: {
  searchParams: { search?: string; page?: number };
}) {
  const posts = await searchPosts({ search, page });
  const locale = getCurrentLocale();
  const links = getAppLinks(locale);

  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }}>
      {posts.map((post) => (
        <NewsCard
          key={post.slug}
          link={links.blogDetails(post.slug)}
          image={post.thumbnail?.fields.file?.url}
          title={post.title}
          category={post.category as BlogCategory}
          date={post.date ?? ""}
          description={""}
        />
      ))}
    </SimpleGrid>
  );
}
