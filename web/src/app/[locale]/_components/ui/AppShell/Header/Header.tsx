"use client";

import { useAsync } from "@/hooks/useAsync";
import { getAppLinks } from "@/links";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { AppShell, Container, Group, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { AppLogo } from "../AppLogo";
import { LangToggler } from "../LangToggler/LangToggler";
import { ThemeToggler } from "../ThemeToggler/ThemeToggler";
import classes from "./Header.module.css";
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
      label: headerT("labels.overviews"),
      menu: overviewMenu.result ?? [],
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
          <Group gap={5} visibleFrom="sm">
            {items.map((item, itemIndex) => {
              if (item.menu) {
                return (
                  <Menu
                    key={itemIndex}
                    trigger="hover"
                    transitionProps={{ exitDuration: 0 }}
                    withinPortal
                    closeOnItemClick={false}
                    keepMounted
                  >
                    <Menu.Target>
                      <Link href={item.link} className={classes.link}>
                        <span className={classes.linkLabel}>{item.label}</span>
                        <IconChevronDown size="0.9rem" stroke={1.5} />
                      </Link>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {item.menu.map((menuItem, menuItemIndex) => {
                        if (menuItem.menu) {
                          return (
                            <div key={menuItemIndex}>
                              <Menu.Label>{menuItem.label}</Menu.Label>
                              {menuItem.menu.map(
                                (childMenuItem, childMenuItemIndex) => (
                                  <div key={childMenuItemIndex}>
                                    <Link
                                      href={childMenuItem.link}
                                      className={classes.linkItem}
                                    >
                                      <Menu.Item>
                                        {childMenuItem.label}
                                      </Menu.Item>
                                    </Link>
                                  </div>
                                )
                              )}
                              {menuItemIndex !== item.menu!.length - 1 && (
                                <Menu.Divider />
                              )}
                            </div>
                          );
                        }

                        return (
                          <Link
                            key={menuItemIndex}
                            href={menuItem.link}
                            className={classes.linkItem}
                          >
                            <Menu.Item>{menuItem.label}</Menu.Item>
                          </Link>
                        );
                      })}
                    </Menu.Dropdown>
                  </Menu>
                );
              }
              return (
                <Link key={itemIndex} href={item.link} className={classes.link}>
                  {item.label}
                </Link>
              );
            })}
            <ThemeToggler />
            <LangToggler />
          </Group>
        </div>
      </Container>
    </AppShell.Header>
  );
}
