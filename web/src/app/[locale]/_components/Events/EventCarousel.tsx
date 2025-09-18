"use client";

import { Carousel } from "@mantine/carousel";
import { rem } from "@mantine/core";
import EventCard from "./EventCard";

export function EventCarousel({
  actionLabel,
  events,
}: {
  actionLabel: string;
  events: any[];
}) {
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
        events?.map((item) => (
          <Carousel.Slide key={item.title}>
            <EventCard {...item} action={actionLabel} />
          </Carousel.Slide>
        ))}
    </Carousel>
  );
}
