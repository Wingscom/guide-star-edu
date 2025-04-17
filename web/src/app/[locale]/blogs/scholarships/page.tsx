import { BlogCategory } from "@/types/BlogCategory";
import { BlogList } from "../_components/BlogList";
import { searchPostsWithCategory } from "../action";
import { Pagination } from "../../_components/ui/Pagination/Pagination";
import { Stack } from "@mantine/core";

export default async function ScholarshipsPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ search?: string; page?: number }>;
}>) {
  const { search, page } = await searchParams;
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
