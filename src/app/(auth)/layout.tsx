import { ThemeToggle } from "@/components/theme-toggle";
import { BrandMark } from "@/components/brand-mark";
import Link from "next/link";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col justify-between selection:bg-sky-500 selection:text-black">
      {/* Top Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <BrandMark className="h-8 w-8 shadow-md shadow-sky-500/20 rounded-lg" />
            <span className="font-semibold tracking-tight text-base">
              Portfolioo<span className="text-sky-400">Site</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-1.5"
            >
              <span>← Back to Home</span>
            </Link>
            <ThemeToggle className="h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white" />
          </div>
        </div>
      </header>

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-[440px]">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900/80 py-6 px-6 text-center text-xs text-zinc-500">
        PortfoliooSite • Secure Account Access
      </footer>
    </div>
  );
}
