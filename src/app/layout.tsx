import type { Metadata } from "next";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
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

const theme = createTheme({
  radius: { none: "0px" },
  defaultRadius: "none",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="business">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${constantia.variable} ${constantiaBold.variable} antialiased min-h-screen`}
      >
        <SessionProvider>
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            {children}
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
