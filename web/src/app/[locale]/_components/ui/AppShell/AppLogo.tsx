"use client";

import { useMantineColorScheme } from "@mantine/core";
import Image from "next/image";

export function AppLogo() {
  const { colorScheme } = useMantineColorScheme();

  if (colorScheme === "dark")
    return <Image src="/logo-white.png" alt="logo" width={83} height={50} />;

  return <Image src="/logo-black.png" alt="logo" width={83} height={50} />;
}
