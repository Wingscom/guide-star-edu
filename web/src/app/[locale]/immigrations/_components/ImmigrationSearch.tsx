"use client";

import { getAppLinks } from "@/links";
import { useCurrentLocale } from "@/locales/client";
import { TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function ImmigrationSearch() {
  const router = useRouter();
  const lang = useCurrentLocale();
  const searchParams = useSearchParams();
  const links = getAppLinks(lang);
  const [value, setValue] = useState(searchParams.get("search") ?? "");
  const [debouncedValue] = useDebouncedValue(value, 500);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    const queryObj = { search: debouncedValue };

    router.push(links.immigrations(queryObj));
  }, [debouncedValue]);

  return <TextInput value={value ?? ""} onChange={handleChangeInput} />;
}
