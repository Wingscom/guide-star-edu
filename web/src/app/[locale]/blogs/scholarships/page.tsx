import { BlogCategory } from "@/types/BlogCategory";
import { BlogList } from "../_components/BlogList";
import { searchPostsWithCategory } from "../action";
import { Pagination } from "../../_components/ui/Pagination/Pagination";
import { Stack } from "@mantine/core";

export default async function ScholarshipsPage({
  searchParams: { search, page },
}: {
  searchParams: { search?: string; page?: number };
}) {
  const posts = await searchPostsWithCategory({
    search,
    page,
    category: BlogCategory.Scholarship,
  });

  return (
    <Stack align="center">
      <BlogList posts={posts.items} />
      <Pagination totalItems={posts.total} />
    </Stack>
  );
}
