"use client";

import { getAppLinks } from "@/links";
import { useCurrentLocale } from "@/locales/client";
import { Center, rem } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export function AppLogo() {
  const locale = useCurrentLocale();
  const links = getAppLinks(locale);

  return (
    <Link href={links.home()}>
      <Center mt={rem(4)}>
        <Image priority src="/logo.svg" alt="logo" width={60} height={60} />
      </Center>
    </Link>
  );
}
