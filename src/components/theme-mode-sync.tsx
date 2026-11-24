"use client";

import { useEffect } from "react";
import { THEME_COOKIE, parseThemeMode, setDocumentMode } from "@/lib/theme-mode";

/** Keeps every open tab and frame (incl. the Theme Studio preview) in the same mode. */
export function ThemeModeSync() {
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_COOKIE && e.newValue) setDocumentMode(parseThemeMode(e.newValue));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
  return null;
}
