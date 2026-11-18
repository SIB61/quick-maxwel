import Link from "next/link";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-base transition-transform group-hover:scale-105">
              P
            </div>
            <span className="font-semibold tracking-tight text-base">
              Portfolio<span className="text-emerald-400">Builder</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-1.5"
          >
            <span>← Back to Home</span>
          </Link>
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
        Portfolio Builder • Secure Account Access
      </footer>
    </div>
  );
}
