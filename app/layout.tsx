import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rishil Mittal — AI/ML Engineer",
  description: "Rishil Mittal — AI/ML engineer and builder.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
