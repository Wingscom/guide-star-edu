"use client";

import Header from "@/components/ui/Header/Header";
import { Language } from "./locales";
import { AppShell } from "@mantine/core";

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Language };
}>) {
  return (
    <AppShell header={{ height: 60 }}>
      <Header lang={lang} />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
