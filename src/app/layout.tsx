import type { Metadata } from "next";
import { Inter, Playfair_Display, Marcellus } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const marcellus = Marcellus({ weight: "400", subsets: ["latin"], variable: "--font-marcellus" });

export const metadata: Metadata = {
  title: "Thông Điệp Vũ Trụ",
  description: "Bóc bài ngẫu nhiên nhận thông điệp từ vũ trụ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${playfair.variable} ${marcellus.variable} font-sans antialiased bg-mystic-void text-white min-h-dvh flex flex-col`}>
        <LanguageProvider>
          {children}
          <SpeedInsights />
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}

// @AGENT_MODIFIED: 2026-04-28T20:10:00Z | Agent 202 | Reason: Optimized mobile layout using min-h-dvh | Tag: #performance
