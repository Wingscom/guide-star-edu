"use client";

import { getAppLinks } from "@/links";
import { TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Language } from "../../locales";

export default function BlogSearch({
  lang,
  value: initialValue,
}: {
  lang: Language;
  value?: string;
}) {
  const router = useRouter();
  const links = getAppLinks(lang);
  const [value, setValue] = useState(initialValue);

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
