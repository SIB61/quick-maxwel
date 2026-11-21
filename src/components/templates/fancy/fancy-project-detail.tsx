import { PortfolioUser } from "@/lib/portfolio-data";
import { PROJECT_STATUS_LABELS } from "@/db/schema";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function FancyProjectDetail({
  portfolio,
  project,
  handle,
}: {
  portfolio: PortfolioUser;
  project: PortfolioUser["projects"][number];
  handle: string;
}) {
  const meta = [project.role, project.timeline, PROJECT_STATUS_LABELS[project.status] ?? project.status].filter(Boolean);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] max-w-full h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)" }}
      />

      <div className="relative z-10">
        <Link href={`/${handle}/projects`} className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Work</span>
        </Link>
      </div>

      <div className="rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl relative z-10 overflow-hidden">
        {project.coverImageUrl && <img src={project.coverImageUrl} alt="" className="w-full aspect-[21/9] object-cover" />}
        <div className="p-8 sm:p-12 space-y-8">
          <header className="space-y-4 border-b border-zinc-800 pb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">{meta.join(" · ")}</span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">{project.title}</h1>
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">{project.summary}</p>
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full text-xs font-semibold border" style={{ borderColor: "var(--theme-accent)", color: "var(--theme-accent)", backgroundColor: "rgba(0,0,0,0.4)" }}>{tech}</span>
                ))}
              </div>
            )}
          </header>

          {project.highlights && project.highlights.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-4">
              <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">What Made It Special</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {project.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-200 font-light">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--theme-accent)" }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.description && (
            <div className="space-y-3 pt-2">
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Behind the Build</h2>
              <RichContentDisplay content={project.description} className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed" />
            </div>
          )}

          <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3.5 rounded-full font-bold text-xs text-black hover:opacity-90 shadow-lg flex items-center gap-2" style={{ backgroundColor: "var(--theme-accent)" }}>
                  <ExternalLink className="h-4 w-4" />
                  <span>See It Live</span>
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3.5 rounded-full font-semibold text-xs border border-zinc-700 text-zinc-200 hover:bg-zinc-800 flex items-center gap-2">
                  <GithubIcon className="h-4 w-4" />
                  <span>Source</span>
                </a>
              )}
            </div>
            <Link href={`/${handle}/contact?subject=${encodeURIComponent(`Project: ${project.title}`)}`} className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Work with {portfolio.name}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
