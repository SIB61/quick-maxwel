"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Search, Trash2, Wand2 } from "lucide-react";
import { SocialIcon } from "@/components/social-icon";
import {
  MAX_SOCIAL_LINKS,
  SOCIAL_CATEGORIES,
  SOCIAL_PLATFORMS,
  SOCIAL_PLATFORM_MAP,
  detectSocialPlatform,
  normalizeSocialLinks,
  type StoredSocialLinks,
} from "@/lib/social-platforms";

interface Row {
  key: number;
  platform: string;
  url: string;
}

// Stable React keys for rows; never reused within a page session.
let rowKeySeq = 0;
const nextRowKey = () => rowKeySeq++;

const inputClass =
  "h-10 w-full rounded-xl bg-zinc-950/80 border border-zinc-800 px-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-sky-500/40";

export function SocialLinksEditor({ initial }: { initial: StoredSocialLinks }) {
  const [rows, setRows] = useState<Row[]>(() =>
    normalizeSocialLinks(initial).map((link) => ({
      key: nextRowKey(),
      platform: link.platform,
      url: link.url.replace(/^mailto:/i, ""),
    }))
  );
  const [quickUrl, setQuickUrl] = useState("");
  const [quickHint, setQuickHint] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(rows.length === 0);
  const [query, setQuery] = useState("");
  const urlRefs = useRef(new Map<number, HTMLInputElement>());

  const used = useMemo(() => new Set(rows.map((r) => r.platform)), [rows]);
  const atLimit = rows.length >= MAX_SOCIAL_LINKS;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SOCIAL_PLATFORMS.filter((p) => !q || p.label.toLowerCase().includes(q) || p.id.includes(q));
  }, [query]);

  const addRow = (platform: string, url = "") => {
    if (atLimit) return;
    const key = nextRowKey();
    setRows((prev) => [...prev, { key, platform, url }]);
    // Focus the new row's URL box once it renders.
    requestAnimationFrame(() => urlRefs.current.get(key)?.focus());
  };

  const updateRow = (key: number, patch: Partial<Row>) =>
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, ...patch } : r)));

  const removeRow = (key: number) => setRows((prev) => prev.filter((r) => r.key !== key));

  const moveRow = (index: number, delta: number) =>
    setRows((prev) => {
      const next = [...prev];
      const target = index + delta;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const handleQuickAdd = () => {
    const value = quickUrl.trim();
    if (!value) return;
    let platform = detectSocialPlatform(value);
    if (!platform) platform = used.has("website") ? "other" : "website";

    if (used.has(platform)) {
      setQuickHint(`${SOCIAL_PLATFORM_MAP[platform].label} is already in your list. Edit it below instead.`);
      return;
    }
    const url = platform === "email" ? value.replace(/^mailto:/i, "") : /^https?:\/\//i.test(value) ? value : `https://${value}`;
    addRow(platform, url);
    setQuickUrl("");
    setQuickHint(`Added as ${SOCIAL_PLATFORM_MAP[platform].label}. You can change the platform from its dropdown.`);
  };

  return (
    <div className="space-y-5">
      {/* Quick add by pasting a URL */}
      <div className="space-y-1.5">
        <div className="flex gap-2">
          <div className="relative flex-1 min-w-0">
            <Wand2 className="h-4 w-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={quickUrl}
              onChange={(e) => {
                setQuickUrl(e.target.value);
                setQuickHint(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleQuickAdd();
                }
              }}
              placeholder="Paste any profile link, e.g. https://dribbble.com/you"
              aria-label="Paste a profile link to add it"
              className={`${inputClass} h-11 pl-9`}
            />
          </div>
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!quickUrl.trim() || atLimit}
            className="h-11 shrink-0 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 disabled:hover:bg-sky-500 text-black text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
        <p className="text-[11px] text-zinc-500">
          {quickHint ?? "The platform is detected automatically from the link."}
        </p>
      </div>

      {/* Current links */}
      {rows.length > 0 ? (
        <ul className="space-y-2">
          {rows.map((row, index) => {
            const platform = SOCIAL_PLATFORM_MAP[row.platform];
            const isEmail = platform?.scheme === "mailto";
            return (
              <li key={row.key} className="flex flex-col sm:flex-row sm:items-center gap-2 p-2 rounded-xl bg-zinc-950/40 border border-zinc-800/80">
                <input type="hidden" name="socialPlatform" value={row.platform} />
                <div className="flex items-center gap-2 sm:w-52 shrink-0">
                  <span className="h-10 w-10 shrink-0 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
                    <SocialIcon platform={row.platform} className="h-4 w-4" />
                  </span>
                  <select
                    value={row.platform}
                    onChange={(e) => updateRow(row.key, { platform: e.target.value })}
                    aria-label="Platform"
                    className="h-10 flex-1 min-w-0 rounded-xl bg-zinc-950/80 border border-zinc-800 px-2.5 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
                  >
                    {SOCIAL_CATEGORIES.map((category) => (
                      <optgroup key={category} label={category}>
                        {SOCIAL_PLATFORMS.filter((p) => p.category === category).map((p) => (
                          <option key={p.id} value={p.id} disabled={p.id !== row.platform && used.has(p.id)}>
                            {p.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <input
                    ref={(el) => {
                      if (el) urlRefs.current.set(row.key, el);
                      else urlRefs.current.delete(row.key);
                    }}
                    name="socialUrl"
                    type={isEmail ? "email" : "url"}
                    value={row.url}
                    onChange={(e) => updateRow(row.key, { url: e.target.value })}
                    placeholder={platform?.placeholder}
                    aria-label={`${platform?.label ?? "Link"} URL`}
                    className={`${inputClass} flex-1 min-w-0`}
                  />
                  <button
                    type="button"
                    onClick={() => moveRow(index, -1)}
                    disabled={index === 0}
                    className="h-10 w-8 shrink-0 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 disabled:opacity-25 disabled:hover:bg-transparent flex items-center justify-center cursor-pointer"
                    aria-label="Move up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveRow(index, 1)}
                    disabled={index === rows.length - 1}
                    className="h-10 w-8 shrink-0 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 disabled:opacity-25 disabled:hover:bg-transparent flex items-center justify-center cursor-pointer"
                    aria-label="Move down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeRow(row.key)}
                    className="h-10 w-8 shrink-0 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center cursor-pointer"
                    aria-label={`Remove ${platform?.label ?? "link"}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-xs text-zinc-500 italic">No links yet. Paste one above or pick a platform below.</p>
      )}

      {/* Platform picker */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-950/30">
        <button
          type="button"
          onClick={() => setPickerOpen((o) => !o)}
          className="w-full flex items-center justify-between px-4 py-3 text-xs font-semibold text-zinc-300 hover:text-white cursor-pointer"
          aria-expanded={pickerOpen}
        >
          <span>Browse {SOCIAL_PLATFORMS.length} platforms</span>
          <span className="text-zinc-500">{pickerOpen ? "Hide" : "Show"}</span>
        </button>

        {pickerOpen && (
          <div className="px-4 pb-4 space-y-4 border-t border-zinc-800/80 pt-4">
            <div className="relative">
              <Search className="h-4 w-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
                placeholder="Search platforms (e.g. Behance, Medium, ORCID)"
                aria-label="Search platforms"
                className={`${inputClass} pl-9`}
              />
            </div>

            {SOCIAL_CATEGORIES.map((category) => {
              const items = filtered.filter((p) => p.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category} className="space-y-2">
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">{category}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((p) => {
                      const isUsed = used.has(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          disabled={isUsed || atLimit}
                          onClick={() => addRow(p.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer disabled:cursor-not-allowed ${
                            isUsed
                              ? "border-sky-500/30 bg-sky-500/10 text-sky-400"
                              : "border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600 hover:text-white disabled:opacity-40"
                          }`}
                        >
                          <SocialIcon platform={p.id} className="h-3.5 w-3.5" />
                          <span>{p.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && <p className="text-xs text-zinc-500">No platform matches &ldquo;{query}&rdquo;. Use &ldquo;Other Link&rdquo; instead.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
