import {
	Container,
	Grid,
	GridCol,
	Group,
	Paper,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { ContactForm } from "./_components/ContactForm";
import { ContactInfo } from "./_components/ContactInfo";
import {
	getCompanyInfoContent,
	getContactContent,
	sendContactEmail,
} from "./action";
import { IconInfoSquare } from "@tabler/icons-react";
import { getScopedI18n } from "@/locales/server";

export default async function ContactsPage() {
	const pageT = await getScopedI18n("contactPage");
	const contactPageContent = await getContactContent();
	const companyInfoContent = await getCompanyInfoContent();

	return (
		<Container size="lg" p={8}>
			<Grid justify="center" align="start" gutter={50}>
				<GridCol span={{ base: 12, sm: 6 }}>
					<Stack gap="md">
						<ContactForm
							contactPageContent={contactPageContent}
							sendContactEmail={sendContactEmail}
						/>

						<Paper p="xl" shadow="md" withBorder>
							<Group mb="md">
								<ThemeIcon size="lg" radius="md">
									<IconInfoSquare size={18} />
								</ThemeIcon>
								<Title size="1.25rem" order={2}>
									{pageT("labels.about")}
								</Title>
							</Group>

							<Text>{companyInfoContent.companyDescription}</Text>
						</Paper>
					</Stack>
				</GridCol>
				<GridCol span={{ base: 12, sm: 6 }}>
					<ContactInfo />
				</GridCol>
			</Grid>
		</Container>
	);
}
