import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function FancyNavbar({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  const navLinks = [
    { label: "Overview", href: `/${handle}` },
    { label: "Articles", href: `/${handle}/articles` },
    { label: "Experience", href: `/${handle}/experience` },
    { label: "Achievements", href: `/${handle}/achievements` },
    { label: "Services", href: `/${handle}/services` },
    { label: "Events", href: `/${handle}/events` },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href={`/${handle}`} className="flex items-center gap-3 group">
          <div className="relative">
            {portfolio.avatarUrl ? (
              <img
                src={portfolio.avatarUrl}
                alt={portfolio.name}
                className="h-9 w-9 rounded-full object-cover border-2 border-white/20 group-hover:scale-105 transition-transform"
              />
            ) : (
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-black"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                {portfolio.name.charAt(0)}
              </div>
            )}
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-950 animate-ping" />
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-zinc-950" />
          </div>

          <span className="font-bold text-zinc-100 group-hover:text-white transition-colors">
            {portfolio.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-xs">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={`/${handle}/contact`}
          className="px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold text-black shadow-lg transition-all hover:opacity-90 flex items-center gap-1.5"
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          <Sparkles className="h-3 w-3" />
          <span>Get in Touch</span>
        </Link>
      </div>

      {/* Mobile Horizontal Fancy Nav Strip */}
      <div className="md:hidden border-t border-white/5 px-4 py-2 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar bg-zinc-950/60">
        {navLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-2.5 py-1 rounded-full text-[11px] text-zinc-300 hover:text-white whitespace-nowrap bg-white/5"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

export function FancyFooter({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <footer className="w-full mt-16 border-t border-white/10 bg-gradient-to-b from-transparent to-zinc-950/80 py-10 px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-500">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>{`© ${new Date().getFullYear()} ${portfolio.name}. Built with Fancy Creative engine.`}</p>
        <div className="flex items-center gap-4 text-zinc-400">
          <Link href={`/${handle}`} className="hover:text-white transition-colors">
            Overview
          </Link>
          <span>•</span>
          <Link href={`/${handle}/contact`} className="hover:text-white transition-colors">
            Connect
          </Link>
          <span>•</span>
          <Link href="/" className="hover:text-white transition-colors">
            PortfolioBuilder
          </Link>
        </div>
      </div>
    </footer>
  );
}
