import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Terminal as TerminalIcon } from "lucide-react";

export function TerminalNavbar({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  const navItems = [
    { label: "cd ~", href: `/${handle}`, desc: "overview", show: true },
    { label: "cd ~/articles", href: `/${handle}/articles`, desc: "writings", show: (portfolio.articles?.length || 0) > 0 },
    { label: "cd ~/experience", href: `/${handle}/experience`, desc: "career", show: (portfolio.experiences?.length || 0) > 0 },
    { label: "cd ~/education", href: `/${handle}/education`, desc: "school", show: (portfolio.education?.length || 0) > 0 },
    { label: "cd ~/projects", href: `/${handle}/projects`, desc: "builds", show: (portfolio.projects?.length || 0) > 0 },
    { label: "cd ~/achievements", href: `/${handle}/achievements`, desc: "awards", show: (portfolio.achievements?.length || 0) > 0 },
    { label: "cd ~/services", href: `/${handle}/services`, desc: "advisory", show: (portfolio.services?.length || 0) > 0 },
    { label: "cd ~/events", href: `/${handle}/events`, desc: "talks", show: (portfolio.events?.length || 0) > 0 },
  ].filter((item) => item.show);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-xl font-mono text-xs">
      {/* Top Window Chrome */}
      <div className="h-9 px-4 sm:px-6 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] inline-block border border-[#e0443e]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] inline-block border border-[#dea123]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f] inline-block border border-[#1aab29]" />
          </div>
          <span className="ml-2 text-zinc-400 font-mono text-[11px] sm:text-xs">
            {`${handle}@archlinux: ~/portfolio (zsh)`}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-[10px] text-zinc-500 hidden sm:inline">UTF-8 // 80x24</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Monospace Navigation Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between overflow-x-auto gap-4">
        <Link href={`/${handle}`} className="flex items-center gap-2 text-zinc-200 hover:text-white shrink-0 group">
          <TerminalIcon className="h-4 w-4" style={{ color: "var(--theme-accent)" }} />
          <span className="font-bold tracking-tight text-zinc-100 group-hover:underline">
            {portfolio.name}
          </span>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto py-1 no-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-2.5 py-1 rounded text-[11px] text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors whitespace-nowrap"
            >
              <span style={{ color: "var(--theme-accent)" }}>$ </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="shrink-0 flex items-center gap-2">
          <ThemeToggle className="h-7 w-7 rounded border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white" iconClassName="h-3.5 w-3.5" />
          <Link
            href={`/${handle}/contact`}
            className="hidden md:inline-block px-3 py-1 text-[11px] font-bold rounded border transition-all"
            style={{
              borderColor: "var(--theme-accent)",
              color: "var(--theme-accent)",
              backgroundColor: "var(--badge-backdrop)",
            }}
          >
            ./contact.sh
          </Link>
        </div>
      </div>
    </header>
  );
}

export function TerminalFooter({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <footer className="w-full border-t border-zinc-900 bg-zinc-950 font-mono text-xs text-zinc-500 py-6 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="text-emerald-400 font-bold">[EXIT 0]</span>
          <span>Process returned 0 (0x00) // Session active</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-500">
          <span>{`ssh ${handle}@portfolio.dev`}</span>
          <span>•</span>
          <Link href="/" className="hover:text-zinc-300 transition-colors">
            PortfoliooSite v2.4
          </Link>
        </div>
      </div>
    </footer>
  );
}
