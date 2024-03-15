import { getAppLinks } from "@/links";
import { useCurrentLocale } from "@/locales/client";
import { Button, Paper, Title } from "@mantine/core";
import Link from "next/link";
import classes from "./CountryCard.module.css";

export type CountryCardProps = {
  image: string;
  title: string;
  action: string;
  slug: string;
};

export function CountryCard({ image, title, action, slug }: CountryCardProps) {
  const locale = useCurrentLocale();
  const links = getAppLinks(locale);

  return (
    <Paper
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Link href={links.overviewDetails(slug)}>
        <Button>{action}</Button>
      </Link>
    </Paper>
  );
}
