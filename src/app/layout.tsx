import type { Metadata } from "next";
import {
  geistSans,
  geistMono,
  constantia,
  constantiaBold,
} from "@/assets/fonts/fonts";
import "./globals.css";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${constantia.variable} ${constantiaBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
