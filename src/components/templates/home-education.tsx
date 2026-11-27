import type { CSSProperties } from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import type { PortfolioUser } from "@/lib/portfolio-data";

type Variant = "simple" | "fancy" | "swiss" | "aurora" | "terminal" | "bento";

const SHELL: Record<Variant, { wrap: string; heading: string; card: string }> = {
  simple: {
    wrap: "space-y-6",
    heading: "text-xl sm:text-2xl font-bold tracking-tight text-zinc-100",
    card: "p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800",
  },
  fancy: {
    wrap: "space-y-8",
    heading: "text-2xl sm:text-3xl font-black tracking-tight text-white",
    card: "p-5 rounded-3xl bg-zinc-900/70 border border-zinc-800 shadow-xl",
  },
  swiss: {
    wrap: "space-y-6",
    heading: "text-sm font-bold uppercase tracking-[0.25em] text-white",
    card: "py-5 border-t border-zinc-700",
  },
  aurora: {
    wrap: "space-y-8 relative z-10",
    heading: "text-2xl sm:text-3xl font-bold tracking-tight text-white",
    card: "p-5 rounded-3xl bg-white/[0.04] border border-white/10 backdrop-blur-xl",
  },
  terminal: {
    wrap: "space-y-4",
    heading: "text-sm text-zinc-200 font-mono",
    card: "pl-4 border-l-2 border-zinc-800",
  },
  bento: {
    wrap: "space-y-4",
    heading: "text-[11px] font-bold uppercase tracking-wider text-zinc-300",
    card: "space-y-0.5",
  },
};

/** Education block for the home page; shares the same data/order logic as the other sections. */
export function HomeEducation({
  portfolio,
  variant,
  style,
}: {
  portfolio: PortfolioUser;
  variant: Variant;
  style: CSSProperties;
}) {
  const featured = portfolio.education.filter((e) => e.isFeatured);
  const items = (featured.length > 0 ? featured : portfolio.education).slice(0, 3);
  if (items.length === 0) return null;

  const t = SHELL[variant];
  const accent = { color: "var(--theme-accent)" };
  const href = `/${portfolio.handle}/education`;
  const list = (
    <div className={variant === "bento" ? "space-y-3" : variant === "swiss" ? "" : "grid gap-4 md:grid-cols-2"}>
      {items.map((e) => (
        <div key={e.id} className={t.card}>
          <div className={variant === "terminal" ? "font-mono text-sm text-zinc-100" : "font-bold text-zinc-100"}>
            {e.degree}
            {e.fieldOfStudy ? `, ${e.fieldOfStudy}` : ""}
          </div>
          <div className="text-sm font-medium" style={accent}>
            {e.institution}
          </div>
          <div className="text-xs text-zinc-400 font-mono mt-1">
            {e.startDate} — {e.endDate || "Present"}
            {e.grade ? ` · ${e.grade}` : ""}
          </div>
        </div>
      ))}
    </div>
  );

  const head = (
    <div className="flex items-center justify-between gap-3">
      <h2 className={`${t.heading} flex items-center gap-2`}>
        <GraduationCap className="h-5 w-5 shrink-0" style={accent} />
        <span>{variant === "terminal" ? "$ ls ./education" : variant === "swiss" ? "Education" : "Education"}</span>
      </h2>
      <Link href={href} className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors whitespace-nowrap">
        View all →
      </Link>
    </div>
  );

  if (variant === "bento") {
    return (
      <div
        style={style}
        className="lg:col-span-2 rounded-3xl p-5 sm:p-6 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all space-y-4"
      >
        {head}
        {list}
      </div>
    );
  }
  return (
    <section style={style} className={t.wrap}>
      {head}
      {list}
    </section>
  );
}
