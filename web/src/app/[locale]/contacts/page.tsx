import { Container, Grid, GridCol } from "@mantine/core";
import { ContactForm } from "./_components/ContactForm";
import { ContactInfo } from "./_components/ContactInfo";
import { getContactContent } from "./action";

export default async function ContactsPage() {
  const contactPageContent = await getContactContent();
  return (
    <Container size="lg" h="100vh">
      <Grid justify="center" align="center" gutter={50}>
        <GridCol span={{ base: 12, sm: 6 }}>
          <ContactForm contactPageContent={contactPageContent} />
        </GridCol>
        <GridCol span={{ base: 12, sm: 6 }}>
          <ContactInfo contactPageContent={contactPageContent} />
        </GridCol>
      </Grid>
    </Container>
  );
}
