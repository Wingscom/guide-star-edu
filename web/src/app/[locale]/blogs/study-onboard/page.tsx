import { BlogCategory } from "@/types/BlogCategory";
import { Stack } from "@mantine/core";
import { Pagination } from "../../_components/ui/Pagination/Pagination";
import { BlogList } from "../_components/BlogList";
import { searchPostsWithCategory } from "../action";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: number }>;
}) {
  const { search, page } = await searchParams;
  const posts = await searchPostsWithCategory({
    search,
    page,
    category: BlogCategory.StudyAboard,
  });

  return (
    <Stack align="center">
      <BlogList posts={posts.items} />
      <Pagination totalItems={posts.total} />
    </Stack>
  );
}
