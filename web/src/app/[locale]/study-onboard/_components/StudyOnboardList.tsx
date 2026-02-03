import { SimpleGrid, Container, Center } from "@mantine/core";
import { getAppLinks } from "@/links";
import { getCurrentLocale } from "@/locales/server";
import { OnBoardCard } from "./OnBoardCards";
import { StudyOnboardContent } from "../action";

export async function StudyOnboardList({ posts }: { posts: StudyOnboardContent }) {
    const locale = await getCurrentLocale();
    const links = getAppLinks(locale);

    return (
        <Container size="lg" px="md">
            <Center>
                <SimpleGrid 
                    cols={{ base: 1, sm: 2, md: 3 }} 
                    spacing={{ base: "md", sm: "lg" }}
                    style={{ width: "100%", maxWidth: "1200px" }}
                >
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
            </Center>
        </Container>
    );
}
