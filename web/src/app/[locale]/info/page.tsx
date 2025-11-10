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
import { getCurrentLocale, getScopedI18n } from "@/locales/server";
import { Inter } from "next/font/google";
import { ContactForm } from "./_components/ContactForm";
import { getContactContent, sendContactEmail } from "./action";
import { ContactInfo } from "./_components/ContactInfo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ScrollOnLoad from "@/components/ScrollOnLoad";

const inter = Inter({ subsets: ["latin"] });

interface ContactsPageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ContactsPage({ searchParams }: ContactsPageProps) {
    const params = await searchParams;

    const pageT = await getScopedI18n("informationPage");
    const locale = await getCurrentLocale();
    const companyInfoContent = await getCompanyInfoContent({ locale });
    const contactPageContent = await getContactContent();

    return (
        <>
            {params.signup === "true" && <ScrollOnLoad amount={850} />}
            <Container size="lg" py="xl">
                <Title ff={inter.style.fontFamily} order={1} ta="center" mb="xl">
                    {companyInfoContent.companyInfo}
                </Title>

                <Paper shadow="xs" p="md" radius="md" mb="lg" withBorder>
                    <Title ff={inter.style.fontFamily} order={3} mb="md">
                        {pageT("labels.about")}
                    </Title>
                    <Text c="dimmed">{companyInfoContent.companyDescription}</Text>
                </Paper>

                <Paper shadow="xs" p="md" radius="md" mb="lg" withBorder>
                    <Title ff={inter.style.fontFamily} order={3} mb="md">
                        {pageT("labels.contactInformation")}
                    </Title>
                    <Grid mb="md">
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Stack gap="xs">
                                <Text fw={500} size="lg">
                                    {pageT("labels.mainHeadquarter")}
                                </Text>
                                <Text component="address" c="dimmed">
                                    {companyInfoContent.companyAddress}
                                </Text>
                            </Stack>
                        </GridCol>
                        <GridCol span={{ base: 12, md: 6 }}>
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
                    <Grid mb="md">
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Stack gap="xs">
                                <Text fw={500} size="lg">
                                    {pageT("labels.taxCode")}
                                </Text>
                                <Text c="dimmed">{companyInfoContent.taxCode}</Text>
                            </Stack>
                        </GridCol>
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Stack gap="xs">
                                <Text fw={500} size="lg">
                                    {pageT("labels.taxCodeHCM")}
                                </Text>
                                <Text c="dimmed">{companyInfoContent.taxCodeHCM}</Text>
                            </Stack>
                        </GridCol>
                    </Grid>
                </Paper>

                <Paper shadow="xs" p="md" radius="md" withBorder>
                    <Title ff={inter.style.fontFamily} order={3} mb="xs">
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

                <Grid
                    justify="center"
                    align="center"
                    gutter={50}
                    style={{ paddingTop: 40, paddingBottom: 40 }}
                >
                    <GridCol span={{ base: 12, sm: 6 }}>
                        <ContactForm
                            contactPageContent={contactPageContent}
                            sendContactEmail={sendContactEmail}
                        />
                    </GridCol>
                    <GridCol span={{ base: 12, sm: 6 }}>
                        <ContactInfo contactPageContent={contactPageContent} />
                    </GridCol>
                </Grid>
            </Container>
        </>
    );
}
