import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, MapPin } from "lucide-react";
import Link from "next/link";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function SimpleExperience({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-sans text-zinc-100">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Resume Overview</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <Briefcase className="h-7 w-7" style={{ color: "var(--theme-accent)" }} />
          <span>Work Experience &amp; Chronology</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
          Complete career history, engineering leadership roles, and platform impact.
        </p>
      </div>

      {/* Continuous Timeline Ruler */}
      <div className="relative border-l-2 border-zinc-800 ml-4 space-y-8 pl-8">
        {portfolio.experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline bullet node */}
            <div
              className="absolute -left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-zinc-950 group-hover:scale-125 transition-transform"
              style={{ backgroundColor: "var(--theme-accent)" }}
            />

            <div className="space-y-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h2 className="font-bold text-xl text-white">{exp.role}</h2>
                  <div className="text-sm flex items-center gap-2 font-medium pt-0.5" style={{ color: "var(--theme-accent)" }}>
                    <span>{exp.company}</span>
                    {exp.location && (
                      <span className="text-xs text-zinc-400 flex items-center gap-1 font-normal">
                        • <MapPin className="h-3 w-3 inline" /> {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <Badge variant="outline" className="w-fit text-xs border-zinc-700 text-zinc-400 font-mono">
                  {exp.startDate} — {exp.endDate || "Present"}
                </Badge>
              </div>

              {exp.description && (
                <RichContentDisplay content={exp.description} className="text-sm text-zinc-300 leading-relaxed" />
              )}

              {exp.skills && exp.skills.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-zinc-800/60">
                  {exp.skills.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-zinc-800/80 text-zinc-300 text-xs font-mono border border-zinc-750"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
