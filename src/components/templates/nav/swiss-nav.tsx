import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SwissNavbar({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  const navLinks = [
    { num: "01", label: "OVERVIEW", href: `/${handle}` },
    { num: "02", label: "ESSAYS", href: `/${handle}/articles` },
    { num: "03", label: "CHRONICLE", href: `/${handle}/experience` },
    { num: "04", label: "HONORS", href: `/${handle}/achievements` },
    { num: "05", label: "DISCIPLINES", href: `/${handle}/services` },
    { num: "06", label: "ENGAGEMENTS", href: `/${handle}/events` },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-md">
      {/* Top Swiss Archival Metadata Header */}
      <div className="border-b border-zinc-800/80 px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
        <div className="flex items-center gap-3">
          <span className="font-bold text-zinc-300">ARCHIVAL FOLIO</span>
          <span>//</span>
          <span>VOL. 26</span>
          <span className="hidden sm:inline">//</span>
          <span className="hidden sm:inline">SWISS TYPOGRAPHIC ORDER</span>
        </div>
        <div className="flex items-center gap-2">
          <span>LAT 47.3769° N</span>
          <span>LON 8.5417° E</span>
        </div>
      </div>

      {/* Main Swiss Nav Grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href={`/${handle}`} className="flex items-baseline gap-2 group shrink-0">
          <span className="font-mono text-xs font-bold" style={{ color: "var(--theme-accent)" }}>
            №
          </span>
          <span className="text-base sm:text-lg font-bold tracking-tight text-white uppercase group-hover:opacity-80 transition-opacity">
            {portfolio.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 group"
            >
              <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors text-[10px]">
                {item.num}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="shrink-0">
          <Link
            href={`/${handle}/contact`}
            className="px-3 sm:px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase border border-white text-white hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
          >
            <span>DISPATCH</span>
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Mobile Sub-Navigation Strip */}
      <div className="md:hidden border-t border-zinc-800/80 px-4 py-2 flex items-center gap-4 overflow-x-auto text-[11px] font-mono no-scrollbar bg-zinc-950/90">
        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-zinc-400 hover:text-white whitespace-nowrap flex items-center gap-1 shrink-0"
          >
            <span className="text-zinc-600 text-[10px]">{item.num}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </header>
  );
}

export function SwissFooter({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 text-zinc-400 py-10 px-4 sm:px-6 lg:px-8 font-mono text-xs">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span>ARCHIVAL FOLIO</span>
            <span>//</span>
            <span>{portfolio.name}</span>
          </div>
          <p className="text-[11px] text-zinc-500">
            SWISS COORDINATES: 47.3769° N, 8.5417° E // SYSTEM EDITION 2026.04 // DESIGNED IN BASEL &amp; ZÜRICH.
          </p>
        </div>

        <div className="flex items-center gap-6 text-[11px] tracking-wider uppercase">
          <Link href={`/${handle}`} className="hover:text-white transition-colors">
            TOP
          </Link>
          <span>/</span>
          <Link href={`/${handle}/contact`} className="hover:text-white transition-colors">
            CONTACT
          </Link>
          <span>/</span>
          <Link href="/" className="hover:text-white transition-colors">
            PORTFOLIO BUILDER
          </Link>
        </div>
      </div>
    </footer>
  );
}
