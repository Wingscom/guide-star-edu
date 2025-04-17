import { renderContentfulDocument } from "@/helpers/renderContentfulDocument";
import { getScopedI18n } from "@/locales/server";
import {
	Box,
	Grid,
	GridCol,
	Group,
	List,
	ListItem,
	Paper,
	Stack,
	Text,
	ThemeIcon,
} from "@mantine/core";
import { getCompanyInfoContent, getContactContent } from "../action";
import {
	IconBuilding,
	IconGlobe,
	IconInfoSquare,
	IconMail,
	IconMapPin,
} from "@tabler/icons-react";
import classes from "./ContactInfo.module.css";

export async function ContactInfo() {
	const pageT = await getScopedI18n("contactPage");
	const contactPageContent = await getContactContent();
	const companyInfoContent = await getCompanyInfoContent();

	return (
		<Stack gap="md">
			<Grid align="stretch">
				<GridCol span={{ sm: 6 }}>
					<Paper p="xl" shadow="md" h="100%" withBorder>
						<Group mb="md">
							<ThemeIcon className={classes.icon} size="lg" radius="md">
								<IconMail size={18} />
							</ThemeIcon>
							<Text className={classes.sectionTitle}>
								{pageT("labels.ourContacts")}
							</Text>
						</Group>

						<Stack gap="md">
							<div>
								<Text className={classes.label} size="sm">
									{pageT("labels.email")}
								</Text>
								<Text
									component="a"
									href={`mailto:${contactPageContent.email}`}
									className={classes.link}
								>
									{contactPageContent.email}
								</Text>
							</div>

							<div>
								<Text className={classes.label} size="sm">
									{pageT("labels.phoneNumber")}
								</Text>
								<Text
									component="a"
									href="tel:0982520148"
									className={classes.link}
								>
									{contactPageContent.phoneNumber &&
										renderContentfulDocument(contactPageContent.phoneNumber)}
								</Text>
							</div>

							<div>
								<Text className={classes.label} size="sm">
									{pageT("labels.taxCode")}
								</Text>
								<Text>{companyInfoContent.taxCode}</Text>
							</div>
						</Stack>
					</Paper>
				</GridCol>

				<GridCol span={{ sm: 6 }}>
					<Paper p="xl" shadow="md" withBorder>
						<Group mb="md">
							<ThemeIcon className={classes.icon} size="lg" radius="md">
								<IconBuilding size={18} />
							</ThemeIcon>
							<Text className={classes.sectionTitle}>
								{pageT("labels.ourLocations")}
							</Text>
						</Group>

						<Stack gap="md">
							<div>
								<Text className={classes.label} size="sm">
									Headquarters (Da Nang)
								</Text>
								<Text>{companyInfoContent.companyAddress}</Text>
							</div>

							<div>
								<Text className={classes.label} size="sm">
									Ho Chi Minh City Office
								</Text>
								<Text>{companyInfoContent.HCMaddress}</Text>
							</div>
						</Stack>
					</Paper>
				</GridCol>
			</Grid>

			<Paper p="xl" shadow="md" withBorder>
				<Group mb="md" align="center">
					<ThemeIcon className={classes.icon} size="lg" radius="md">
						<IconGlobe size={18} />
					</ThemeIcon>
					<Text className={classes.sectionTitle}>
						{pageT("labels.areaOfOperations")}
					</Text>
				</Group>

				<List spacing="xs">
					{companyInfoContent.businessSectors?.map((sector) => (
						<ListItem key={sector}>{sector}</ListItem>
					))}
				</List>
			</Paper>

			<Paper p="xl" shadow="md" withBorder>
				<Group mb="md">
					<ThemeIcon className={classes.icon} size="lg" radius="md">
						<IconMapPin size={18} />
					</ThemeIcon>
					<Text className={classes.sectionTitle}>Find Us</Text>
				</Group>

				{contactPageContent.googleIframe && (
					<Box
						className={classes.map}
						dangerouslySetInnerHTML={{
							__html: contactPageContent.googleIframe,
						}}
					/>
				)}
			</Paper>
		</Stack>
	);
}
