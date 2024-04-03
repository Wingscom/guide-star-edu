"use client";

import { ActionIcon, Affix, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter } from "@tabler/icons-react";
import { CourseFilter, CourseFilterProps } from "./CourseFilter";

export function CourseFilterMobile(props: Readonly<CourseFilterProps>) {
  const [isOpen, { toggle, close }] = useDisclosure(false);
  return (
    <>
      <Drawer
        opened={isOpen}
        onClose={close}
        position="top"
        withCloseButton={false}
        h="fit-content"
        hiddenFrom="sm"
      >
        <CourseFilter {...props} />
      </Drawer>
      <Affix hiddenFrom="sm" position={{ bottom: 120, right: 20 }}>
        <ActionIcon onClick={toggle} size="xl">
          <IconFilter />
        </ActionIcon>
      </Affix>
    </>
  );
}
