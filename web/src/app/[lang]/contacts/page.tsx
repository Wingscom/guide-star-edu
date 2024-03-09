import { Container, Grid, GridCol } from "@mantine/core";
import { Language, getLocale } from "../locales";
import { ContactInfo } from "./_components/ContactInfo";
import { getContactContent } from "./action";
import { ContactForm } from "./_components/ContactForm";

export default async function ContactsPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const contactPageContent = await getContactContent();
  const locale = await getLocale(lang);
  return (
    <Container size="lg" h="100vh">
      <Grid justify="center" align="center" gutter={50}>
        <GridCol span={{ base: 12, sm: 6 }}>
          <ContactForm
            contactPageContent={contactPageContent}
            locale={locale}
          />
        </GridCol>
        <GridCol span={{ base: 12, sm: 6 }}>
          <ContactInfo contactPageContent={contactPageContent} lang={lang} />
        </GridCol>
      </Grid>
    </Container>
  );
}
