"use client";

import { AppShell as MantineAppShell } from "@mantine/core";
import { ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

export type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <MantineAppShell header={{ height: 60 }} footer={{ height: 100 }}>
      <Header />
      <MantineAppShell.Main>{children}</MantineAppShell.Main>
      <Footer />
    </MantineAppShell>
  );
}
