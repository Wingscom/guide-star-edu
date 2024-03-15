"use client";

import { Group, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { HeaderMenu } from "./Header";
import classes from "./Header.module.css";

export function HeaderMenuDesktop({ items }: { items: HeaderMenu[] }) {
  return (
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
                                <Menu.Item>{childMenuItem.label}</Menu.Item>
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
    </Group>
  );
}
