"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

export interface ShowcaseProfile {
  handle: string;
  name: string;
  profession: string;
  discipline: string;
  pitch: string;
  avatarUrl: string | null;
  location: string | null;
  templateName: string;
  accentHex: string;
  stats: { label: string; count: number }[];
}

/** Filterable gallery of demo portfolios, one per profession. */
export function ProfessionShowcase({ profiles }: { profiles: ShowcaseProfile[] }) {
  const disciplines = useMemo(() => ["All", ...Array.from(new Set(profiles.map((p) => p.discipline)))], [profiles]);
  const [active, setActive] = useState("All");
  const visible = active === "All" ? profiles : profiles.filter((p) => p.discipline === active);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter demo portfolios by discipline">
        {disciplines.map((d) => {
          const selected = d === active;
          const count = d === "All" ? profiles.length : profiles.filter((p) => p.discipline === d).length;
          return (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(d)}
              className={`h-9 px-3.5 rounded-full text-xs font-semibold border transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                selected
                  ? "bg-sky-500 border-sky-500 text-black shadow-md shadow-sky-500/20"
                  : "bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-600 hover:text-white"
              }`}
            >
              <span>{d}</span>
              <span className={selected ? "text-black/60" : "text-zinc-500"}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visible.map((p) => (
          <Link
            key={p.handle}
            // exit_preview clears any leftover template preview so this is the real profile.
            href={`/${p.handle}?exit_preview=true`}
            data-showcase-card
            style={{ "--card-accent": p.accentHex } as React.CSSProperties}
            className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/60 hover:border-zinc-600 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            {/* Accent band in the portfolio's own color */}
            <div
              className="h-16 relative"
              style={{
                background: `radial-gradient(120% 140% at 0% 0%, ${p.accentHex}55, transparent 60%), linear-gradient(135deg, ${p.accentHex}22, transparent)`,
              }}
            >
              <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-950/70 border border-zinc-800 text-zinc-300 backdrop-blur">
                {p.discipline}
              </span>
            </div>

            <div className="px-5 pb-5 -mt-8 flex-1 flex flex-col">
              {p.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.avatarUrl}
                  alt=""
                  className="h-16 w-16 rounded-2xl object-cover border-2 border-zinc-900 shadow-lg"
                  style={{ outline: `2px solid ${p.accentHex}`, outlineOffset: "2px" }}
                />
              ) : (
                <div
                  className="h-16 w-16 rounded-2xl flex items-center justify-center text-xl font-black text-black border-2 border-zinc-900"
                  style={{ backgroundColor: p.accentHex }}
                >
                  {p.name.charAt(0)}
                </div>
              )}

              <div className="mt-3 space-y-0.5">
                <h3 className="font-bold text-zinc-100 group-hover:text-white leading-tight">{p.name}</h3>
                <p className="text-xs font-semibold text-[color:var(--card-accent-text)]">
                  {p.profession}
                </p>
                {p.location && (
                  <p className="text-[11px] text-zinc-500 flex items-center gap-1 pt-0.5">
                    <MapPin className="h-3 w-3" />
                    <span>{p.location}</span>
                  </p>
                )}
              </div>

              <p className="mt-3 text-xs text-zinc-400 leading-relaxed flex-1">{p.pitch}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stats
                  .filter((s) => s.count > 0)
                  .map((s) => (
                    <span key={s.label} className="px-2 py-0.5 rounded-md text-[10px] bg-zinc-950/60 border border-zinc-800 text-zinc-400">
                      {s.count} {s.label}
                    </span>
                  ))}
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px]">
                <span className="text-zinc-500">
                  Template: <span className="text-zinc-300 font-medium">{p.templateName}</span>
                </span>
                <span className="inline-flex items-center gap-0.5 font-semibold text-zinc-300 group-hover:text-white">
                  View
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
