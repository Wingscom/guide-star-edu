import { AppShell } from "@/app/[locale]/_components/ui/AppShell/AppShell";
import { I18nProviderClient } from "@/locales/client";

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  return (
    <I18nProviderClient locale={locale}>
      <AppShell>{children}</AppShell>
    </I18nProviderClient>
  );
}
