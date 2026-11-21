/** Light/dark mode shared by the whole app (landing, dashboard and portfolios). */

export type ThemeMode = "light" | "dark";

/**
 * Stored in a cookie so the server renders the right mode class on <html>
 * (no flash, no inline script). Mirrored to localStorage only to notify other
 * tabs and frames (e.g. the Theme Studio preview) via the `storage` event.
 */
export const THEME_COOKIE = "pos-theme-mode";

export function parseThemeMode(value: string | undefined | null): ThemeMode {
  return value === "light" ? "light" : "dark";
}

export function getCurrentMode(): ThemeMode {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

/** Updates <html> without persisting (used when syncing from another tab/frame). */
export function setDocumentMode(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(mode);
  root.style.colorScheme = mode;
}

function applyMode(mode: ThemeMode) {
  setDocumentMode(mode);
  document.cookie = `${THEME_COOKIE}=${mode}; path=/; max-age=31536000; samesite=lax`;
  try {
    localStorage.setItem(THEME_COOKIE, mode);
  } catch {
    // Storage can be unavailable (private mode); the cookie still persists the choice.
  }
}

/**
 * Switches mode with a circular reveal that grows from (x, y), using the View
 * Transitions API when available, a color cross-fade otherwise, and an
 * instant switch for reduced-motion users.
 */
export function switchThemeMode(next: ThemeMode, origin?: { x: number; y: number }) {
  if (next === getCurrentMode()) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> };
  };

  if (reduceMotion) {
    applyMode(next);
    return;
  }

  if (!doc.startViewTransition) {
    const root = document.documentElement;
    root.classList.add("theme-fade");
    applyMode(next);
    window.setTimeout(() => root.classList.remove("theme-fade"), 500);
    return;
  }

  const x = origin?.x ?? window.innerWidth - 40;
  const y = origin?.y ?? 40;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = doc.startViewTransition(() => applyMode(next));
  transition.ready
    .then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    })
    .catch(() => {
      // Transition was skipped (e.g. tab hidden); the mode is already applied.
    });
}
