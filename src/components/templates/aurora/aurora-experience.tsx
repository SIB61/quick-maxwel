import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Sparkles } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function AuroraExperience({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      {/* Ambient Aurora Flare */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(circle, var(--theme-accent) 0%, #6366f1 50%, transparent 80%)`,
        }}
      />

      {/* Header Panel */}
      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-4 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
          }}
        />

        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Studio Overview</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-white/10 text-xs text-zinc-300">
              <Sparkles className="h-3 w-3" style={{ color: "var(--theme-accent)" }} />
              <span>Career Architecture</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Experience &amp; Leadership
            </h1>
          </div>

          <span className="text-xs font-mono text-zinc-400 bg-zinc-950/40 px-3 py-1.5 rounded-full border border-white/5">
            {portfolio.experiences.length} Milestones
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl leading-relaxed">
          High-impact engineering leadership, platform architecture, and cross-functional technology scaling.
        </p>
      </div>

      {/* Floating Translucent Milestone Capsules */}
      <div className="space-y-8 relative z-10">
        {portfolio.experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-8 sm:p-10 rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all space-y-6 relative overflow-hidden group"
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
              }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {exp.company}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {exp.role}
                </h2>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {exp.location && (
                  <span className="text-xs text-zinc-400 flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-950/60 border border-white/5">
                    <MapPin className="h-3 w-3" />
                    {exp.location}
                  </span>
                )}
                <span
                  className="text-xs font-mono px-3.5 py-1 rounded-full border font-bold"
                  style={{
                    borderColor: "var(--theme-accent)",
                    color: "var(--theme-accent)",
                    backgroundColor: "var(--badge-backdrop)",
                  }}
                >
                  {exp.startDate} — {exp.endDate || "Present"}
                </span>
              </div>
            </div>

            {exp.description && (
              <RichContentDisplay
                content={exp.description}
                className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-4xl"
              />
            )}

            {exp.skills && exp.skills.length > 0 && (
              <div className="pt-4 border-t border-white/5 flex items-center gap-2 flex-wrap">
                {exp.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
