"use client";

import { Blog } from "@/app/[locale]/blogs/[slug]/action";
import { getAppLinks } from "@/links";
import { useCurrentLocale } from "@/locales/client";
import { BlogCategory } from "@/types/BlogCategory";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { NewsCard } from "../NewsCard";

export function NewsCarousel({ posts }: { posts: Blog[] }) {
  const locale = useCurrentLocale();
  const links = getAppLinks(locale);
  const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <Carousel
      withIndicators
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={3}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
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
