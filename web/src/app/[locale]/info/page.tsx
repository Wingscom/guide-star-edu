import {
  Badge,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { getCompanyInfoContent } from "./action";
import { getScopedI18n } from "@/locales/server";

export default async function ContactsPage() {
  const pageT = await getScopedI18n("informationPage");
  const companyInfoContent = await getCompanyInfoContent();

  return (
    <Container size="lg" py="xl">
      <Title order={1} ta="center" mb="xl">
        {companyInfoContent.companyInfo}
      </Title>

      <Paper shadow="xs" p="md" radius="md" mb="lg" withBorder>
        <Title order={3} mb="md">
          {pageT("labels.about")}
        </Title>
        <Text c="dimmed">
          {companyInfoContent.companyDescription}
        </Text>
      </Paper>

      <Paper shadow="xs" p="md" radius="md" mb="lg" withBorder>
        <Title order={3} mb="md">
          {pageT("labels.contactInformation")}
        </Title>
        <Grid mb="md">
          <GridCol span={6}>
            <Stack gap="xs">
              <Text fw={500} size="lg">
                {pageT("labels.mainHeadquarter")}
              </Text>
              <Text component="address" c="dimmed">
                {companyInfoContent.companyAddress}
              </Text>
            </Stack>
          </GridCol>
          <GridCol span={6}>
            <Stack gap="xs">
              <Text fw={500} size="lg">
                {pageT("labels.hcmHeadquarter")}
              </Text>
              <Text component="address" c="dimmed">
                {companyInfoContent.HCMaddress}
              </Text>
            </Stack>
          </GridCol>
        </Grid>
        <Divider my="md" />
        <Stack gap="xs">
          <Text fw={500} size="lg">
            {pageT("labels.taxInformation")}
          </Text>
          <Text c="dimmed">
            <Text span fw={500}>
              {pageT("labels.taxCode")}:
            </Text>{" "}
            {companyInfoContent.taxCode}
          </Text>
        </Stack>
      </Paper>

      <Paper shadow="xs" p="md" radius="md" withBorder>
        <Title order={3} mb="xs">
          {pageT("labels.businessSectors")}
        </Title>
        <Text c="dimmed" mb="md">
          {pageT("labels.businessSectorsDescriptions")}
        </Text>
        <Group gap="xs">
          {companyInfoContent.businessSectors?.map((sector, index) => (
            <Badge key={index} size="lg" variant="outline" color="gray">
              {sector}
            </Badge>
          ))}
        </Group>
      </Paper>
    </Container>
  );
}
