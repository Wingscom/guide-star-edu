"use client";

import {
  Card,
  Center,
  Image,
  MantineTheme,
  useComputedColorScheme,
} from "@mantine/core";
import { PartnerLogo } from "./action";

export type PartnerCardProps = {
  theme: MantineTheme;
  partner: PartnerLogo;
};

export function PartnerCard({ theme, partner }: PartnerCardProps) {
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });

  const getBackground = (bg: typeof partner.background) => {
    if (bg === "Dark") {
      if (computedColorScheme === "dark") return undefined;
      return theme.colors.dark[5];
    }
    if (bg === "Light") {
      if (computedColorScheme === "light") return undefined;
      return "white";
    }
    return undefined;
  };

  return (
    <Card
      withBorder
      radius="md"
      h="100%"
      component="a"
      href={partner.url}
      target="_blank"
      px="xl"
      bg={getBackground(partner.background)}
    >
      <Center h="100%">
        <Image
          src={partner.image?.fields.file?.url}
          height="auto"
          miw={200}
          alt={partner.name}
          fallbackSrc={`https://placehold.co/300x200?text=${partner.name}`}
        />
      </Center>
    </Card>
  );
}
