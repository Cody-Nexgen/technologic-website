import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Technologic - Smarter Everything",
  description:
    "Technologic brings AI to places it's never gone before — elevating tools with intelligence, precision, and elegance.",
  keywords: ["AI", "Discord Bot", "Zyra", "Technologic", "Artificial Intelligence", "Automation"],
  authors: [{ name: "Technologic Team" }],
  creator: "Technologic",
  publisher: "Technologic",
  robots: "index, follow",
  openGraph: {
    title: "Technologic - Smarter Everything",
    description:
      "Technologic brings AI to places it's never gone before — elevating tools with intelligence, precision, and elegance.",
    url: "https://your-domain.vercel.app",
    siteName: "Technologic",
    type: "website",
    images: [
      {
        url: "/placeholder.svg?height=630&width=1200",
        width: 1200,
        height: 630,
        alt: "Technologic - AI-powered tools and Discord bot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technologic - Smarter Everything",
    description:
      "Technologic brings AI to places it's never gone before — elevating tools with intelligence, precision, and elegance.",
    images: ["/placeholder.svg?height=630&width=1200"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#7b2ff7",
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>{children}</body>
    </html>
  )
}
