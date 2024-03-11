"use client";

import { Carousel } from "@mantine/carousel";
import { CountryCard } from "./CountryCard";
import { rem } from "@mantine/core";

const data = [
  {
    image: "https://pse.edu.vn/wp-content/uploads/2019/05/singapore.jpg",
    title: "Singapore",
  },
  {
    image: "https://pse.edu.vn/wp-content/uploads/2021/11/ireland.jpg",
    title: "Ireland",
  },
  {
    image: "https://pse.edu.vn/wp-content/uploads/2020/11/du-hoc-anh.jpg",
    title: "England",
  },
  {
    image: "https://pse.edu.vn/wp-content/uploads/2019/05/nuoc-my.jpg",
    title: "America",
  },
  {
    image: "https://pse.edu.vn/wp-content/uploads/2019/05/canada.jpg",
    title: "Canada",
  },
  {
    image:
      "https://pse.edu.vn/wp-content/uploads/2019/05/Auckland-Night-Building-Queen-City-City-of-Sails-New-Zealand.jpg",
    title: "New Zealand",
  },
];

export function CountriesCarousel({ actionLabel }: { actionLabel: string }) {
  return (
    <Carousel
      slideSize={{ base: "100%", sm: "50%", lg: "25%" }}
      slideGap={{ base: rem(2), sm: "xl" }}
      align="start"
      slidesToScroll={4}
      loop
    >
      {data.map((item) => (
        <Carousel.Slide key={item.title}>
          <CountryCard {...item} action={actionLabel} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
