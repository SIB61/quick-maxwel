import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SimpleNavbar({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  const navLinks = [
    { label: "Overview", href: `/${handle}` },
    { label: "Articles", href: `/${handle}/articles` },
    { label: "Experience", href: `/${handle}/experience` },
    { label: "Achievements", href: `/${handle}/achievements` },
    { label: "Services", href: `/${handle}/services` },
    { label: "Events", href: `/${handle}/events` },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href={`/${handle}`} className="flex items-center gap-3 group">
          <span className="font-semibold text-zinc-100 group-hover:text-white transition-colors">
            {portfolio.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm text-zinc-400">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-lg hover:text-zinc-100 hover:bg-zinc-850 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={`/${handle}/contact`}
          className="text-xs font-bold text-black px-4 py-2 rounded-lg transition-all hover:opacity-90 shadow-sm"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          Contact
        </Link>
      </div>
    </header>
  );
}

export function SimpleFooter({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <footer className="w-full mt-16 border-t border-zinc-800 py-8 px-6 text-center text-xs text-zinc-500">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>{`© ${new Date().getFullYear()} ${portfolio.name}. All rights reserved.`}</p>
        <div className="flex items-center gap-4 text-zinc-400">
          <Link href={`/${handle}`} className="hover:text-zinc-200 transition-colors">
            Overview
          </Link>
          <span>•</span>
          <Link href={`/${handle}/contact`} className="hover:text-zinc-200 transition-colors">
            Contact
          </Link>
          <span>•</span>
          <Link href="/" className="hover:text-zinc-200 transition-colors">
            PortfolioBuilder
          </Link>
        </div>
      </div>
    </footer>
  );
}
