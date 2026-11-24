import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function TerminalProjects({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={`/${handle}`} className="hover:text-zinc-100 flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>cd ..</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-200">ls -la ~/projects</span>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        <div className="h-9 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-400 text-xs">sh: git log --projects</span>
          </div>
          <span className="text-zinc-500 text-[11px]">{portfolio.projects.length} repositories</span>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div className="text-zinc-400 border-b border-zinc-800/80 pb-2 flex items-center gap-2">
            <span style={{ color: "var(--theme-accent)" }}>user@{handle}:~$</span>
            <span className="text-zinc-200">find ./projects -maxdepth 1 -type d</span>
          </div>

          <div className="space-y-4">
            {portfolio.projects.map((project) => (
              <div
                key={project.id}
                className="p-5 rounded-lg border border-zinc-800/80 bg-zinc-900/30 space-y-3 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-[11px] font-bold">
                      drwxr-xr-x ./{project.slug}/ {project.timeline && <>· {project.timeline}</>}
                    </span>
                    <h2 className="text-zinc-100 font-bold text-base hover:text-emerald-400 transition-colors">
                      <Link href={`/${handle}/projects/${project.slug}`}>{project.title}</Link>
                    </h2>
                  </div>
                  <span
                    className="px-3 py-1 rounded text-xs font-bold border w-fit"
                    style={{ borderColor: "var(--theme-accent)", color: "var(--theme-accent)", backgroundColor: "var(--badge-backdrop)" }}
                  >
                    [{project.status}]
                  </span>
                </div>

                <p className="text-zinc-400 text-xs leading-relaxed">{project.summary}</p>

                {project.techStack && project.techStack.length > 0 && (
                  <div className="text-xs text-zinc-300">
                    <span className="text-zinc-500">stack: </span>
                    <span style={{ color: "var(--theme-accent)" }}>[</span>
                    {project.techStack.map((t) => `"${t}"`).join(", ")}
                    <span style={{ color: "var(--theme-accent)" }}>]</span>
                  </div>
                )}

                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-zinc-800/60">
                  <Link
                    href={`/${handle}/projects/${project.slug}`}
                    className="text-zinc-400 hover:text-white flex items-center gap-1 group pt-2"
                  >
                    <span>cat ./{project.slug}/README.md</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                  <div className="flex items-center gap-2 pt-2">
                    {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200">
                        git clone
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-2.5 py-1 rounded text-black font-bold" style={{ backgroundColor: "var(--theme-accent)" }}>
                        open --live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 text-zinc-500 text-[11px] flex items-center justify-between">
            <span>working tree clean</span>
            <span className="text-emerald-400 font-bold">[EXIT 0]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
