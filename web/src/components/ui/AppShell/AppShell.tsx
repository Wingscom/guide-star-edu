"use client";

import { Language } from "@/app/[lang]/locales";
import { AppShell as MantineAppShell } from "@mantine/core";
import { ReactNode } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import classes from "./AppShell.module.css"

export type AppShellProps = {
  children: ReactNode;
  lang: Language;
};

export default function AppShell({ lang, children }: AppShellProps) {
  return (
    <MantineAppShell header={{ height: 60 }}>
      <Header lang={lang} />
      <MantineAppShell.Main className={classes.main}>{children}</MantineAppShell.Main>
      <Footer />
    </MantineAppShell>
  );
}
