import Providers from "@/components/layout/providers";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "Delta Habits",
  description: "Minimalist habits app",

  applicationName: "Delta Habits",
  manifest: "/manifest.json",

  

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  appleWebApp: {
    capable: true,
    title: "Delta Speed Reader",
    statusBarStyle: "default",
  },

  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <NextTopLoader />
      <Providers>
      <body>{children}</body>

      </Providers>
    </html>
  );
}
