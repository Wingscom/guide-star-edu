import { BlogCategory } from "@/types/BlogCategory";
import { SimpleGrid } from "@mantine/core";
import { NewsCard } from "../../_components/News/NewsCard";
import { Blog } from "../[slug]/action";
import { getAppLinks } from "@/links";
import { getCurrentLocale } from "@/locales/server";

export async function BlogList({ posts }: { posts: Blog[] }) {
  const locale = await getCurrentLocale();
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
