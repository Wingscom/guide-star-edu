"use client";

import { AppShell as MantineAppShell } from "@mantine/core";
import NextAdapterApp from "next-query-params/app";
import { ReactNode } from "react";
import { QueryParamProvider } from "use-query-params";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <QueryParamProvider adapter={NextAdapterApp}>
      <MantineAppShell header={{ height: 60 }} footer={{ height: 100 }}>
        <Header />
        <MantineAppShell.Main>{children}</MantineAppShell.Main>
        <Footer />
      </MantineAppShell>
    </QueryParamProvider>
  );
}
