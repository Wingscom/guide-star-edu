"use client";

import { Carousel } from "@mantine/carousel";
import { rem, useMantineTheme } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { PartnerLogo } from "./action";
import { PartnerCard } from "./PartnerCard";

export function PartnerCarousel({ partners }: { partners: PartnerLogo[] }) {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const theme = useMantineTheme();

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
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {partners.map((partner) => (
        <Carousel.Slide key={partner.name}>
          <PartnerCard theme={theme} partner={partner} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
