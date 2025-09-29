import { Container, Grid, GridCol } from "@mantine/core";

export default async function TravelsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Container size="lg" p="xl">
            {children}
        </Container>
    );
}
