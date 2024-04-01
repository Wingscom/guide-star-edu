import { Card, Center, Image, MantineTheme } from "@mantine/core";
import { PartnerLogo } from "./action";

export type PartnerCardProps = {
  theme: MantineTheme;
  partner: PartnerLogo;
};

export function PartnerCard({ theme, partner }: PartnerCardProps) {
  const getBackground = (bg: typeof partner.background) => {
    if (bg === "Dark") {
      return theme.colors.dark[5];
    }
    if (bg === "Light") {
      return theme.colors.light[5];
    }
    return undefined;
  };

  return (
    <Card
      withBorder
      radius="md"
      maw="min-content"
      component="a"
      href={partner.url}
      target="_blank"
      px="xl"
      bg={getBackground(partner.background)}
    >
      <Center>
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
