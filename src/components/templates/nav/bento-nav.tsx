import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { LayoutGrid, Send } from "lucide-react";

export function BentoNavbar({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  const navLinks = [
    { label: "Overview", href: `/${handle}`, show: true },
    { label: "Articles", href: `/${handle}/articles`, show: (portfolio.articles?.length || 0) > 0 },
    { label: "Career", href: `/${handle}/experience`, show: (portfolio.experiences?.length || 0) > 0 },
    { label: "Projects", href: `/${handle}/projects`, show: (portfolio.projects?.length || 0) > 0 },
    { label: "Awards", href: `/${handle}/achievements`, show: (portfolio.achievements?.length || 0) > 0 },
    { label: "Services", href: `/${handle}/services`, show: (portfolio.services?.length || 0) > 0 },
    { label: "Events", href: `/${handle}/events`, show: (portfolio.events?.length || 0) > 0 },
  ].filter((item) => item.show);

  return (
    <header className="sticky top-3 z-40 w-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-2">
        <div className="flex items-center justify-between rounded-2xl bg-zinc-900/90 border border-zinc-800 p-2 shadow-xl backdrop-blur-md">
          <Link href={`/${handle}`} className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-zinc-800 transition-colors">
            <div
              className="h-7 w-7 rounded-lg flex items-center justify-center text-black"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <LayoutGrid className="h-4 w-4" />
            </div>
            <span className="font-bold text-sm text-zinc-100">{portfolio.name}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-xs">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-all font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle className="h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-700" iconClassName="h-4 w-4" />
            <Link
              href={`/${handle}/contact`}
              className="px-4 py-2 rounded-xl text-xs font-bold text-black transition-all hover:opacity-90 flex items-center gap-1.5 shadow-sm"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <Send className="h-3 w-3" />
              <span>Contact</span>
            </Link>
          </div>
        </div>

        {/* Mobile Horizontal Bento Nav Strip */}
        <div className="md:hidden flex items-center gap-1.5 overflow-x-auto py-1 px-2 no-scrollbar rounded-xl bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-1 rounded-lg text-[11px] text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export function BentoFooter({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <footer className="w-full mt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Tile 1: Profile info */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <div className="font-bold text-zinc-200 text-sm">{portfolio.name}</div>
          <p className="text-xs text-zinc-500">Bento Grid Architecture</p>
        </div>

        {/* Tile 2: System Status */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs">
          <span className="text-zinc-400">System Status</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Operational
          </span>
        </div>

        {/* Tile 3: Quick Links */}
        <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <Link href={`/${handle}`} className="hover:text-white transition-colors">
            Top
          </Link>
          <span>•</span>
          <Link href={`/${handle}/contact`} className="hover:text-white transition-colors">
            Inbox
          </Link>
          <span>•</span>
          <Link href="/" className="hover:text-white transition-colors">
            Builder
          </Link>
        </div>
      </div>
    </footer>
  );
}
