import { getPortfolioData } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="space-y-2">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Overview</span>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-2">
          <Briefcase className="h-6 w-6" style={{ color: "var(--theme-accent)" }} />
          Work Experience
        </h1>
        <p className="text-sm text-zinc-400">
          Career milestones, engineering leadership roles, and platform impact.
        </p>
      </div>

      <div className="relative border-l border-zinc-800 ml-3 space-y-8 pl-6">
        {portfolio.experiences.map((exp) => (
          <div key={exp.id} className="relative group">
            {/* Timeline bullet */}
            <div
              className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-zinc-950 group-hover:scale-125 transition-transform"
              style={{ backgroundColor: "var(--theme-accent)" }}
            />

            <div className="space-y-3 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h2 className="font-bold text-lg text-zinc-100">{exp.role}</h2>
                  <div className="text-sm flex items-center gap-2 font-medium" style={{ color: "var(--theme-accent)" }}>
                    <span>{exp.company}</span>
                    {exp.location && (
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        • <MapPin className="h-3 w-3 inline" /> {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                <Badge variant="outline" className="w-fit text-xs border-zinc-700 text-zinc-400">
                  {exp.startDate} — {exp.endDate || "Present"}
                </Badge>
              </div>

              {exp.description && (
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>
              )}

              {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
                      {skill}
                    </Badge>
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
