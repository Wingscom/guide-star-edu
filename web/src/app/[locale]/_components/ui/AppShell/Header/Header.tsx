"use client";

import { useAsync } from "@/hooks/useAsync";
import { getAppLinks } from "@/links";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { AppShell, Burger, Collapse, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AppLogo } from "../AppLogo";
import { LangToggler } from "../LangToggler/LangToggler";
import { ThemeToggler } from "../ThemeToggler/ThemeToggler";
import classes from "./Header.module.css";
import { HeaderMenuDesktop } from "./HeaderMenuDesktop";
import { HeaderMenuMobile } from "./HeaderMenuMobile";
import { getOverviewsMenu } from "./helpers/getOverviewMenu";

export type HeaderMenu = {
  link: string;
  label: string;
  menu?: {
    link: string;
    label: string;
    menu?: {
      link: string;
      label: string;
    }[];
  }[];
};

export default function Header() {
  const locale = useCurrentLocale();
  const headerT = useScopedI18n("header");
  const links = getAppLinks(locale);
  const overviewMenu = useAsync(() => getOverviewsMenu(locale));

  const [isBurgerOpen, { toggle: toggleBurger, close: closeBurger }] =
    useDisclosure(false);

  const items: HeaderMenu[] = [
    {
      link: links.home(),
      label: headerT("labels.home"),
    },
    {
      link: links.search(),
      label: headerT("labels.search"),
    },
    {
      link: "#",
      label: headerT("labels.studyabroad"),
      menu: overviewMenu.result ?? [],
    },
    {
      link: links.immigrations(),
      label: headerT("labels.immigrations"),
    },
    {
      link: links.blogs(),
      label: headerT("labels.blogs"),
      menu: [
        {
          link: links.news(),
          label: headerT("labels.news"),
        },
        {
          link: links.events(),
          label: headerT("labels.events"),
        },
        {
          link: links.scholarships(),
          label: headerT("labels.scholarships"),
        },
      ],
    },
    {
      link: links.contact(),
      label: headerT("labels.contact"),
    },
  ];

  return (
    <AppShell.Header>
      <Container size="lg">
        <div className={classes.inner}>
          <AppLogo />
          <Group gap={5} wrap="nowrap">
            <HeaderMenuDesktop items={items} />
            <ThemeToggler />
            <LangToggler />
            <Burger
              opened={isBurgerOpen}
              onClick={toggleBurger}
              hiddenFrom="sm"
            />
          </Group>
        </div>
      </Container>
      <Collapse in={isBurgerOpen} hiddenFrom="sm">
        <HeaderMenuMobile items={items} onClose={closeBurger} />
      </Collapse>
    </AppShell.Header>
  );
}
