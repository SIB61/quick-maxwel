import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, GraduationCap, MapPin, Sparkles } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function FancyEducation({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      {/* Background Flare */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)" }}
      />

      {/* Header Panel */}
      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl space-y-4 relative overflow-hidden">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Creative Overview</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-zinc-800 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: "var(--theme-accent)" }} />
              <span className="text-zinc-300">Learning Journey</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Education
            </h1>
          </div>

          <span className="text-xs font-mono text-zinc-400 bg-zinc-950/60 px-3.5 py-1.5 rounded-full border border-zinc-800">
            {portfolio.education.length} Milestones
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl leading-relaxed">
          Degrees, schools, and the training that shaped the work.
        </p>
      </div>

      {/* Education Entries */}
      <div className="space-y-6 relative z-10">
        {portfolio.education.map((edu) => (
          <div
            key={edu.id}
            className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-600/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all space-y-6 relative overflow-hidden group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  {edu.institution}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                </h2>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {edu.location && (
                  <span className="text-xs text-zinc-400 flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-950/60 border border-zinc-800">
                    <MapPin className="h-3 w-3 text-zinc-500" />
                    <span>{edu.location}</span>
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
                  {edu.startDate} — {edu.endDate || "Present"}
                </span>
              </div>
            </div>

            {edu.description && (
              <RichContentDisplay
                content={edu.description}
                className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-4xl"
              />
            )}

            {edu.grade && (
              <p className="text-xs text-zinc-400">
                Grade: <span className="text-zinc-100 font-semibold">{edu.grade}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
