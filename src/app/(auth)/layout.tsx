import Link from "next/link";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Top Header */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
              P
            </div>
            <span className="font-semibold tracking-tight text-lg">
              Portfolio<span className="text-emerald-400">Builder</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-4 px-6 text-center text-xs text-zinc-500">
        Portfolio Builder • Secure Account Access
      </footer>
    </div>
  );
}
