import AppShell from "@/components/ui/AppShell/AppShell";
import { Language } from "./locales";

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Language };
}>) {
  return <AppShell lang={lang}>{children}</AppShell>;
}
