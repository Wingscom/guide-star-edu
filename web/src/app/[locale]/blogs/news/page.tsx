import { BlogCategory } from "@/types/BlogCategory";
import { BLogList } from "../_components/BlogList";
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

  return <BLogList posts={posts} />;
}
