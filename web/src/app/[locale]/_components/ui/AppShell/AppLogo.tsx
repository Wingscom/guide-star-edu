"use client";

import { getAppLinks } from "@/links";
import { useCurrentLocale } from "@/locales/client";
import Image from "next/image";
import Link from "next/link";

export function AppLogo() {
  // TODO: Use logo for dark theme
  // const { colorScheme } = useMantineColorScheme();
  const locale = useCurrentLocale();
  const links = getAppLinks(locale);

  return (
    <Link href={links.home()}>
      <Image src="/logo-light.png" alt="logo" width={250} height={150} />
    </Link>
  );
}
