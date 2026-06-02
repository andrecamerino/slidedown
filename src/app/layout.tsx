import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ConversionProvider } from "@/lib/conversionContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slidedown — Lecture slides, ready for any AI",
  description: "Convert your PDF and PowerPoint lecture slides into clean text. Paste into ChatGPT, Claude, or any AI and actually get useful answers.",
  icons: {
    icon: [
      { url: '/slidedown-favicon.svg', type: 'image/svg+xml' },
      { url: '/slidedown-favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/slidedown-favicon-32.png',
    apple: '/slidedown-favicon-32.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ConversionProvider>
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </ConversionProvider>
      </body>
    </html>
  );
}
