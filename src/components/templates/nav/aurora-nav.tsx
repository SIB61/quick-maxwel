import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles, ArrowRight } from "lucide-react";

export function AuroraNavbar({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  const navLinks = [
    { label: "Overview", href: `/${handle}`, show: true },
    { label: "Writings", href: `/${handle}/articles`, show: (portfolio.articles?.length || 0) > 0 },
    { label: "Journey", href: `/${handle}/experience`, show: (portfolio.experiences?.length || 0) > 0 },
    { label: "Works", href: `/${handle}/projects`, show: (portfolio.projects?.length || 0) > 0 },
    { label: "Accolades", href: `/${handle}/achievements`, show: (portfolio.achievements?.length || 0) > 0 },
    { label: "Studio Services", href: `/${handle}/services`, show: (portfolio.services?.length || 0) > 0 },
    { label: "Appearances", href: `/${handle}/events`, show: (portfolio.events?.length || 0) > 0 },
  ].filter((item) => item.show);

  return (
    <header className="sticky top-4 z-40 w-full px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-5xl mx-auto flex flex-col pointer-events-auto">
        {/* Floating Frosted Capsule */}
        <div className="w-full flex items-center justify-between rounded-full bg-zinc-900/60 backdrop-blur-2xl border border-white/10 px-4 sm:px-6 py-2.5 shadow-2xl relative overflow-hidden group">
          {/* Subtle Aurora Ambient Shine inside capsule */}
          <div
            className="absolute -top-10 left-1/4 w-40 h-20 rounded-full blur-2xl opacity-40 pointer-events-none"
            style={{ backgroundColor: "var(--theme-accent)" }}
          />

          <Link href={`/${handle}`} className="flex items-center gap-3 shrink-0">
            {portfolio.avatarUrl ? (
              <img
                src={portfolio.avatarUrl}
                alt={portfolio.name}
                className="h-8 w-8 rounded-full object-cover border border-white/20"
              />
            ) : (
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-black"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                {portfolio.name.charAt(0)}
              </div>
            )}
            <span className="font-semibold text-sm text-zinc-100 hidden sm:inline tracking-tight">
              {portfolio.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-xs">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-all font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="shrink-0 flex items-center gap-2">
            <ThemeToggle className="h-9 w-9 rounded-full border border-white/10 bg-zinc-900/40 text-zinc-300 hover:text-white hover:border-white/25 backdrop-blur-md" iconClassName="h-4 w-4" />
            <Link
              href={`/${handle}/contact`}
              className="px-4 py-2 rounded-full text-xs font-bold text-black shadow-lg transition-all hover:scale-105 flex items-center gap-1.5"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <Sparkles className="h-3 w-3" />
              <span>Contact</span>
            </Link>
          </div>
        </div>

        {/* Mobile Horizontal Capsule Nav Strip */}
        <div className="md:hidden mt-2 flex items-center gap-1.5 overflow-x-auto py-1 px-2 no-scrollbar rounded-full bg-zinc-900/60 backdrop-blur-xl border border-white/10">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-1 rounded-full text-[11px] text-zinc-300 hover:text-white whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export function AuroraFooter({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <footer className="w-full mt-16 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Aurora Ambient Flare at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 blur-3xl opacity-20 pointer-events-none rounded-full"
        style={{ backgroundColor: "var(--theme-accent)" }}
      />

      <div className="max-w-5xl mx-auto rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/10 p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-semibold text-zinc-200">{`${portfolio.name} Studio`}</p>
          <p className="text-[11px] text-zinc-500">
            Spatial experience powered by PortfoliooSite Aurora.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <Link href={`/${handle}`} className="hover:text-white transition-colors">
            Overview
          </Link>
          <span>•</span>
          <Link href={`/${handle}/contact`} className="hover:text-white transition-colors">
            Get in touch
          </Link>
          <span>•</span>
          <Link href="/" className="hover:text-white transition-colors">
            Create Yours
          </Link>
        </div>
      </div>
    </footer>
  );
}
