import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export type ContactPageCompanyInfoEntry = {
  companyInfo: EntryFieldTypes.Text;
  taxCode: EntryFieldTypes.Text;
  taxCodeHCM: EntryFieldTypes.Text;
  companyAddress?: EntryFieldTypes.Text;
  HCMaddress?: EntryFieldTypes.Text;
  businessSectors?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  companyDescription?: EntryFieldTypes.Text;
};

export const getCompanyInfoContent = cache(async () => {
  const contactPageEntries = await contentfulClient.getEntries<
    EntrySkeletonType<ContactPageCompanyInfoEntry>
  >({
    content_type: contentfulIds.companyInfo,
  });
  return contactPageEntries.items[0].fields;
});

export type ContactPageCompanyInfoResponse = Awaited<ReturnType<typeof getCompanyInfoContent>>;