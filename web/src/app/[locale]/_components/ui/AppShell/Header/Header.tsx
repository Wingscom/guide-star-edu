"use client";

import { getAppLinks } from "@/links";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { AppShell, Center, Container, Group, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import classes from "./Header.module.css";

export default function Header() {
  const locale = useCurrentLocale();
  const headerT = useScopedI18n("header");
  const links = getAppLinks(locale);
  const items = [
    {
      link: links.home(),
      label: headerT("labels.home"),
    },
    {
      link: links.search(),
      label: headerT("labels.search"),
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
          <Image src="/logo-white.png" alt="logo" width={83} height={50} />
          <Group gap={5} visibleFrom="sm">
            {items.map((item) => {
              if (item.menu) {
                return (
                  <Menu
                    key={item.link}
                    trigger="hover"
                    transitionProps={{ exitDuration: 0 }}
                    withinPortal
                  >
                    <Menu.Target>
                      <Link href={item.link} className={classes.link}>
                        <span className={classes.linkLabel}>{item.label}</span>
                        <IconChevronDown size="0.9rem" stroke={1.5} />
                      </Link>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {item.menu.map((menuItem) => (
                        <Link key={menuItem.link} href={menuItem.link}>
                          <Menu.Item>{menuItem.label}</Menu.Item>
                        </Link>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                );
              }
              return (
                <Link key={item.link} href={item.link} className={classes.link}>
                  {item.label}
                </Link>
              );
            })}
          </Group>
        </div>
      </Container>
    </AppShell.Header>
  );
}
