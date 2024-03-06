import { Language, getLocale } from "@/app/[lang]/locales";
import { getAppLinks } from "@/links";
import { AppShell, Center, Container, Group, Menu } from "@mantine/core";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import classes from "./Header.module.css";

export type HeaderProps = {
  lang: Language;
};

export default async function Header({ lang }: HeaderProps) {
  const locale = await getLocale(lang);
  const links = getAppLinks(lang);
  const items = [
    {
      link: links.home(),
      label: locale.header.labels.home,
    },
    {
      link: links.search(),
      label: locale.header.labels.search,
    },
    {
      link: "#",
      label: locale.header.labels.itemWithMenu,
      links: [
        {
          link: "#1",
          label: locale.header.labels.menu1,
        },
        {
          link: "#2",
          label: locale.header.labels.menu2,
        },
      ],
    },
    {
      link: links.contact(),
      label: locale.header.labels.contact,
    },
  ];

  return (
    <AppShell.Header>
      <Container size="lg">
        <div className={classes.inner}>
          <MantineLogo size={28} />
          <Group gap={5} visibleFrom="sm">
            {items.map((item) => {
              if (item.links) {
                return (
                  <Menu
                    key={item.link}
                    trigger="hover"
                    transitionProps={{ exitDuration: 0 }}
                    withinPortal
                  >
                    <Menu.Target>
                      <Center className={classes.link}>
                        <span className={classes.linkLabel}>{item.label}</span>
                        <IconChevronDown size="0.9rem" stroke={1.5} />
                      </Center>
                    </Menu.Target>
                    <Menu.Dropdown>
                      {item.links.map((menuItem) => (
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
