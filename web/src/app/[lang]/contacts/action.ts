import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { EntryFields, EntrySkeletonType } from "contentful";
import { cache } from "react";

const contentfulClient = createContentfulClient();

export type ContactPageResponse = {
  title: EntryFields.Text;
  contactFormTitle: EntryFields.Text;
  contactFormSubtitle?: EntryFields.Text;
  address?: EntryFields.RichText;
  phoneNumber?: EntryFields.RichText
  email?: EntryFields.RichText
  facebook?: EntryFields.RichText
  googleIframe?: EntryFields.Text;
};

export const getContactContent = cache(
  async (): Promise<ContactPageResponse> => {
    const contactPageEntries = await contentfulClient.getEntries<
      EntrySkeletonType<ContactPageResponse>
    >({
      content_type: contentfulIds.contactPage,
    });
    return contactPageEntries.items[0].fields;
  }
);
