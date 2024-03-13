"use client";

import Image from "next/image";

export function AppLogo() {
  // TODO: Use logo for dark theme
  // const { colorScheme } = useMantineColorScheme();

  return <Image src="/logo-light.png" alt="logo" width={250} height={150} />;
}
