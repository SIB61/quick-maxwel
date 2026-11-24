import { PortfolioUser } from "@/lib/portfolio-data";
import { PROJECT_STATUS_LABELS } from "@/db/schema";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, FolderKanban } from "lucide-react";
import { GithubIcon } from "@/components/icons";

export function AuroraProjects({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] max-w-full h-[350px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{ background: `radial-gradient(circle, var(--theme-accent) 0%, #6366f1 50%, transparent 80%)` }}
      />

      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)` }} />
        <Link href={`/${handle}`} className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Studio Overview</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-white/10 text-xs text-zinc-300">
              <FolderKanban className="h-3 w-3" style={{ color: "var(--theme-accent)" }} />
              <span>Studio Works</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">Projects &amp; Launches</h1>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-950/40 px-3 py-1.5 rounded-full border border-white/5">
            {portfolio.projects.length} Projects
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {portfolio.projects.map((project) => (
          <div
            key={project.id}
            className="rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)` }} />
            {project.coverImageUrl && (
              <Link href={`/${handle}/projects/${project.slug}`} className="block aspect-[16/9] overflow-hidden">
                <img src={project.coverImageUrl} alt="" className="h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500" />
              </Link>
            )}
            <div className="p-8 space-y-4 flex-1">
              <div className="flex items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                <span>{PROJECT_STATUS_LABELS[project.status] ?? project.status}</span>
                {project.timeline && <span>{project.timeline}</span>}
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
                <Link href={`/${handle}/projects/${project.slug}`}>{project.title}</Link>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">{project.summary}</p>
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-0.5 rounded-full text-[11px] bg-zinc-950/50 border border-white/10 text-zinc-300">{tech}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="px-8 py-5 border-t border-white/5 flex items-center justify-between">
              <Link href={`/${handle}/projects/${project.slug}`} className="text-xs font-semibold hover:underline flex items-center gap-1" style={{ color: "var(--theme-accent)" }}>
                <span>Explore Case Study</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <div className="flex items-center gap-2">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="Source code" className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/30">
                    <GithubIcon className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full text-xs font-bold text-black transition-all hover:scale-105 shadow-md flex items-center gap-1" style={{ backgroundColor: "var(--theme-accent)" }}>
                    <ExternalLink className="h-3 w-3" />
                    <span>Launch</span>
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
