import { PortfolioUser } from "@/lib/portfolio-data";
import { PROJECT_STATUS_LABELS } from "@/db/schema";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function FancyProjects({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] max-w-full h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)" }}
      />

      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl space-y-4 relative overflow-hidden">
        <Link href={`/${handle}`} className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Creative Overview</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-zinc-800 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: "var(--theme-accent)" }} />
              <span className="text-zinc-300">Made with care</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Featured Work</h1>
          </div>
          <span className="text-xs font-mono text-zinc-400 bg-zinc-950/60 px-3.5 py-1.5 rounded-full border border-zinc-800">
            {portfolio.projects.length} Projects
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {portfolio.projects.map((project) => (
          <Link
            key={project.id}
            href={`/${handle}/projects/${project.slug}`}
            className="rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-600/80 backdrop-blur-md shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col group overflow-hidden"
          >
            <div className="aspect-[16/10] overflow-hidden relative bg-zinc-950">
              {project.coverImageUrl ? (
                <img src={project.coverImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-6xl font-black text-zinc-800" style={{ background: "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--theme-accent) 25%, transparent), transparent 70%)" }}>
                  {project.title.charAt(0)}
                </div>
              )}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold bg-black/60 backdrop-blur border border-white/10 text-white">
                {PROJECT_STATUS_LABELS[project.status] ?? project.status}
              </span>
              <span className="absolute top-4 right-4 h-9 w-9 rounded-full flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: "var(--theme-accent)" }}>
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <div className="p-7 space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>{project.role}</span>
                <span>{project.timeline}</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[var(--theme-accent)] transition-colors">
                {project.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">{project.summary}</p>
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="px-2.5 py-0.5 rounded-full text-[11px] bg-zinc-950/60 border border-zinc-800 text-zinc-300">{tech}</span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
