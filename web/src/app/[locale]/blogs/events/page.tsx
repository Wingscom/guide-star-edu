import { BlogCategory } from "@/types/BlogCategory";
import { BLogList } from "../_components/BlogList";
import { searchPostsWithCategory } from "../action";

export default async function EventsPage({
  searchParams: { search, page },
}: {
  searchParams: { search?: string; page?: number };
}) {
  const posts = await searchPostsWithCategory({
    search,
    page,
    category: BlogCategory.Event,
  });

  return <BLogList posts={posts} />;
}
