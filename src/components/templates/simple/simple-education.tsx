import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, GraduationCap, MapPin } from "lucide-react";
import Link from "next/link";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function SimpleEducation({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
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
          <GraduationCap className="h-7 w-7" style={{ color: "var(--theme-accent)" }} />
          <span>Education &amp; Qualifications</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
          Degrees, schools, and the training behind the work.
        </p>
      </div>

      {/* Continuous Timeline Ruler */}
      <div className="relative border-l-2 border-zinc-800 ml-4 space-y-8 pl-8">
        {portfolio.education.map((edu) => (
          <div key={edu.id} className="relative group">
            {/* Timeline bullet node */}
            <div
              className="absolute -left-[39px] top-1.5 h-4 w-4 rounded-full border-2 border-zinc-950 group-hover:scale-125 transition-transform"
              style={{ backgroundColor: "var(--theme-accent)" }}
            />

            <div className="space-y-4 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h2 className="font-bold text-xl text-white">{edu.degree}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}</h2>
                  <div className="text-sm flex items-center gap-2 font-medium pt-0.5" style={{ color: "var(--theme-accent)" }}>
                    <span>{edu.institution}</span>
                    {edu.location && (
                      <span className="text-xs text-zinc-400 flex items-center gap-1 font-normal">
                        • <MapPin className="h-3 w-3 inline" /> {edu.location}
                      </span>
                    )}
                  </div>
                </div>

                <Badge variant="outline" className="w-fit text-xs border-zinc-700 text-zinc-400 font-mono">
                  {edu.startDate} — {edu.endDate || "Present"}
                </Badge>
              </div>

              {edu.description && (
                <RichContentDisplay content={edu.description} className="text-sm text-zinc-300 leading-relaxed" />
              )}

              {edu.grade && (
                <p className="text-xs text-zinc-400">
                  Grade: <span className="text-zinc-100 font-semibold">{edu.grade}</span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
