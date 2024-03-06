import { theme } from "@/theme";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Study abroad consultants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">{children}</MantineProvider>
      </body>
    </html>
  );
}
