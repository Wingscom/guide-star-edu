import { Title, Group, Button, Container, Text } from "@mantine/core";
import classes from "./page.module.css";
import Link from "next/link";
import { getCurrentLocale, getScopedI18n } from "@/locales/server";
import { getAppLinks } from "@/links";

export default async function SearchPage() {
  const locale = getCurrentLocale();
  const links = getAppLinks(locale);
  const pageT = await getScopedI18n("comingSoonPage");
  // TODO: Implement
  return (
    <Container className={classes.root}>
      <div className={classes.label}>Coming soon</div>
      <Title className={classes.title}>{pageT("title")}</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        {pageT("description")}
      </Text>
      <Group justify="center">
        <Link href={links.home()}>
          <Button variant="subtle" size="md">
            {pageT("actions.back")}
          </Button>
        </Link>
      </Group>
    </Container>
  );
}
