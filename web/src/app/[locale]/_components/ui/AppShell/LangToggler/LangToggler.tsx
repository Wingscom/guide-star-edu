"use client";

import { useChangeLocale, useCurrentLocale } from "@/locales/client";
import { ActionIcon, Group, Text } from "@mantine/core";

export function LangToggler() {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => changeLocale(currentLocale === "vi" ? "en" : "vi")}
        variant="default"
        size="md"
        aria-label="Toggle language"
      >
        <Text>{currentLocale.toUpperCase()}</Text>
      </ActionIcon>
    </Group>
  );
}
