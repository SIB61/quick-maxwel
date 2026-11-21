import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { THEME_COOKIE, parseThemeMode } from "@/lib/theme-mode";
import { ThemeModeSync } from "@/components/theme-mode-sync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PortfoliooSite — Multi-Page Portfolio Platform",
  description: "Build, customize, and publish multi-page personal portfolios with Next.js, Postgres, and Drizzle.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // The visitor's light/dark choice is a cookie, so the first paint is already correct.
  const mode = parseThemeMode((await cookies()).get(THEME_COOKIE)?.value);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${mode} h-full antialiased`}
      style={{ colorScheme: mode }}
      // The toggle updates this class on the client between server renders.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <ThemeModeSync />
        {children}
      </body>
    </html>
  );
}
