import type { Metadata } from "next";
import { Inter, Playfair_Display, Marcellus } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";

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
      <body className={`${inter.variable} ${playfair.variable} ${marcellus.variable} font-sans antialiased bg-mystic-void text-white min-h-screen flex flex-col`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

// @AGENT_MODIFIED: 2026-04-20T13:00:00Z | Antigravity | Reason: Updated fonts and layout for Dark Mode | Tag: #ui
