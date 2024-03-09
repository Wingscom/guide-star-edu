import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { Box, Flex, Space, Text } from "@mantine/core";
import { Language, getLocale } from "../../locales";
import { ContactPageResponse } from "../action";
import classes from "./ContactInfo.module.css";

export type ContactInfoProps = {
  contactPageContent: ContactPageResponse;
  lang: Language;
};

export async function ContactInfo({
  contactPageContent,
  lang,
}: ContactInfoProps) {
  const locale = await getLocale(lang);
  return (
    <Flex h="80vh" direction="column" justify="center" p="lg">
      {contactPageContent.address && (
        <>
          <Text c="dimmed">{locale.contactPage.labels.address}</Text>
          <Text>{renderContentfulDocument(contactPageContent.address)}</Text>
          <Space h="lg" />
        </>
      )}
      {contactPageContent.email && (
        <>
          <Text c="dimmed">{locale.contactPage.labels.email}</Text>
          <Text>{renderContentfulDocument(contactPageContent.email)}</Text>
          <Space h="lg" />
        </>
      )}
      {contactPageContent.phoneNumber && (
        <>
          <Text c="dimmed">{locale.contactPage.labels.phoneNumber}</Text>
          <Text>
            {renderContentfulDocument(contactPageContent.phoneNumber)}
          </Text>
          <Space h="lg" />
        </>
      )}
      {contactPageContent.facebook && (
        <>
          <Text c="dimmed">{locale.contactPage.labels.facebook}</Text>
          <Text c="blue">
            {renderContentfulDocument(contactPageContent.facebook)}
          </Text>
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
