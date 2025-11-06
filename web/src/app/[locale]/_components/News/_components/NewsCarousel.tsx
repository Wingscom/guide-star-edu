"use client";

import type { Blog } from "@/app/[locale]/blogs/[slug]/action";
import { getAppLinks } from "@/links";
import { useCurrentLocale } from "@/locales/client";
import { BlogCategory } from "@/types/BlogCategory";
import { Carousel } from "@mantine/carousel";
import { rem } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { NewsCard } from "../NewsCard";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export function NewsCarousel({ posts }: { posts: Blog[] }) {
    const locale = useCurrentLocale();
    const links = getAppLinks(locale);
    const autoplay = useRef(Autoplay({ delay: 2000 }));

    return (
        <Carousel
            withIndicators
            slideSize={{ base: "100%", sm: "50%", lg: "33.333333%" }}
            slideGap={{ base: rem(2), sm: "xl" }}
            maw="100vw"
            p="md"
            loop
            align="start"
            slidesToScroll={3}
            plugins={[autoplay.current]}
            onMouseEnter={() => autoplay.current.stop()}
            onMouseLeave={() => autoplay.current.play()}
            controlSize={45}
            nextControlIcon={<IconChevronRight size={40} stroke={2} />}
            previousControlIcon={<IconChevronLeft size={40} stroke={2} />}
        >
            {posts.map((post) => (
                <Carousel.Slide key={post.slug}>
                    <NewsCard
                        key={post.slug}
                        link={links.blogDetails(post.slug)}
                        image={post.thumbnail?.fields.file?.url}
                        title={post.title}
                        category={post.category as BlogCategory}
                        date={post.date ?? ""}
                        description={""}
                    />
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}
