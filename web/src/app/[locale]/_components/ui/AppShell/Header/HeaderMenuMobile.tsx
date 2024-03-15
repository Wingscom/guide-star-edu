"use client";

import {
  ActionIcon,
  Box,
  Collapse,
  Divider,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  useComputedColorScheme,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";
import { HeaderMenu } from "./Header";
import classes from "./Header.module.css";

export function HeaderMenuMobile({ items }: { items: HeaderMenu[] }) {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const [menuExpanseState, setMenuExpanseState] = useState(
    items.map((item) => false)
  );

  return (
    <ScrollArea h={500}>
      <Stack
        gap={0}
        align="stretch"
        p="sm"
        component={Paper}
      >
        {items.map((item, itemIndex) => {
          return (
            <Stack key={itemIndex} gap={0}>
              <Group gap={0} justify="flex-end">
                <Link href={item.link} className={classes.link}>
                  {item.label}
                </Link>
                {item.menu ? (
                  <ActionIcon
                    variant="transparent"
                    onClick={() =>
                      setMenuExpanseState((prev) =>
                        Object.assign([], prev, {
                          [itemIndex]: !prev[itemIndex],
                        })
                      )
                    }
                  >
                    <IconChevronDown size="0.9rem" stroke={1.5} />
                  </ActionIcon>
                ) : (
                  <Box w={28} />
                )}
              </Group>
              {item.menu && (
                <Collapse in={menuExpanseState[itemIndex]}>
                  <Stack gap={0} mr={28} mb="md">
                    {item.menu.map((menuItem, menuItemIndex) => (
                      <div key={menuItemIndex}>
                        <Stack gap={0} align="flex-end">
                          {menuItem.menu ? (
                            <Text key={menuItemIndex} size="xs" py={0} px="sm" mt="md">
                              {menuItem.label}
                            </Text>
                          ) : (
                            <Link
                              key={menuItemIndex}
                              href={menuItem.link}
                              className={classes.link}
                            >
                              {menuItem.label}
                            </Link>
                          )}
                          {menuItem.menu?.map(
                            (childMenuItem, childMenuItemIndex) => (
                              <Link
                                key={childMenuItemIndex}
                                href={childMenuItem.link}
                                className={classes.link}
                              >
                                {childMenuItem.label}
                              </Link>
                            )
                          )}
                        </Stack>
                      </div>
                    ))}
                  </Stack>
                </Collapse>
              )}
            </Stack>
          );
        })}
      </Stack>
    </ScrollArea>
  );
}
