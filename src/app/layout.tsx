import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConversionProvider } from "@/lib/conversionContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Slidedown — Lecture slides, ready for any AI",
  description: "Convert your PDF and PowerPoint lecture slides into clean text. Paste into ChatGPT, Claude, or any AI and actually get useful answers.",
};

import { Navbar } from "@/components/layout/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ConversionProvider>
          <Navbar />
          {children}
        </ConversionProvider>
      </body>
    </html>
  );
}
