"use client";

import { Carousel } from "@mantine/carousel";
import { rem } from "@mantine/core";
import EventCard from "./EventCard";
import { Asset } from "contentful";
import { getAppLinks } from "@/links";
import { Blog } from "../../blogs/[slug]/action";
import { BlogCategory } from "@/types/BlogCategory";

export function EventCarousel({ events }: { events: Blog[] }) {
  return (
    <Carousel
      slideSize={{ base: "100%", sm: "50%", lg: "25%" }}
      slideGap={{ base: rem(2), sm: "xl" }}
      align="start"
      slidesToScroll={4}
      maw="100vw"
      p="md"
      loop
    >
      {events &&
        events?.map((post) => (
          <Carousel.Slide key={post.title}>
            <EventCard
              key={post.slug}
              link={post.slug}
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
