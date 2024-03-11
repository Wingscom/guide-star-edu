"use client";

import { getAppLinks } from "@/links";
import { useCurrentLocale } from "@/locales/client";
import { TextInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export default function BlogSearch() {
  const router = useRouter();
  const lang = useCurrentLocale();
  const searchParams = useSearchParams();
  const links = getAppLinks(lang);
  const [value, setValue] = useState(searchParams.get("search"));

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Enter") return;

    router.push(links.blogs({ search: e.currentTarget.value }));
  };

  return (
    <TextInput
      value={value ?? ""}
      onChange={handleChangeInput}
      onKeyDown={handleKeyDown}
    />
  );
}
