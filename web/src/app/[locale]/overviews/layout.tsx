import { Container, Grid, GridCol } from "@mantine/core";

export default async function OverviewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Container size="lg" p="xl">
      <Grid gutter="xl">
        <GridCol span={{ base: 12, sm: 8 }}>{children}</GridCol>
        <GridCol span={{ base: 12, sm: 4 }}></GridCol>
      </Grid>
    </Container>
  );
}
