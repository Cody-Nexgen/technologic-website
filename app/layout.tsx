import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Technologic - Smarter Everything",
  description:
    "Technologic brings AI to places it's never gone before — elevating tools with intelligence, precision, and elegance.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Technologic - Smarter Everything</title>
        <meta
          name="description"
          content="Technologic brings AI to places it's never gone before — elevating tools with intelligence, precision, and elegance."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#7b2ff7" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-black text-white`}>{children}</body>
    </html>
  )
}
