import { Box, Stack } from "@mantine/core";
import { ContactFormType } from "./ContactForm";

export type ContactEmailTemplateProps = ContactFormType;

export function ContactEmailTemplate({
  fullName,
  email,
  phoneNumber,
  contactMessage,
}: Readonly<ContactEmailTemplateProps>) {
  return (
    <Stack>
      <p>
        Hi GuideStarEdu, you've just received a contact request with the
        following information:
      </p>
      <p>Customer fullname: {fullName}</p>
      <p>Customer email: {email}</p>
      <p>Customer phone number: {phoneNumber}</p>
      <p>Customer message:</p>
      <Box style={{ whiteSpace: "pre-line" }}>{contactMessage}</Box>
    </Stack>
  );
}
