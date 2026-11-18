import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, GitCommit, GitBranch, MapPin } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function TerminalExperience({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-mono text-xs sm:text-sm">
      {/* Breadcrumb command */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={`/${handle}`} className="hover:text-zinc-100 flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>cd ..</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-200">git log --graph --decorate ./career/</span>
      </div>

      {/* Terminal Window Box */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        <div className="h-9 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-400 text-xs">sh: git log --graph --all --oneline</span>
          </div>
          <span className="text-zinc-500 text-[11px]">{portfolio.experiences.length} milestones</span>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div className="text-zinc-400 border-b border-zinc-800/80 pb-2 flex items-center gap-2">
            <span style={{ color: "var(--theme-accent)" }}>user@{handle}:~$</span>
            <span className="text-zinc-200">git log --graph --pretty=format:&apos;%h - %an, %ar : %s&apos;</span>
          </div>

          <div className="relative space-y-6 pl-2 sm:pl-4">
            {portfolio.experiences.map((exp, idx) => {
              const hash = (exp.id.replace(/-/g, "").slice(0, 7) || "8f4a12b").toLowerCase();
              const isFirst = idx === 0;

              return (
                <div key={exp.id} className="relative pl-6 border-l-2 border-zinc-800 space-y-2">
                  {/* Git branch node */}
                  <div
                    className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-zinc-950 flex items-center justify-center"
                    style={{ backgroundColor: "var(--theme-accent)" }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-black" />
                  </div>

                  {/* Commit Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-amber-400 font-bold">commit {hash}</span>
                      {isFirst && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] border border-emerald-500/30">
                          {"HEAD -> main"}
                        </span>
                      )}
                      <span className="text-zinc-500">tag: v{portfolio.experiences.length - idx}.0</span>
                    </div>

                    <span className="text-zinc-500 text-[11px]">
                      {exp.startDate} — {exp.endDate || "Present"}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <div className="pt-1">
                    <h2 className="text-zinc-100 font-bold text-sm sm:text-base">
                      {exp.role} @ <span style={{ color: "var(--theme-accent)" }}>{exp.company}</span>
                    </h2>
                    {exp.location && (
                      <p className="text-zinc-500 text-xs flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3" /> {exp.location}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {exp.description && (
                    <RichContentDisplay
                      content={exp.description}
                      className="font-mono text-zinc-400 text-xs leading-relaxed pt-1"
                    />
                  )}

                  {/* Technologies / Flags */}
                  {exp.skills && exp.skills.length > 0 && (
                    <div className="pt-2 flex items-center gap-1.5 flex-wrap">
                      {exp.skills.map((tech: string) => (
                        <span key={tech} className="text-[10px] text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                          --deps={tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 text-zinc-500 text-[11px] flex items-center justify-between">
            <span>(END) Press &apos;q&apos; to exit git pager</span>
            <span className="text-emerald-400 font-bold">[OK]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
