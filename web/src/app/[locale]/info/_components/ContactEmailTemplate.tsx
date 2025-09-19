import * as React from "react";
import { ContactFormType } from "./ContactForm";

export type ContactEmailTemplateProps = ContactFormType;

export function ContactEmailTemplate({
  fullName,
  email,
  phoneNumber,
  contactMessage,
}: Readonly<ContactEmailTemplateProps>) {
  return (
    <div>
      <p>
        Hi GuideStarEdu, you have just received a contact request with the
        following information:
      </p>
      <p>Customer fullname: {fullName}</p>
      <p>Customer email: {email}</p>
      <p>Customer phone number: {phoneNumber}</p>
      <p>Customer message:</p>
      <p style={{ whiteSpace: "pre-line" }}>{contactMessage}</p>
    </div>
  );
}
