"use client";

import { useAsync } from "@/hooks/useAsync";
import { getAppLinks } from "@/links";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { AppShell, Burger, Collapse, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AppLogo } from "../AppLogo";
import { LangToggler } from "../LangToggler/LangToggler";
import { ThemeToggler } from "../ThemeToggler/ThemeToggler";
import classes from "./Header.module.css";
import { HeaderItemsDesktop } from "./HeaderItemsDesktop";
import { HeaderItemsMobile } from "./HeaderItemsMobile";
import { getListTravelCountry, getOverviewsMenu } from "./helpers/getOverviewMenu";

export type HeaderItem = {
    link: string;
    label: string;
    menu?: {
        link: string;
        label: string;
        menu?: {
            link: string;
            label: string;
        }[];
    }[];
};

export default function Header() {
    const locale = useCurrentLocale();
    const headerT = useScopedI18n("header");
    const links = getAppLinks(locale);
    const overviewMenu = useAsync(() => getOverviewsMenu(locale));
    const listCountryTravels = useAsync(() => getListTravelCountry(locale));

    const [isBurgerOpen, { toggle: toggleBurger, close: closeBurger }] = useDisclosure(false);

    const items: HeaderItem[] = [
        {
            link: links.home(),
            label: headerT("labels.home"),
        },
        {
            link: "#",
            label: headerT("labels.travel"),
            menu: listCountryTravels.result ?? [],
        },
        {
            link: "#",
            label: headerT("labels.studyabroad"),
            menu: overviewMenu.result ?? [],
        },
        {
            link: links.immigrations(),
            label: headerT("labels.immigrations"),
        },
        {
            link: links.studyOnboard(),
            label: headerT("labels.blogStudyOnboard"),
        },
        {
            link: links.blogs(),
            label: headerT("labels.blogs"),
            menu: [
                {
                    link: links.news(),
                    label: headerT("labels.news"),
                },
                {
                    link: links.events(),
                    label: headerT("labels.events"),
                },
                {
                    link: links.scholarships(),
                    label: headerT("labels.scholarships"),
                },
            ],
        },
        {
            link: links.info(),
            label: headerT("labels.info"),
        },
        {
            link: links.registrationExam(),
            label: headerT("labels.exam"),
        },
    ];

    return (
        <AppShell.Header>
            <Container size="lg">
                <div className={classes.inner}>
                    <AppLogo />
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <HeaderItemsDesktop items={items} />
                    </div>
                    <Group gap={5} wrap="nowrap">
                        <ThemeToggler />
                        <LangToggler />
                        <Burger opened={isBurgerOpen} onClick={toggleBurger} hiddenFrom="sm" />
                    </Group>
                </div>
            </Container>
            <Collapse in={isBurgerOpen} hiddenFrom="sm">
                <HeaderItemsMobile items={items} onClose={closeBurger} />
            </Collapse>
        </AppShell.Header>
    );
}
