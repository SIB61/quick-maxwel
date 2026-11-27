import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function SwissEducation({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans text-zinc-100">
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
            EDUCATION RECORD
          </h1>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {portfolio.education.length} QUALIFICATIONS
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          Degrees, institutions, and formal training.
        </p>
      </div>

      {/* Swiss Architectural Stage Blocks */}
      <div className="space-y-12">
        {portfolio.education.map((edu, idx) => {
          const stageNum = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={edu.id}
              className="border border-zinc-800 p-6 sm:p-10 space-y-6 hover:border-zinc-700 transition-colors"
            >
              {/* Stage Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-800/80 pb-4 text-xs font-mono uppercase tracking-widest">
                <span className="font-bold text-white text-sm" style={{ color: "var(--theme-accent)" }}>
                  {`STAGE // ${stageNum}`}
                </span>
                <span className="text-zinc-500">
                  {edu.startDate} — {edu.endDate || "PRESENT"}
                </span>
              </div>

              {/* Degree & Institution */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
                  {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                </h2>
                <div className="flex items-center gap-4 text-sm font-mono tracking-wider uppercase text-zinc-400">
                  <span className="text-white font-bold">{edu.institution}</span>
                  {edu.location && (
                    <>
                      <span>{"//"}</span>
                      <span className="text-zinc-500 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {edu.location}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              {edu.description && (
                <RichContentDisplay
                  content={edu.description}
                  className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed max-w-4xl"
                />
              )}

              {/* Grade */}
              {edu.grade && (
                <p className="text-xs text-zinc-400">
                  Grade: <span className="text-zinc-100 font-semibold">{edu.grade}</span>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
