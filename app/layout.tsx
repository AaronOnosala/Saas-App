import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "./components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Content Repurposing SaaS",
  description: "Repurpose your content across social media platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
