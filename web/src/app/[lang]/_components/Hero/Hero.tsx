import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "./Hero.module.css";
import { Language, getLocale } from "../../locales";

export type HeroProps = {
  lang: Language;
};

export async function Hero({ lang }: HeroProps) {
  const locale = await getLocale(lang);
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>{locale.home.hero.title}</Title>
        <Text className={classes.description} size="xl" mt="xl">
          {locale.home.hero.description}
        </Text>

        <Button
          // variant="gradient"
          size="xl"
          radius="xl"
          className={classes.control}
        >
          {locale.home.hero.actions.signUp}
        </Button>
      </Container>
    </div>
  );
}
