import { Stack, Container } from "@mantine/core";
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
        <Container size="xl" py="xl">
            <Stack align="center" gap="xl">
                <StudyOnboardList posts={posts} />
                <Pagination totalItems={posts.length} />
            </Stack>
        </Container>
    );
}
