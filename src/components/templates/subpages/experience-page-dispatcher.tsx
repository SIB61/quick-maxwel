import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalExperience } from "../terminal/terminal-experience";
import { SwissExperience } from "../swiss/swiss-experience";
import { AuroraExperience } from "../aurora/aurora-experience";
import { BentoExperience } from "../bento/bento-experience";
import { FancyExperience } from "../fancy/fancy-experience";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Briefcase, MapPin } from "lucide-react";
import Link from "next/link";

export default function ExperiencePageDispatcher({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalExperience portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissExperience portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraExperience portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoExperience portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyExperience portfolio={portfolio} handle={handle} />;
  }

  // Standard/Simple template fallback
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8 w-full">
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
                <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap">
                  {exp.description}
                </p>
              )}

              {exp.skills && exp.skills.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {exp.skills.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 text-[11px] font-mono border border-zinc-750"
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
