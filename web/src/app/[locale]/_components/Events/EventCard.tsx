"use client";

import { useScopedI18n } from "@/locales/client";
import { BlogCategory } from "@/types/BlogCategory";
import { Badge, Card, Center, Group, Image, Text } from "@mantine/core";
import Link from "next/link";
import classes from "./EventCard.module.css";

export type EventsCardProps = {
    link: string;
    image?: string;
    title: string;
    description: string;
    date: string;
    category?: BlogCategory;
};

export default function EventCard({
    link,
    image,
    title,
    description,
    date,
    category,
}: EventsCardProps) {
    const blogCategoriesT = useScopedI18n("blogCategories");

    const getBadgeColor = (cat: BlogCategory) => {
        if (cat === BlogCategory.Event) return "blue";
        if (cat === BlogCategory.Scholarship) return "green";
        return "yellow";
    };

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section>
                {link ? (
                    <Link href={link}>
                        <Image
                            src={image}
                            alt="news-thumbnail"
                            className={classes.media}
                            fallbackSrc="https://placehold.co/600x360?text=Empty"
                        />
                    </Link>
                ) : (
                    <Image
                        src={image}
                        alt="news-thumbnail"
                        className={classes.media}
                        fallbackSrc="https://placehold.co/600x360?text=Empty"
                    />
                )}
            </Card.Section>

            <div className={classes.body}>
                {link ? (
                    <Link href={link} className={classes.title}>
                        {title}
                    </Link>
                ) : (
                    <Text fw={500} className={classes.title}>
                        {title}
                    </Text>
                )}

                <Text fz="sm" c="dimmed" lineClamp={4}>
                    {description?.substring(0, 200)}...
                </Text>

                <Group justify="space-between" mt="auto">
                    <Center>
                        <Text fz="sm" inline>
                            {date}
                        </Text>
                    </Center>

                    {category && blogCategoriesT(category) && (
                        <Badge color={getBadgeColor(category)}>{blogCategoriesT(category)}</Badge>
                    )}
                </Group>
            </div>
        </Card>
    );
}
