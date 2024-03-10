"use client";

import { BlogCategory } from "@/types/BlogCategory";
import { Badge, Card, Center, Group, Image, Text } from "@mantine/core";
import Link from "next/link";
import { Language, getLocale } from "../../locales";
import classes from "./NewsCard.module.css";

export type NewsCardProps = {
  link: string;
  image: string;
  title: string;
  description: string;
  date: string;
  category: BlogCategory;
  lang: Language;
};

export async function NewsCard({
  link,
  image,
  title,
  description,
  date,
  category,
  lang,
}: NewsCardProps) {
  const locale = await getLocale(lang);

  const getBadgeColor = (cat: BlogCategory) => {
    if (cat === BlogCategory.Event) return "blue";
    if (cat === BlogCategory.Scholarship) return "green";
    return "yellow";
  };

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Link href={link}>
          <Image src={image} height={180} />
        </Link>
      </Card.Section>

      <Text className={classes.title} fw={500} component="a" href={link}>
        {title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        {description.substring(0, 200)}...
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Text fz="sm" inline>
            {date}
          </Text>
        </Center>

        {locale.blogCategories[category] && (
          <Badge className={classes.rating} color={getBadgeColor(category)}>
            {locale.blogCategories[category]}
          </Badge>
        )}
      </Group>
    </Card>
  );
}
