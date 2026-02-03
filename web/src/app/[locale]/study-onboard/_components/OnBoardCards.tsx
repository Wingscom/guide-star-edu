"use client";

import { Card, Image, Text } from "@mantine/core";
import Link from "next/link";
import classes from "./OnboardCard.module.css";

export type OnBoardCardProps = {
    link: string;
    image?: string;
    title: string;
    description: string;
};

export function OnBoardCard({ link, image, title, description }: OnBoardCardProps) {
    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section>
                <Link href={link}>
                    <Image
                        src={image}
                        height={180}
                        alt="news-thumbnail"
                        fallbackSrc="https://placehold.co/300x200?text=Empty"
                    />
                </Link>
            </Card.Section>

            <Text className={classes.title} fw={500} component="a" href={link}>
                {title}
            </Text>

            <Text fz="sm" c="dimmed" lineClamp={4}>
                {description.substring(0, 200)}...
            </Text>
        </Card>
    );
}
