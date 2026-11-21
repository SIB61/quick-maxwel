"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { updateThemeAction } from "@/actions/theme";
import {
  TEMPLATES,
  PALETTES,
  FONTS,
  TEMPLATE_SIGNATURE_STYLES,
  TemplateId,
  ColorPalette,
  FontFamily,
} from "@/lib/templates";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Check,
  ChevronDown,
  ExternalLink,
  Globe,
  Layout,
  Loader2,
  Monitor,
  Palette,
  RefreshCw,
  RotateCcw,
  Save,
  Smartphone,
  Tablet,
  Type,
  Wand2,
} from "lucide-react";
import { PortfolioSettings } from "@/db/schema";
import { STUDIO_MESSAGE_SOURCE } from "@/components/templates/nav/studio-preview-bridge";

interface ThemeStudioFormProps {
  settings: PortfolioSettings | null;
  user: {
    handle: string;
    name: string;
    headline?: string | null;
    avatarUrl?: string | null;
    bio?: string | null;
  };
}

interface ThemeState {
  templateId: TemplateId;
  colorPalette: ColorPalette;
  fontFamily: FontFamily;
  seoTitle: string;
  seoDescription: string;
}

const DEVICES = {
  desktop: { label: "Desktop", width: 1280, icon: Monitor },
  tablet: { label: "Tablet", width: 820, icon: Tablet },
  mobile: { label: "Mobile", width: 390, icon: Smartphone },
} as const;
type Device = keyof typeof DEVICES;

const PAGES = [
  { label: "Home", path: "" },
  { label: "Articles", path: "/articles" },
  { label: "Projects", path: "/projects" },
  { label: "Experience", path: "/experience" },
  { label: "Achievements", path: "/achievements" },
  { label: "Services", path: "/services" },
  { label: "Events", path: "/events" },
  { label: "Contact", path: "/contact" },
];

const FONT_SAMPLE_CLASS: Record<FontFamily, string> = { sans: "font-sans", serif: "font-serif", mono: "font-mono" };

function sameTheme(a: ThemeState, b: ThemeState) {
  return (
    a.templateId === b.templateId &&
    a.colorPalette === b.colorPalette &&
    a.fontFamily === b.fontFamily &&
    a.seoTitle === b.seoTitle &&
    a.seoDescription === b.seoDescription
  );
}

export default function ThemeStudioForm({ settings, user }: ThemeStudioFormProps) {
  const [state, formAction, isPending] = useActionState(updateThemeAction, undefined);

  const initial: ThemeState = {
    templateId: (settings?.templateId as TemplateId) || "simple_professional",
    colorPalette: (settings?.colorPalette as ColorPalette) || "slate",
    fontFamily: (settings?.fontFamily as FontFamily) || "sans",
    seoTitle: settings?.seoTitle || "",
    seoDescription: settings?.seoDescription || "",
  };
  const [saved, setSaved] = useState<ThemeState>(initial);
  const [theme, setTheme] = useState<ThemeState>(initial);
  const submittedRef = useRef<ThemeState | null>(null);
  const isDirty = !sameTheme(theme, saved);

  const update = (patch: Partial<ThemeState>) => setTheme((t) => ({ ...t, ...patch }));

  // When a save succeeds, the submitted values become the new baseline.
  useEffect(() => {
    if (state?.success && submittedRef.current) {
      setSaved(submittedRef.current);
      submittedRef.current = null;
    }
  }, [state]);

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!isDirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [isDirty]);

  // ---------------------------------------------------------------- preview
  const [device, setDevice] = useState<Device>("desktop");
  const [pagePath, setPagePath] = useState("");
  const [currentPath, setCurrentPath] = useState(`/${user.handle}`);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const previewUrl = useMemo(() => {
    const params = new URLSearchParams({
      studio: "1",
      template: theme.templateId,
      palette: theme.colorPalette,
      font: theme.fontFamily,
    });
    return `/${user.handle}${pagePath}?${params}`;
  }, [user.handle, pagePath, theme.templateId, theme.colorPalette, theme.fontFamily]);

  // Debounce so clicking through options doesn't queue up reloads.
  const [frame, setFrame] = useState({ src: previewUrl, reloadKey: 0 });
  useEffect(() => {
    if (frame.src === previewUrl && frame.reloadKey === reloadKey) return;
    const t = setTimeout(() => {
      // Changing the iframe key below remounts it, so onLoad always follows.
      setFrame({ src: previewUrl, reloadKey });
      setLoading(true);
    }, 250);
    return () => clearTimeout(t);
  }, [previewUrl, reloadKey, frame]);

  // Track navigation inside the preview (reported by StudioPreviewBridge).
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data as { source?: string; type?: string; path?: string };
      if (data?.source === STUDIO_MESSAGE_SOURCE && data.type === "location" && typeof data.path === "string") {
        setCurrentPath(data.path);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const currentPage = PAGES.find((p) => `/${user.handle}${p.path}` === currentPath);

  // Scale the device-width iframe down to fit the available space.
  const stageRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setStage({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const deviceWidth = DEVICES[device].width;
  const scale = stage.width > 0 ? Math.min(1, stage.width / deviceWidth) : 1;
  const frameHeight = stage.height > 0 ? stage.height / scale : 800;

  const signature = TEMPLATE_SIGNATURE_STYLES[theme.templateId];
  const usingSignature = signature.palette === theme.colorPalette && signature.font === theme.fontFamily;
  const activePalette = PALETTES[theme.colorPalette];

  return (
    <form
      action={(formData) => {
        submittedRef.current = theme;
        formAction(formData);
      }}
      className="w-full space-y-5"
    >
      <input type="hidden" name="templateId" value={theme.templateId} />
      <input type="hidden" name="colorPalette" value={theme.colorPalette} />
      <input type="hidden" name="fontFamily" value={theme.fontFamily} />

      {/* Header + save bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50 flex items-center gap-2.5">
            <Palette className="h-7 w-7 text-purple-400" />
            <span>Theme Studio</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Pick a layout, colors and type. The preview shows your real portfolio before you publish.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`h-8 px-3 rounded-full text-xs font-medium inline-flex items-center gap-1.5 border ${
              isDirty
                ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border-zinc-800 bg-zinc-900/60 text-zinc-400"
            }`}
            aria-live="polite"
          >
            <span className={`h-1.5 w-1.5 rounded-full ${isDirty ? "bg-amber-400" : "bg-emerald-400"}`} />
            {isDirty ? "Unsaved changes" : "Published"}
          </span>
          {isDirty && (
            <button
              type="button"
              onClick={() => setTheme(saved)}
              className="h-10 px-3.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Discard</span>
            </button>
          )}
          <a
            href={`/${user.handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-3.5 rounded-xl border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 inline-flex items-center gap-1.5"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Live site</span>
          </a>
          <button
            type="submit"
            disabled={isPending || !isDirty}
            className="h-10 px-5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-black text-xs font-bold inline-flex items-center gap-1.5 shadow-lg shadow-sky-500/10 cursor-pointer disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>{isPending ? "Publishing…" : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {state?.error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2.5">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-5 items-start">
        {/* ------------------------------------------------------- Controls */}
        <div className="space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1 scrollbar-none">
          {/* Layout */}
          <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Layout className="h-3.5 w-3.5 text-sky-400" />
              <span>Layout</span>
            </h2>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Layout template">
              {(Object.keys(TEMPLATES) as TemplateId[]).map((id) => {
                const t = TEMPLATES[id];
                const selected = theme.templateId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => update({ templateId: id })}
                    title={t.description}
                    className={`relative p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selected
                        ? "border-sky-500/80 bg-sky-500/10 ring-1 ring-sky-500/40"
                        : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                    }`}
                  >
                    <span
                      className="block h-1.5 w-8 rounded-full mb-2"
                      style={{ backgroundColor: PALETTES[TEMPLATE_SIGNATURE_STYLES[id].palette].accentHex }}
                    />
                    <span className="block text-xs font-bold text-zinc-100 leading-tight">{t.name}</span>
                    <span className="block text-[10px] text-zinc-500 mt-0.5 leading-snug line-clamp-2">{t.tagline}</span>
                    {selected && (
                      <span className="absolute top-2 right-2 h-4 w-4 rounded-full bg-sky-500 text-black flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {!usingSignature && (
              <button
                type="button"
                onClick={() => update({ colorPalette: signature.palette, fontFamily: signature.font })}
                className="w-full h-8 rounded-lg border border-dashed border-zinc-700 hover:border-sky-500/50 text-[11px] text-zinc-400 hover:text-sky-300 inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Wand2 className="h-3 w-3" />
                <span>
                  Use {TEMPLATES[theme.templateId].name}&apos;s recommended style ({PALETTES[signature.palette].name} ·{" "}
                  {FONTS[signature.font].name.split(" ").pop()})
                </span>
              </button>
            )}
          </section>

          {/* Colors */}
          <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Palette className="h-3.5 w-3.5 text-purple-400" />
              <span>Accent color</span>
            </h2>
            <div className="flex items-center justify-between gap-2" role="radiogroup" aria-label="Accent color">
              {(Object.keys(PALETTES) as ColorPalette[]).map((id) => {
                const p = PALETTES[id];
                const selected = theme.colorPalette === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={p.name}
                    title={p.name}
                    onClick={() => update({ colorPalette: id })}
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      selected ? "ring-2 ring-offset-2 ring-offset-zinc-900 ring-white/80 scale-105" : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: p.accentHex }}
                  >
                    {selected && <Check className="h-4 w-4 stroke-[3]" style={{ color: p.accentForeground }} />}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-zinc-400 leading-snug">
              <span className="font-semibold text-zinc-200">{activePalette.name}.</span> {activePalette.description}
            </p>
          </section>

          {/* Typography */}
          <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
              <Type className="h-3.5 w-3.5 text-blue-400" />
              <span>Typography</span>
            </h2>
            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Typography">
              {(Object.keys(FONTS) as FontFamily[]).map((id) => {
                const f = FONTS[id];
                const selected = theme.fontFamily === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    title={f.description}
                    onClick={() => update({ fontFamily: id })}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selected
                        ? "border-sky-500/80 bg-sky-500/10 ring-1 ring-sky-500/40"
                        : "border-zinc-800 bg-zinc-950/60 hover:border-zinc-700"
                    }`}
                  >
                    <span className={`block text-xl text-zinc-100 ${FONT_SAMPLE_CLASS[id]}`}>Aa</span>
                    <span className="block text-[10px] text-zinc-400 mt-1">{f.name.split(" ").pop()}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* SEO */}
          <details className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-4" open={Boolean(theme.seoTitle || theme.seoDescription) || undefined}>
            <summary className="list-none cursor-pointer flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-400">
              <span className="flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-amber-400" />
                <span>Search &amp; sharing</span>
              </span>
              <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
            </summary>
            <div className="space-y-3 pt-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <label htmlFor="seoTitle">Page title</label>
                  <span className={theme.seoTitle.length > 60 ? "text-amber-400" : ""}>{theme.seoTitle.length}/60</span>
                </div>
                <Input
                  id="seoTitle"
                  name="seoTitle"
                  value={theme.seoTitle}
                  onChange={(e) => update({ seoTitle: e.target.value })}
                  placeholder={`${user.name} — Portfolio`}
                  className="h-9 rounded-lg bg-zinc-950/80 border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <label htmlFor="seoDescription">Description</label>
                  <span className={theme.seoDescription.length > 160 ? "text-amber-400" : ""}>
                    {theme.seoDescription.length}/160
                  </span>
                </div>
                <Textarea
                  id="seoDescription"
                  name="seoDescription"
                  rows={3}
                  value={theme.seoDescription}
                  onChange={(e) => update({ seoDescription: e.target.value })}
                  placeholder="One or two sentences shown in search results and link previews."
                  className="p-2.5 rounded-lg bg-zinc-950/80 border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 resize-y"
                />
              </div>
              {/* Search result snippet */}
              <div className="p-3 rounded-lg bg-zinc-950/80 border border-zinc-800 space-y-0.5">
                <p className="text-[10px] text-zinc-500 truncate">portfolioosite.dev › {user.handle}</p>
                <p className="text-sm text-sky-300 truncate">{theme.seoTitle || `${user.name} — Portfolio`}</p>
                <p className="text-[11px] text-zinc-400 line-clamp-2">
                  {theme.seoDescription || user.headline || "Add a description to control how your portfolio appears in search."}
                </p>
              </div>
            </div>
          </details>
        </div>

        {/* -------------------------------------------------------- Preview */}
        <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 overflow-hidden flex flex-col lg:sticky lg:top-20 h-[70vh] lg:h-[calc(100vh-6rem)] min-h-[520px]">
          {/* Browser-style toolbar */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-zinc-800/80 bg-zinc-900/80">
            <div className="hidden sm:flex items-center gap-1.5 pr-1">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            </div>
            <div className="relative flex-1 min-w-0">
              <select
                value={currentPage?.path ?? "__custom"}
                onChange={(e) => {
                  setPagePath(e.target.value);
                  setCurrentPath(`/${user.handle}${e.target.value}`);
                  setReloadKey((k) => k + 1);
                }}
                aria-label="Preview page"
                className="w-full h-8 pl-3 pr-8 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 font-mono appearance-none truncate focus:outline-none focus:ring-1 focus:ring-sky-500/50"
              >
                {!currentPage && <option value="__custom">{currentPath}</option>}
                {PAGES.map((p) => (
                  <option key={p.label} value={p.path}>
                    /{user.handle}
                    {p.path} · {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-950 p-0.5" role="radiogroup" aria-label="Preview device">
              {(Object.keys(DEVICES) as Device[]).map((d) => {
                const Icon = DEVICES[d].icon;
                return (
                  <button
                    key={d}
                    type="button"
                    role="radio"
                    aria-checked={device === d}
                    aria-label={DEVICES[d].label}
                    title={`${DEVICES[d].label} (${DEVICES[d].width}px)`}
                    onClick={() => setDevice(d)}
                    className={`h-7 w-8 rounded-md flex items-center justify-center cursor-pointer transition-colors ${
                      device === d ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-200"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setReloadKey((k) => k + 1)}
              title="Reload preview"
              aria-label="Reload preview"
              className="h-8 w-8 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {/* Stage */}
          <div ref={stageRef} className="relative flex-1 min-h-0 bg-zinc-950 overflow-hidden">
            {stage.width > 0 && (
              <div
                className="absolute top-0 left-1/2 origin-top"
                style={{
                  width: deviceWidth,
                  height: frameHeight,
                  transform: `translateX(-50%) scale(${scale})`,
                }}
              >
                <iframe
                  key={`${frame.src}#${frame.reloadKey}`}
                  src={frame.src}
                  title="Portfolio preview"
                  onLoad={() => setLoading(false)}
                  className={`w-full h-full bg-zinc-950 ${device !== "desktop" ? "border-x border-zinc-800" : ""}`}
                />
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 flex items-start justify-center pt-24 bg-zinc-950/40 backdrop-blur-[1px] pointer-events-none">
                <div className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 inline-flex items-center gap-2 shadow-lg">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-sky-400" />
                  <span>Updating preview…</span>
                </div>
              </div>
            )}
          </div>

          <div className="px-3 py-1.5 border-t border-zinc-800/80 bg-zinc-900/80 text-[11px] text-zinc-500 flex items-center justify-between gap-2">
            <span className="truncate">
              {isDirty ? "Previewing unsaved changes. Visitors still see your published theme." : "This is what visitors see."}
            </span>
            <span className="shrink-0 font-mono">
              {DEVICES[device].width}px · {Math.round(scale * 100)}%
            </span>
          </div>
        </div>
      </div>

      {state?.success && !isDirty && (
        <p className="sr-only" role="status">
          Theme published.
        </p>
      )}
    </form>
  );
}
