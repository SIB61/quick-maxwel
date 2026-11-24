import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Terminal as TerminalIcon } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function TerminalProjectDetail({
  portfolio,
  project,
  handle,
}: {
  portfolio: PortfolioUser;
  project: PortfolioUser["projects"][number];
  handle: string;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={`/${handle}/projects`} className="hover:text-zinc-100 flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>cd .. (back to projects)</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-200">./{project.slug}/README.md</span>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        <div className="h-9 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-400 text-xs">sh: less ~/projects/{project.slug}/README.md</span>
          </div>
          <span className="text-zinc-500 text-[11px]">[{project.status}]</span>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2 border-b border-zinc-800/80 pb-6">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider"># PROJECT</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">{project.title}</h1>
            <div className="text-zinc-400 text-xs space-y-0.5">
              {project.role && <div><span className="text-zinc-500">role:</span> {project.role}</div>}
              {project.timeline && <div><span className="text-zinc-500">timeline:</span> {project.timeline}</div>}
              {project.techStack && project.techStack.length > 0 && (
                <div><span className="text-zinc-500">stack:</span> <span style={{ color: "var(--theme-accent)" }}>{project.techStack.join(" · ")}</span></div>
              )}
            </div>
          </div>

          {project.coverImageUrl && (
            <img src={project.coverImageUrl} alt="" className="w-full rounded-lg border border-zinc-800 aspect-[21/9] object-cover" />
          )}

          <div className="space-y-1">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">## SUMMARY</span>
            <p className="text-zinc-300 leading-relaxed">{project.summary}</p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-zinc-800/80">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">## HIGHLIGHTS</span>
              <div className="space-y-2">
                {project.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
                    <span className="text-emerald-400 font-bold shrink-0">[{idx + 1}]</span>
                    <span className="text-zinc-200 text-xs sm:text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.description && (
            <div className="space-y-1 pt-4 border-t border-zinc-800/80">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">## CASE_STUDY</span>
              <RichContentDisplay content={project.description} className="font-mono text-zinc-300 text-sm leading-relaxed" />
            </div>
          )}

          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs">
                  $ git clone {project.slug}
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg border text-xs" style={{ borderColor: "var(--theme-accent)", color: "var(--theme-accent)" }}>
                  $ open --live
                </a>
              )}
            </div>
            <Link
              href={`/${handle}/contact?subject=${encodeURIComponent(`Project: ${project.title}`)}`}
              className="px-6 py-3 rounded-xl font-bold text-black transition-all hover:opacity-90 flex items-center gap-2 shrink-0"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <TerminalIcon className="h-4 w-4" />
              <span>./contact.sh --re={project.slug}</span>
            </Link>
          </div>
          <p className="text-[11px] text-zinc-600">maintained by {portfolio.name}</p>
        </div>
      </div>
    </div>
  );
}
