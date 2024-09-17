import type { Metadata } from "next";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import {
  constantia,
  constantiaBold,
  geistMono,
  geistSans,
} from "@/assets/fonts/fonts";
import "./globals.css";
import "@mantine/core/styles.css";

export const metadata: Metadata = {
  title: "AoM:R Tools",
  description:
    "Build guides and other helpful tools for Age of Mythology: Retold",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${constantia.variable} ${constantiaBold.variable} antialiased`}
      >
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
