"use client";

import { getAppLinks } from "@/links";
import { useCurrentLocale } from "@/locales/client";
import { TextInput } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function BlogSearch() {
    const router = useRouter();
    const lang = useCurrentLocale();
    const searchParams = useSearchParams();
    const links = getAppLinks(lang);
    const pathname = usePathname();
    const [value, setValue] = useState(searchParams.get("search") ?? "");
    const [debouncedValue] = useDebouncedValue(value, 500);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    };

    useEffect(() => {
        const isBlogsRoot = pathname === links.blogs();
        const isEvents = pathname === links.events();
        const isNews = pathname === links.news();
        const isScholarships = pathname === links.scholarships();

        const current = searchParams.get("search") ?? "";
        const next = debouncedValue ?? "";

        if (current === next) return;

        const queryObj = { search: debouncedValue };
        if (isEvents) {
            router.push(links.events(queryObj));
            return;
        }
        if (isNews) {
            router.push(links.news(queryObj));
            return;
        }
        if (isScholarships) {
            router.push(links.scholarships(queryObj));
            return;
        }
        if (isBlogsRoot) {
            router.push(links.blogs(queryObj));
        }
    }, [debouncedValue, links, searchParams]);

    return <TextInput value={value ?? ""} onChange={handleChangeInput} />;
}
