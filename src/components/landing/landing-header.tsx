"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { BrandMark } from "@/components/brand-mark";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X, ArrowRight, LogIn, UserPlus } from "lucide-react";

interface LandingHeaderProps {
  sessionUser?: {
    handle: string;
    name: string;
  } | null;
}

export function LandingHeader({ sessionUser }: LandingHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Showcase", href: "#showcase" },
    { label: "Features", href: "#features" },
    { label: "Templates", href: "#templates" },
    { label: "Why Multi-Page", href: "#why-multipage" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <BrandMark className="h-9 w-9 shadow-md shadow-sky-500/20 rounded-xl" />
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-base text-zinc-100 flex items-center">
              Portfolioo<span className="text-sky-400">Site</span>
            </span>
            <span className="text-[10px] text-zinc-400 -mt-1 hidden sm:inline">
              Multi-Page Personal Brand Engine
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-zinc-100 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle className="h-10 w-10 rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white hover:border-zinc-700" />
          {sessionUser ? (
            <Button
              asChild
              className="h-10 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-semibold text-xs transition-all shadow-md shadow-sky-500/10"
            >
              <Link href="/dashboard">
                <span>Dashboard (@{sessionUser.handle})</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </Link>
            </Button>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                className="h-10 px-4 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-850"
              >
                <Link href="/login">
                  <LogIn className="h-3.5 w-3.5 mr-1.5" />
                  Sign In
                </Link>
              </Button>
              <Button
                asChild
                className="h-10 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs transition-all shadow-md shadow-sky-500/20"
              >
                <Link href="/register">
                  <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                  Get Started
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle className="h-9 w-9 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white" />
          {sessionUser ? (
            <Button
              asChild
              size="sm"
              className="h-9 px-3 rounded-lg bg-sky-500 text-black font-semibold text-xs"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : null}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-2xl px-4 py-5 space-y-4">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
            {sessionUser ? (
              <Button
                asChild
                className="w-full h-11 rounded-xl bg-sky-500 text-black font-bold text-sm"
              >
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Go to Dashboard (@{sessionUser.handle})
                </Link>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-11 rounded-xl border-zinc-700 bg-zinc-900 text-zinc-200 text-sm font-semibold"
                >
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full h-11 rounded-xl bg-sky-500 text-black font-bold text-sm shadow-md"
                >
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                    Create Free Portfolio
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
