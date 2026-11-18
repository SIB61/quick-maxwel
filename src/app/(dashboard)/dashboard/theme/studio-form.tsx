"use client";

import { useActionState, useState } from "react";
import { updateThemeAction } from "@/actions/theme";
import { TEMPLATES, PALETTES, FONTS, TemplateId, ColorPalette, FontFamily } from "@/lib/templates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Check,
  Sparkles,
  Layout,
  Type,
  ExternalLink,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Eye,
  Layers,
  FileText,
  Briefcase,
  Star,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { PortfolioSettings } from "@/db/schema";

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

export default function ThemeStudioForm({ settings, user }: ThemeStudioFormProps) {
  const [state, formAction, isPending] = useActionState(updateThemeAction, undefined);

  const [templateId, setTemplateId] = useState<TemplateId>(
    (settings?.templateId as TemplateId) || "simple_professional"
  );
  const [colorPalette, setColorPalette] = useState<ColorPalette>(
    (settings?.colorPalette as ColorPalette) || "emerald"
  );
  const [fontFamily, setFontFamily] = useState<FontFamily>(
    (settings?.fontFamily as FontFamily) || "sans"
  );
  const [seoTitle, setSeoTitle] = useState(settings?.seoTitle || "");
  const [seoDescription, setSeoDescription] = useState(settings?.seoDescription || "");

  const activePalette = PALETTES[colorPalette] || PALETTES.emerald;
  const activeTemplate = TEMPLATES[templateId] || TEMPLATES.simple_professional;

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-50 flex items-center gap-2.5">
            <Palette className="h-7 w-7 text-purple-400" />
            <span>Theme & Template Studio</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Customize layout architecture, color schemes, typography, and live brand presentation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="h-11 px-4 rounded-xl border-zinc-800 text-xs font-semibold text-zinc-300">
            <Link href={`/${user.handle}`} target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              <span>Preview Live Portfolio</span>
            </Link>
          </Button>
        </div>
      </div>

      <form action={formAction} className="space-y-8">
        {/* Hidden inputs to pass state to server action */}
        <input type="hidden" name="templateId" value={templateId} />
        <input type="hidden" name="colorPalette" value={colorPalette} />
        <input type="hidden" name="fontFamily" value={fontFamily} />

        {state?.error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{state.error}</span>
          </div>
        )}

        {state?.success && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <span>Theme settings saved successfully! Your live portfolio has been updated.</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Layout Template Selection */}
            <Card className="bg-zinc-900/60 border-zinc-800/80 rounded-2xl p-6 py-6 gap-0 space-y-5">
              <CardHeader className="p-0 space-y-1">
                <CardTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <Layout className="h-5 w-5 text-emerald-400" />
                  <span>1. Select Portfolio Layout</span>
                </CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  Choose the structural blueprint for your public homepage and sections.
                </CardDescription>
              </CardHeader>

              <div className="grid grid-cols-1 gap-3.5">
                {(Object.keys(TEMPLATES) as TemplateId[]).map((id) => {
                  const t = TEMPLATES[id];
                  const isSelected = templateId === id;

                  return (
                    <div
                      key={id}
                      onClick={() => setTemplateId(id)}
                      className={`cursor-pointer p-4 rounded-xl border transition-all text-left space-y-2 ${
                        isSelected
                          ? "bg-zinc-800/80 border-emerald-500/80 ring-1 ring-emerald-500/50 shadow-lg"
                          : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-zinc-100">{t.name}</span>
                          <span className="text-xs text-zinc-400 hidden sm:inline">— {t.tagline}</span>
                        </div>
                        {isSelected ? (
                          <div className="h-5 w-5 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="h-5 w-5 rounded-full border border-zinc-700 shrink-0" />
                        )}
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {t.description}
                      </p>

                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Step 2: Color Palette Selection */}
            <Card className="bg-zinc-900/60 border-zinc-800/80 rounded-2xl p-6 py-6 gap-0 space-y-5">
              <CardHeader className="p-0 space-y-1">
                <CardTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-400" />
                  <span>2. Color Palette & Lighting</span>
                </CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  Sets the primary background tones, glowing accents, badges, and button highlights.
                </CardDescription>
              </CardHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(PALETTES) as ColorPalette[]).map((id) => {
                  const p = PALETTES[id];
                  const isSelected = colorPalette === id;

                  return (
                    <div
                      key={id}
                      onClick={() => setColorPalette(id)}
                      className={`cursor-pointer p-3.5 rounded-xl border transition-all text-left space-y-2.5 ${
                        isSelected
                          ? "bg-zinc-800/80 border-emerald-500/80 ring-1 ring-emerald-500/50 shadow-md"
                          : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          {/* Color Swatch */}
                          <div
                            className="h-6 w-6 rounded-lg shadow-inner border border-white/10 shrink-0"
                            style={{ backgroundColor: p.accentHex }}
                          />
                          <span className="font-bold text-xs text-zinc-100">{p.name}</span>
                        </div>
                        {isSelected && (
                          <div className="h-4 w-4 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <p className="text-[11px] text-zinc-400 leading-snug">
                        {p.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Step 3: Typography Selection */}
            <Card className="bg-zinc-900/60 border-zinc-800/80 rounded-2xl p-6 py-6 gap-0 space-y-5">
              <CardHeader className="p-0 space-y-1">
                <CardTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <Type className="h-5 w-5 text-blue-400" />
                  <span>3. Typography Aesthetic</span>
                </CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  Select font family pairing applied across your headings and body text.
                </CardDescription>
              </CardHeader>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(Object.keys(FONTS) as FontFamily[]).map((id) => {
                  const f = FONTS[id];
                  const isSelected = fontFamily === id;

                  return (
                    <div
                      key={id}
                      onClick={() => setFontFamily(id)}
                      className={`cursor-pointer p-3.5 rounded-xl border transition-all text-left space-y-1.5 ${
                        isSelected
                          ? "bg-zinc-800/80 border-emerald-500/80 ring-1 ring-emerald-500/50 shadow-md"
                          : "bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-zinc-100">{f.name}</span>
                        {isSelected && (
                          <div className="h-4 w-4 rounded-full bg-emerald-500 text-black flex items-center justify-center shrink-0">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-tight">
                        {f.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Step 4: SEO Metadata */}
            <Card className="bg-zinc-900/60 border-zinc-800/80 rounded-2xl p-6 py-6 gap-0 space-y-4">
              <CardHeader className="p-0 space-y-1">
                <CardTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-amber-400" />
                  <span>4. SEO & Social Meta</span>
                </CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  Search engine title and OpenGraph description.
                </CardDescription>
              </CardHeader>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="seoTitle" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    SEO Meta Title
                  </Label>
                  <Input
                    id="seoTitle"
                    name="seoTitle"
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder={`${user.name} — Portfolio & Architectural Insights`}
                    className="h-11 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="seoDescription" className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    SEO Meta Description
                  </Label>
                  <Textarea
                    id="seoDescription"
                    name="seoDescription"
                    rows={3}
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Brief 1-2 sentence description displayed on Google searches and social share cards..."
                    className="p-3.5 rounded-xl bg-zinc-950/80 border-zinc-800 text-sm text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 resize-y"
                  />
                </div>
              </div>
            </Card>

            {/* Save Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving Theme...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Theme & Layout
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Live Preview Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-24 space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Real-Time Mini Preview</span>
                </span>
                <span className="text-[11px] font-mono text-zinc-500 capitalize">
                  {templateId.replace("_", " ")} • {colorPalette}
                </span>
              </div>

              {/* Simulated Device Frame */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl space-y-4 overflow-hidden relative">
                {/* Simulated Glow */}
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                  style={{ backgroundColor: activePalette.accentHex }}
                />

                {/* Simulated Nav */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-xs font-bold text-zinc-200">{user.name}</span>
                  </div>
                  <div
                    className="h-6 px-2.5 rounded-full text-[10px] font-bold text-black flex items-center"
                    style={{ backgroundColor: activePalette.accentHex }}
                  >
                    Contact
                  </div>
                </div>

                {/* Simulated Hero based on selected template */}
                {templateId === "simple_professional" && (
                  <div className="space-y-3 py-2">
                    <div className="space-y-1">
                      <div className="text-sm font-extrabold text-zinc-100">{user.name}</div>
                      <div className="text-xs font-semibold" style={{ color: activePalette.accentHex }}>
                        {user.headline || "Staff Software Architect"}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-[11px] text-zinc-400">
                      {user.bio ? user.bio.slice(0, 90) + "..." : "Building mission-critical distributed systems..."}
                    </div>
                    {/* Simulated Timeline */}
                    <div className="space-y-2 pt-1 border-t border-zinc-900">
                      <div className="text-[10px] font-bold uppercase text-zinc-500">Timeline</div>
                      <div className="pl-3 border-l-2 space-y-2 text-[10px]" style={{ borderColor: activePalette.accentHex }}>
                        <div className="text-zinc-200 font-semibold">Principal Architect</div>
                        <div className="text-zinc-400">Senior Distributed Systems Lead</div>
                      </div>
                    </div>
                  </div>
                )}

                {templateId === "fancy_creative" && (
                  <div className="space-y-3 py-2">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[9px] font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ backgroundColor: activePalette.accentHex }} />
                      <span className="text-zinc-300">Available</span>
                    </div>
                    <div className="space-y-1">
                      <div
                        className="text-base font-black bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-white"
                        style={{ backgroundImage: `linear-gradient(to right, #ffffff, ${activePalette.accentHex})` }}
                      >
                        {user.name}
                      </div>
                      <div className="text-xs font-semibold text-zinc-300">
                        {user.headline || "Staff Software Architect"}
                      </div>
                    </div>
                    {/* Glass card simulation */}
                    <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-700/60 shadow-lg text-[10px] text-zinc-300">
                      High-impact architectures, distributed consensus, and resilience engineering.
                    </div>
                  </div>
                )}

                {templateId === "bento_grid" && (
                  <div className="space-y-2.5 py-1">
                    {/* Bento Mini Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                        <div className="text-xs font-bold text-zinc-200">{user.name}</div>
                        <div className="text-[9px] font-semibold" style={{ color: activePalette.accentHex }}>
                          {user.headline?.slice(0, 24) || "Architect"}
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                        <div className="text-[9px] uppercase font-bold text-zinc-500">Status</div>
                        <div className="text-[10px] font-bold text-zinc-200">Open to Work</div>
                      </div>
                      <div className="col-span-2 p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                        <div className="flex items-center justify-between text-[9px]">
                          <span className="text-zinc-400 font-bold uppercase">Writing Spotlight</span>
                          <span style={{ color: activePalette.accentHex }}>Read &rarr;</span>
                        </div>
                        <div className="text-[10px] font-bold text-zinc-200 truncate">
                          Designing Zero-Downtime Migration Pipelines
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {templateId === "developer_terminal" && (
                  <div className="space-y-2 py-1 font-mono text-[10px]">
                    <div className="flex items-center gap-1.5 pb-1 border-b border-zinc-900">
                      <div className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                      <div className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                      <div className="h-2 w-2 rounded-full bg-[#27c93f]" />
                      <span className="text-[9px] text-zinc-500 font-mono ml-1">terminal (zsh)</span>
                    </div>
                    <div className="space-y-1 text-zinc-300">
                      <div className="flex items-center gap-1 text-[9px]">
                        <span style={{ color: activePalette.accentHex }}>➜</span>
                        <span className="text-cyan-400">~</span>
                        <span>whoami --detailed</span>
                      </div>
                      <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 space-y-0.5">
                        <div className="font-bold text-zinc-100">{user.name}</div>
                        <div className="text-[9px]" style={{ color: activePalette.accentHex }}>
                          {user.headline || "Systems Engineer"}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] pt-1">
                        <span style={{ color: activePalette.accentHex }}>➜</span>
                        <span className="text-cyan-400">~/writings</span>
                        <span>ls -lh</span>
                      </div>
                      <div className="text-[9px] text-zinc-500 pl-2">
                        -rw-r--r-- 1 {user.handle} articles.log
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer preview note */}
                <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] text-zinc-500">
                  <span>Font: {fontFamily}</span>
                  <span className="font-mono" style={{ color: activePalette.accentHex }}>
                    {activePalette.accentHex}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
