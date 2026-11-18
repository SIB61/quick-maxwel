import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Briefcase, MapPin, Layers } from "lucide-react";

export function BentoExperience({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-zinc-100">
      {/* Top Header Bento Tile */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Link
            href={`/${handle}`}
            className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Bento Overview</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center text-black font-bold"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <Briefcase className="h-4 w-4" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Work Experience &amp; Roles
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300">
            {portfolio.experiences.length} Career Milestones
          </span>
        </div>
      </div>

      {/* Bento Experience Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolio.experiences.map((exp) => (
          <div
            key={exp.id}
            className="rounded-3xl p-7 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-lg flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    {exp.company}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                    {exp.role}
                  </h2>
                </div>

                <span
                  className="px-3 py-1 rounded-xl text-xs font-mono font-bold border shrink-0"
                  style={{
                    borderColor: "var(--theme-accent)",
                    color: "var(--theme-accent)",
                    backgroundColor: "rgba(0,0,0,0.4)",
                  }}
                >
                  {exp.startDate} — {exp.endDate || "Present"}
                </span>
              </div>

              {exp.location && (
                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{exp.location}</span>
                </div>
              )}

              {exp.description && (
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </p>
              )}
            </div>

            {exp.skills && exp.skills.length > 0 && (
              <div className="pt-4 border-t border-zinc-800/60 flex items-center gap-2 flex-wrap">
                {exp.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="text-xs px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 font-mono"
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
