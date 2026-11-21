"use client";

import { useEffect } from "react";

export const STUDIO_MESSAGE_SOURCE = "portfolioosite-studio-preview";

/**
 * Rendered only inside the Theme Studio's preview iframe.
 * - Same-origin link clicks become full page loads, so the iframe-only preview
 *   cookie keeps applying the unsaved theme (client-side navigations wouldn't).
 * - Reports the current page to the Studio so its page picker stays in sync.
 */
export function StudioPreviewBridge() {
  useEffect(() => {
    if (window.self === window.top) return;

    window.parent.postMessage(
      { source: STUDIO_MESSAGE_SOURCE, type: "location", path: window.location.pathname },
      window.location.origin
    );

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;

      event.preventDefault();
      event.stopPropagation();
      window.location.assign(url.href);
    };

    // Capture phase so this runs before Next.js <Link> handles the click.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
