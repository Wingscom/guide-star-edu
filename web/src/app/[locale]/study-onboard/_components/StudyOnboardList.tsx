import { SimpleGrid } from "@mantine/core";
import { getAppLinks } from "@/links";
import { getCurrentLocale } from "@/locales/server";
import { OnBoardCard } from "./OnBoardCards";
import { StudyOnboardContent } from "../action";

export async function StudyOnboardList({ posts }: { posts: StudyOnboardContent }) {
    const locale = await getCurrentLocale();
    const links = getAppLinks(locale);

    return (
        <SimpleGrid cols={{ base: 1, sm: 2 }}>
            {posts &&
                posts.map((post) => (
                    <OnBoardCard
                        key={post.slug}
                        link={links.studyOnboardDetail(post.slug)}
                        image={post.thumbnail?.fields.file?.url}
                        title={post?.title}
                        description={""}
                    />
                ))}
        </SimpleGrid>
    );
}
