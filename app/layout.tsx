import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getSettings } from "@/sanity/sanity.query";
import { toPlainText } from "next-sanity";
import { SettingsType } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const settings: SettingsType = await getSettings()
  return {
    title: settings?.title
      ? {
        template: `${settings.title} | %s`,
        default: settings.title || 'Default'
      } : undefined,
    description: settings?.overview
      ? toPlainText(settings.overview)
      : undefined,
    openGraph: {
      images: settings?.ogImage?.image ? [settings.ogImage.image] : []
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
