import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Tech Bazaar — Smart Tech. Great Value.",
    template: "%s | Tech Bazaar",
  },
  description:
    "Kenya's trusted source for quality-checked laptops, desktops, and tech accessories at unbeatable prices. Fast delivery across Kenya.",
  keywords: [
    "laptops Kenya",
    "buy laptops Nairobi",
    "tech accessories",
    "cheap laptops",
    "HP EliteBook",
    "Lenovo ThinkPad",
    "Dell Latitude",
    "Tech Bazaar",
    "refurbished laptops Kenya",
    "desktop computers Nairobi",
  ],
  authors: [{ name: "Tech Bazaar" }],
  openGraph: {
    title: "Tech Bazaar — Smart Tech. Great Value.",
    description:
      "Quality-checked laptops and tech accessories at unbeatable prices. Fast delivery across Kenya.",
    url: "https://www.techbazaar.co.ke",
    siteName: "Tech Bazaar",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Bazaar — Smart Tech. Great Value.",
    description:
      "Quality-checked laptops and tech accessories at unbeatable prices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
