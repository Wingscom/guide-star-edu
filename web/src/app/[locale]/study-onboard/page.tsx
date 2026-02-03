import { Stack } from "@mantine/core";
import { Pagination } from "../_components/ui/Pagination/Pagination";
import { StudyOnboardList } from "./_components/StudyOnboardList";
import { getStudyOnboards } from "./action";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: number }>;
}) {
  const { search, page } = await searchParams;
  const posts = await getStudyOnboards();

  return (
    <Stack align="center">
      <StudyOnboardList posts={posts} />
      <Pagination totalItems={posts.length} />
    </Stack>
  );
}
