import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-title",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Valura Atlas — Navigate Global Markets",
    template: "%s · Valura Atlas",
  },
  description:
    "Structured learning for Indian investors who want to grow beyond borders.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolageGrotesque.variable} ${manrope.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
          <Providers>{children}</Providers>
        </body>
    </html>
  );
}
