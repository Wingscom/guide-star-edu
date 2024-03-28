import { getScopedI18n } from "@/locales/server";
import { Center, Container, Title } from "@mantine/core";

export default async function CoursesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageT = await getScopedI18n("coursesPage");

  return (
    <Container size="lg" p="xl">
      <Center mb="xl">
        <Title>{pageT("title")}</Title>
      </Center>
      {children}
    </Container>
  );
}
