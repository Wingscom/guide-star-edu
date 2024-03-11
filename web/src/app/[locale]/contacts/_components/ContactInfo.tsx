import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { getScopedI18n } from "@/locales/server";
import { Box, Flex, Space, Text } from "@mantine/core";
import { ContactPageResponse } from "../action";
import classes from "./ContactInfo.module.css";

export type ContactInfoProps = {
  contactPageContent: ContactPageResponse;
};

export async function ContactInfo({ contactPageContent }: ContactInfoProps) {
  const pageT = await getScopedI18n("contactPage");

  return (
    <Flex h="80vh" direction="column" justify="center" p="lg">
      {contactPageContent.address && (
        <>
          <Text c="dimmed">{pageT("labels.address")}</Text>
          {renderContentfulDocument(contactPageContent.address)}
          <Space h="lg" />
        </>
      )}
      {contactPageContent.email && (
        <>
          <Text c="dimmed">{pageT("labels.email")}</Text>
          {renderContentfulDocument(contactPageContent.email)}
          <Space h="lg" />
        </>
      )}
      {contactPageContent.phoneNumber && (
        <>
          <Text c="dimmed">{pageT("labels.phoneNumber")}</Text>
          {renderContentfulDocument(contactPageContent.phoneNumber)}
          <Space h="lg" />
        </>
      )}
      {contactPageContent.facebook && (
        <>
          <Text c="dimmed">{pageT("labels.facebook")}</Text>
          {renderContentfulDocument(contactPageContent.facebook)}
          <Space h="lg" />
        </>
      )}
      {contactPageContent.googleIframe && (
        <Box
          className={classes.mapWrapper}
          dangerouslySetInnerHTML={{
            __html: contactPageContent.googleIframe,
          }}
        />
      )}
    </Flex>
  );
}
