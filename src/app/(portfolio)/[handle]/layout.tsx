import { getPortfolioData } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import React from "react";

export default async function PortfolioLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  const navLinks = [
    { label: "Overview", href: `/${handle}` },
    { label: "Articles", href: `/${handle}/articles` },
    { label: "Experience", href: `/${handle}/experience` },
    { label: "Achievements", href: `/${handle}/achievements` },
    { label: "Services", href: `/${handle}/services` },
    { label: "Events", href: `/${handle}/events` },
    { label: "Contact", href: `/${handle}/contact` },
  ];

  // Palette color definitions
  const palette = portfolio.settings?.colorPalette || "slate";

  return (
    <div className={`min-h-screen bg-zinc-950 text-zinc-100 theme-${palette} flex flex-col justify-between selection:bg-emerald-500 selection:text-black`}>
      {/* Portfolio Navbar */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href={`/${handle}`} className="flex items-center gap-3">
            {portfolio.avatarUrl ? (
              <img
                src={portfolio.avatarUrl}
                alt={portfolio.name}
                className="h-8 w-8 rounded-full object-cover border border-zinc-700"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300">
                {portfolio.name.charAt(0)}
              </div>
            )}
            <span className="font-semibold text-zinc-100 hover:text-emerald-400 transition-colors">
              {portfolio.name}
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm text-zinc-400">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-md hover:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={`/${handle}/contact`}
              className="text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-1.5 rounded-full transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </header>

      {/* Main Portfolio Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12">
        {children}
      </main>

      {/* Portfolio Footer */}
      <footer className="border-t border-zinc-900 py-8 px-6 text-center text-xs text-zinc-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {portfolio.name}. Built with PortfolioBuilder.</p>
          <div className="flex items-center gap-4 text-zinc-400">
            <Link href="/" className="hover:text-zinc-200 transition-colors flex items-center gap-1">
              <span>Create your own</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
