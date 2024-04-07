import {
  BackgroundImage,
  Button,
  Container,
  Overlay,
  Text,
  Title,
} from "@mantine/core";
import classes from "./Hero.module.css";
import { getHeroContent } from "./action";

export async function Hero() {
  const content = await getHeroContent();

  return (
    <BackgroundImage
      pos="relative"
      bgp="center"
      bgsz="cover"
      src={content.backgroundImage?.fields.file?.url ?? ""}
    >
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>{content.title}</Title>
        <Text className={classes.description} size="xl" mt="xl">
          {content.description}
        </Text>

        <Button size="xl" radius="xl" className={classes.control}>
          {content.actionText}
        </Button>
      </Container>
    </BackgroundImage>
  );
}
