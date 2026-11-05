import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FESTORA | Celebrate the Spirit of India",
  description:
    "Discover India's festivals, traditions, stories, culture, and celebrations with FESTORA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}