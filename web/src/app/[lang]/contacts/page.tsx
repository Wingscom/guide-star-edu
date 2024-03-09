import {
  Container,
  Grid,
  GridCol
} from "@mantine/core";
import { Language } from "../locales";
import { ContactInfo } from "./_components/ContactInfo";
import { getContactContent } from "./action";

export default async function ContactsPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const contactPageContent = await getContactContent();
  return (
    <Container size="lg" h="100vh">
      <Grid justify="center" align="center">
        <GridCol span={{ base: 12, sm: 6 }}>Contact Form here</GridCol>
        <GridCol span={{ base: 12, sm: 6 }}>
          <ContactInfo contactPageContent={contactPageContent} lang={lang} />
        </GridCol>
      </Grid>
    </Container>
  );
}
