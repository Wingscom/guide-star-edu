import { BlogCategory } from "@/types/BlogCategory";
import { BlogList } from "../_components/BlogList";
import { searchPostsWithCategory } from "../action";

export default async function NewsPage({
  searchParams: { search, page },
}: {
  searchParams: { search?: string; page?: number };
}) {
  const posts = await searchPostsWithCategory({
    search,
    page,
    category: BlogCategory.News,
  });

  return <BlogList posts={posts} />;
}
