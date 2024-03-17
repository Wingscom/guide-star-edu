import { BlogCategory } from "@/types/BlogCategory";
import { Stack } from "@mantine/core";
import { Pagination } from "../../_components/ui/Pagination/Pagination";
import { BlogList } from "../_components/BlogList";
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

  return (
    <Stack align="center">
      <BlogList posts={posts.items} />
      <Pagination totalItems={posts.total} />
    </Stack>
  );
}
