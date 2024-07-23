import type { Metadata } from "next"
import { Spectral, Bebas_Neue } from "next/font/google"
import "./globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { loadSettings } from "@/sanity/lib/queries"
import { toPlainText } from "next-sanity"
import { draftMode } from "next/headers"

import LiveVisualEditing from "@/sanity/loader/LiveVisualEditing"

const serif = Spectral({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-serif" })
const sans = Bebas_Neue({ subsets: ["latin"], weight: "400", variable: "--font-sans"})

export async function generateMetadata(): Promise<Metadata> {
  const {data: settings} = await loadSettings()
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
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body className={`${serif.variable} ${sans.variable} font-serif min-h-screen flex-col items-center selection:bg-theme-dark selection:text-white`}>
        {children}
        {draftMode().isEnabled && <LiveVisualEditing />}
      </body>
    </html>
  )
}
