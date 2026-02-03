"use client";

import { Group, Menu, ScrollArea, SimpleGrid, Stack } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { HeaderItem } from "./Header";
import classes from "./Header.module.css";

export function HeaderItemsDesktop({
  items,
}: Readonly<{ items: HeaderItem[] }>) {
  return (
    <ScrollArea 
      scrollbarSize={0} 
      scrollHideDelay={0} 
      style={{ width: "100%" }}
    >
      <Group gap={5} wrap="nowrap" style={{ minWidth: "max-content" }}>
        {items.map((item, itemIndex) => {
        if (!item.menu)
          return (
            <HeaderItemDesktop
              key={itemIndex}
              link={item.link}
              label={item.label}
            />
          );
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
              {item.menu?.[0]?.menu ? (
                <MegaMenu menu={item.menu} />
              ) : (
                <SimpleMenu menu={item.menu} />
              )}
            </Menu.Dropdown>
          </Menu>
        );
      })}
      </Group>
    </ScrollArea>
  );
}

function HeaderItemDesktop({
  link,
  label,
}: Readonly<{ link: string; label: string }>) {
  return (
    <Link href={link} className={classes.link}>
      {label}
    </Link>
  );
}

function SimpleMenu({
  menu,
}: Readonly<{
  menu: {
    link: string;
    label: string;
  }[];
}>) {
  return (
    <>
      {menu.map((menuItem, menuItemIndex) => (
        <Link
          key={menuItemIndex}
          href={menuItem.link}
          className={classes.linkItem}
        >
          <Menu.Item>{menuItem.label}</Menu.Item>
        </Link>
      ))}
    </>
  );
}

function MegaMenu({
  menu,
}: Readonly<{
  menu: {
    link: string;
    label: string;
    menu?: {
      link: string;
      label: string;
    }[];
  }[];
}>) {
  return (
    <Group align="flex-start">
      {menu.map((menuItem, menuItemIndex) => (
        <Stack key={menuItemIndex} gap={0}>
          <Menu.Label>{menuItem.label}</Menu.Label>
          <SimpleGrid cols={Math.ceil((menuItem.menu?.length ?? 0) / 10)} spacing={0}>
            {menuItem.menu?.map((childMenuItem, childMenuItemIndex) => (
              <div key={childMenuItemIndex}>
                <Link href={childMenuItem.link} className={classes.linkItem}>
                  <Menu.Item>{childMenuItem.label}</Menu.Item>
                </Link>
              </div>
            ))}
          </SimpleGrid>
        </Stack>
      ))}
    </Group>
  );
}
