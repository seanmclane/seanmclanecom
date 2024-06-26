import type { Metadata } from "next";
import { Spectral, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getSettings } from "@/sanity/sanity.query";
import { toPlainText } from "next-sanity";
import { SettingsType } from "@/types";

const serif = Spectral({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-serif" })
const sans = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-sans"})

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
      <body className={`${serif.variable} ${sans.variable} font-serif min-h-screen flex-col items-center`}>
        {children}
      </body>
    </html>
  );
}
