import { contentfulIds } from "@/constants/contentfulIds";
import { createContentfulClient } from "@/helpers/createContentfulClient";
import { EntryFieldTypes, EntrySkeletonType } from "contentful";
import { cache } from "react";
import { Resend } from "resend";
import { ContactFormType } from "./_components/ContactForm";
import { ContactEmailTemplate } from "./_components/ContactEmailTemplate";

const contentfulClient = createContentfulClient();
const resend = new Resend(process.env.RESEND_API_KEY);

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
  "use server"
  const data = await resend.emails.send({
    from: "GuideStarEdu <onboarding@resend.dev>",
    to: [process.env.RESEND_RECIPIENT_EMAIL],
    subject: `[GuideStarEdu] Contact request from ${request.email}`,
    react: ContactEmailTemplate(request),
  });
  if (data.error) {
    console.error("Error sending a contact request email");
  }
};
