"use client";

import { getAppLinks } from "@/links";
import { useCurrentLocale } from "@/locales/client";
import { TextInput } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export default function BlogSearch() {
  const router = useRouter();
  const lang = useCurrentLocale();
  const searchParams = useSearchParams();
  const links = getAppLinks(lang);
  const pathname = usePathname();
  const [value, setValue] = useState(searchParams.get("search"));

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter") return;

    const queryObj = { search: e.currentTarget.value };
    if (pathname === links.events()) {
      router.push(links.events(queryObj));
      return;
    }
    if (pathname === links.news()) {
      router.push(links.news(queryObj));
      return;
    }
    if (pathname === links.scholarships()) {
      router.push(links.scholarships(queryObj));
      return;
    }
    router.push(links.blogs(queryObj));
  };

  return (
    <TextInput
      value={value ?? ""}
      onChange={handleChangeInput}
      onKeyDown={handleKeyDown}
    />
  );
}
