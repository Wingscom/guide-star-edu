import { AppShell } from "@/app/[locale]/_components/ui/AppShell/AppShell";
import { I18nProviderClient } from "@/locales/client";

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <I18nProviderClient locale={locale}>
      <AppShell>{children}</AppShell>
    </I18nProviderClient>
  );
}
