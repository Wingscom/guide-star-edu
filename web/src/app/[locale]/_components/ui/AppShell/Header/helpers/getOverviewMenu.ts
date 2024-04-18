"use server"

import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { getAppLinks } from "@/links";
import { OverviewMenuSkeleton } from "@/types/OverviewMenuEntrySkeleton";

const contentfulClient = createContentfulClient();

export async function getOverviewsMenu(locale: string) {
  const links = getAppLinks(locale);
  const overviewMenuEntries =
    await contentfulClient.withoutUnresolvableLinks.getEntries<OverviewMenuSkeleton>(
      {
        locale,
        content_type: contentfulIds.countryMenu,
      }
    );
  return overviewMenuEntries.items.map((menuItem) => ({
    link: "#",
    label: menuItem.fields.title,
    menu: menuItem.fields.items
      .filter((item) => !!item)
      .map((item) => ({
        link: links.overviewDetails(item!.fields.slug),
        label: item!.fields.title,
      })),
  }));
}
