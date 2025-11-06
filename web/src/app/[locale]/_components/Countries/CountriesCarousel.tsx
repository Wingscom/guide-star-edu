"use client";

import { Carousel } from "@mantine/carousel";
import { CountryCard } from "./CountryCard";
import { rem } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const data = [
    {
        image: "https://pse.edu.vn/wp-content/uploads/2019/05/singapore.jpg",
        title: "Singapore",
        slug: "singapore",
    },
    {
        image: "https://pse.edu.vn/wp-content/uploads/2020/11/Ireland-TU-Dublin-01-WEB-1-300x300.jpg",
        title: "Ireland",
        slug: "ireland",
    },
    {
        image: "https://pse.edu.vn/wp-content/uploads/2020/11/du-hoc-anh-300x300.jpg",
        title: "England",
        slug: "england",
    },
    {
        image: "https://pse.edu.vn/wp-content/uploads/2019/05/nuoc-my.jpg",
        title: "America",
        slug: "america",
    },
    {
        image: "https://pse.edu.vn/wp-content/uploads/2019/05/canada.jpg",
        title: "Canada",
        slug: "canada",
    },
    {
        image: "https://pse.edu.vn/wp-content/uploads/2019/05/Auckland-Night-Building-Queen-City-City-of-Sails-New-Zealand.jpg",
        title: "New Zealand",
        slug: "new-zealand",
    },
];

export function CountriesCarousel({ actionLabel }: { actionLabel: string }) {
    return (
        <Carousel
            slideSize={{ base: "100%", sm: "50%", lg: "25%" }}
            slideGap={{ base: rem(1), sm: "xl" }}
            align="start"
            slidesToScroll={4}
            maw="100vw"
            p="md"
            loop
            controlSize={45}
            nextControlIcon={<IconChevronRight size={40} stroke={2} />}
            previousControlIcon={<IconChevronLeft size={40} stroke={2} />}
        >
            {data.map((item) => (
                <Carousel.Slide key={item.title}>
                    <CountryCard {...item} action={actionLabel} />
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}
