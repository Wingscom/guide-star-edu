"use client";

import { Carousel } from "@mantine/carousel";
import { useMantineTheme } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { PartnerLogo } from "./action";
import { PartnerCard } from "./PartnerCard";

export function PartnerCarousel({
  partners,
}: Readonly<{ partners: PartnerLogo[] }>) {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const theme = useMantineTheme();

  return (
    <Carousel
      slideSize={{ base: "100%", xs: "50%", md: "33.33%", lg: "25%" }}
      slideGap="sm"
      maw="100vw"
      p="md"
      loop
      align="start"
      slidesToScroll={1}
      plugins={[autoplay.current]}
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}
    >
      {partners.map((partner) => (
        <Carousel.Slide key={partner.name}>
          <PartnerCard theme={theme} partner={partner} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
