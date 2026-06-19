import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SmartSuppWidget from "@/components/SmartSuppWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Candace AI — Intelligence, trained in your home",
  description:
    "A private technology. Seven days. One system. Yours to keep. Request access to the 2026 cohort.",
  openGraph: {
    title: "Candace AI",
    description: "Intelligence, trained in your home.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full bg-background text-foreground antialiased">
        {children}
        <SmartSuppWidget />
      </body>
    </html>
  );
}
