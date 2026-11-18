import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";

export function SwissExperience({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 font-sans text-zinc-100">
      {/* Swiss Index Header */}
      <div className="space-y-4 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs font-mono tracking-widest uppercase text-zinc-500 hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>RETURN TO OVERVIEW</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">
            CAREER CHRONICLE
          </h1>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {portfolio.experiences.length} STAGES COMPLETED
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          Architectural leadership, engineering management, systems scaling, and infrastructure governance.
        </p>
      </div>

      {/* Swiss Architectural Stage Blocks */}
      <div className="space-y-12">
        {portfolio.experiences.map((exp, idx) => {
          const stageNum = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={exp.id}
              className="border border-zinc-800 p-6 sm:p-10 space-y-6 hover:border-zinc-700 transition-colors"
            >
              {/* Stage Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-800/80 pb-4 text-xs font-mono uppercase tracking-widest">
                <span className="font-bold text-white text-sm" style={{ color: "var(--theme-accent)" }}>
                  {`STAGE // ${stageNum}`}
                </span>
                <span className="text-zinc-500">
                  {exp.startDate} — {exp.endDate || "PRESENT"}
                </span>
              </div>

              {/* Role & Company */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  {exp.role}
                </h2>
                <div className="flex items-center gap-4 text-sm font-mono tracking-wider uppercase text-zinc-400">
                  <span className="text-white font-bold">{exp.company}</span>
                  {exp.location && (
                    <>
                      <span>//</span>
                      <span className="text-zinc-500 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              {exp.description && (
                <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed whitespace-pre-wrap max-w-4xl">
                  {exp.description}
                </p>
              )}

              {/* Skills as specs */}
              {exp.skills && exp.skills.length > 0 && (
                <div className="pt-4 border-t border-zinc-800/60 flex items-center gap-2 flex-wrap text-[11px] font-mono tracking-wider uppercase text-zinc-400">
                  <span className="text-zinc-600">SPECIFICATIONS:</span>
                  {exp.skills.map((skill: string) => (
                    <span key={skill} className="border border-zinc-800 px-2 py-0.5 text-zinc-300">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
