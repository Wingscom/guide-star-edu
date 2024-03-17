import { Stack } from "@mantine/core";
import { BlogList } from "./_components/BlogList";
import { searchPosts } from "./action";
import { Pagination } from "../_components/ui/Pagination/Pagination";

export default async function BlogsPage({
  searchParams: { search, page = 1 },
}: {
  searchParams: { search?: string; page?: number };
}) {
  const posts = await searchPosts({ search, page });

  return (
    <Stack align="center">
      <BlogList posts={posts.items} />
      <Pagination totalItems={posts.total} />
    </Stack>
  );
}
