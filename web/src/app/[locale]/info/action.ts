import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import { cache } from "react";
import { ContactFormType } from "./_components/ContactForm";
import { render } from "@react-email/render";
import { ContactEmailTemplate } from "./_components/ContactEmailTemplate";
import { sendEmail } from "@/helpers/sendEmail";

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


export type ContactPageEntry = {
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
    EntrySkeletonType<ContactPageEntry>
  >({
    content_type: contentfulIds.contactPage,
  });
  return contactPageEntries.items[0].fields;
});

export type ContactPageResponse = Awaited<ReturnType<typeof getContactContent>>;

export const sendContactEmail = async (request: ContactFormType) => {
  "use server";
  try {
    const htmlContent = await render(ContactEmailTemplate(request));
    const data = await sendEmail({
      to: process.env.RECIPIENT_EMAIL ?? "",
      subject: `[GuideStarEdu] Contact request from ${request.email}`,
      html: htmlContent,
    });
    return true;
  } catch (_err) {
    console.error(_err);
    return false;
  }
};

