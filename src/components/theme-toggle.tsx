"use client";

import { Moon, Sun } from "lucide-react";
import { getCurrentMode, switchThemeMode } from "@/lib/theme-mode";

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

/**
 * Light/dark switch. The sun/moon morph is driven purely by the <html> class
 * (see globals.css), so it renders identically on the server and client.
 */
export function ThemeToggle({
  className = "h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-zinc-50 hover:border-zinc-700",
  iconClassName = "h-4 w-4",
}: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const next = getCurrentMode() === "dark" ? "light" : "dark";
        switchThemeMode(next, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      aria-label="Toggle light or dark mode"
      title="Toggle light / dark mode"
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden transition-colors cursor-pointer ${className}`}
    >
      <Sun className={`theme-toggle-icon theme-toggle-sun absolute ${iconClassName}`} aria-hidden="true" />
      <Moon className={`theme-toggle-icon theme-toggle-moon absolute ${iconClassName}`} aria-hidden="true" />
    </button>
  );
}
