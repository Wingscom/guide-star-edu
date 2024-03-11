import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { EntryFieldTypes, EntrySkeletonType } from "contentful";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export type ContactPageResponse = {
  title: EntryFieldTypes.Text;
  contactFormTitle: EntryFieldTypes.Text;
  contactFormSubtitle?: EntryFieldTypes.Text;
  address?: EntryFieldTypes.RichText;
  phoneNumber?: EntryFieldTypes.RichText;
  email?: EntryFieldTypes.RichText;
  facebook?: EntryFieldTypes.RichText;
  googleIframe?: EntryFieldTypes.Text;
};

export const getContactContent = cache(async () => {
  const contactPageEntries = await contentfulClient.getEntries<
    EntrySkeletonType<ContactPageResponse>
  >({
    content_type: contentfulIds.contactPage,
  });
  return contactPageEntries.items[0].fields;
});
