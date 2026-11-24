import { PortfolioUser } from "@/lib/portfolio-data";
import { PROJECT_STATUS_LABELS } from "@/db/schema";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, FolderKanban } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export function BentoProjects({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-zinc-100">
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Link href={`/${handle}`} className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Bento Overview</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl flex items-center justify-center text-black font-bold" style={{ backgroundColor: "var(--theme-accent)" }}>
              <FolderKanban className="h-4 w-4" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">Projects</h1>
          </div>
        </div>
        <span className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300 self-start sm:self-auto">
          {portfolio.projects.length} Builds
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolio.projects.map((project, idx) => (
          <div
            key={project.id}
            className={`rounded-3xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-xl flex flex-col justify-between group overflow-hidden ${idx === 0 && portfolio.projects.length % 2 === 1 ? "md:col-span-2" : ""}`}
          >
            {project.coverImageUrl && (
              <Link href={`/${handle}/projects/${project.slug}`} className={`block overflow-hidden ${idx === 0 && portfolio.projects.length % 2 === 1 ? "aspect-[21/9]" : "aspect-[16/9]"}`}>
                <img src={project.coverImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform" />
              </Link>
            )}
            <div className="p-7 sm:p-8 space-y-4 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">{project.timeline}</span>
                <span className="px-3 py-1 rounded-xl text-xs font-bold font-mono border" style={{ borderColor: "var(--theme-accent)", color: "var(--theme-accent)", backgroundColor: "var(--badge-backdrop)" }}>
                  {PROJECT_STATUS_LABELS[project.status] ?? project.status}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:underline leading-snug">
                <Link href={`/${handle}/projects/${project.slug}`}>{project.title}</Link>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{project.summary}</p>
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-950/80 border border-zinc-800 text-zinc-300">{tech}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="px-7 sm:px-8 py-4 border-t border-zinc-800/60 flex items-center justify-between">
              <Link href={`/${handle}/projects/${project.slug}`} className="text-xs font-bold hover:underline flex items-center gap-1" style={{ color: "var(--theme-accent)" }}>
                <span>View Project</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <div className="flex items-center gap-2">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="Source code" className="h-8 w-8 rounded-xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white">
                    <GithubIcon className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-xl text-xs font-bold text-black hover:opacity-90 flex items-center gap-1" style={{ backgroundColor: "var(--theme-accent)" }}>
                    <ExternalLink className="h-3 w-3" />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
