import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { PartnerLogoSkeleton } from "@/types/PartnerLogoSekeleton";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export const getPartners = cache(async () => {
  const response =
    await contentfulClient.withoutUnresolvableLinks.getEntries<PartnerLogoSkeleton>(
      {
        content_type: contentfulIds.partnerLogo,
        limit: 100,
      }
    );
  return response.items.map((item) => item.fields);
});

export type PartnerLogo = Awaited<ReturnType<typeof getPartners>>[number];
