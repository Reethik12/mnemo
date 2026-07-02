import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

// ─── Fonts ───────────────────────────────────────────

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ─── Metadata ────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "Mnemo — The Living Memory Operating System",
    template: "%s | Mnemo",
  },
  description:
    "The world's first Living Memory Operating System. Create a persistent memory fabric that grows with you across applications, devices, AI agents and time.",
  keywords: [
    "memory",
    "AI",
    "knowledge graph",
    "operating system",
    "Cognee",
    "memory fabric",
  ],
  authors: [{ name: "Mnemo" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Mnemo",
    title: "Mnemo — The Living Memory Operating System",
    description:
      "Create a persistent memory fabric that grows with you across applications, devices, AI agents and time.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mnemo — The Living Memory Operating System",
    description:
      "Create a persistent memory fabric that grows with you across applications, devices, AI agents and time.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#07090D",
  width: "device-width",
  initialScale: 1,
};

// ─── Layout ──────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg-primary text-text-primary antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
