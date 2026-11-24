import { PortfolioUser } from "@/lib/portfolio-data";
import { PROJECT_STATUS_LABELS } from "@/db/schema";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, Mail } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function BentoProjectDetail({
  portfolio,
  project,
  handle,
}: {
  portfolio: PortfolioUser;
  project: PortfolioUser["projects"][number];
  handle: string;
}) {
  const facts = [
    { label: "Role", value: project.role },
    { label: "Timeline", value: project.timeline },
    { label: "Status", value: PROJECT_STATUS_LABELS[project.status] ?? project.status },
  ].filter((f) => f.value);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-zinc-100">
      <div>
        <Link href={`/${handle}/projects`} className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Projects Grid</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-2xl overflow-hidden">
          {project.coverImageUrl && <img src={project.coverImageUrl} alt="" className="w-full aspect-[16/9] object-cover" />}
          <div className="p-8 sm:p-10 space-y-8">
            <header className="space-y-4 border-b border-zinc-800 pb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">{project.title}</h1>
              <p className="text-base text-zinc-300 leading-relaxed">{project.summary}</p>
            </header>
            {project.description && (
              <div className="space-y-3">
                <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">Case Study</h2>
                <RichContentDisplay content={project.description} className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {facts.length > 0 && (
            <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 shadow-md grid grid-cols-1 gap-4">
              {facts.map((f) => (
                <div key={f.label} className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">{f.label}</span>
                  <p className="text-sm text-zinc-100 font-medium">{f.value}</p>
                </div>
              ))}
            </div>
          )}

          {project.techStack && project.techStack.length > 0 && (
            <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 space-y-3 shadow-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Tech Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-lg text-[11px] font-mono border" style={{ borderColor: "var(--theme-accent)", color: "var(--theme-accent)" }}>{tech}</span>
                ))}
              </div>
            </div>
          )}

          {project.highlights && project.highlights.length > 0 && (
            <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 space-y-4 shadow-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Highlights</span>
              <div className="space-y-2">
                {project.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-200">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--theme-accent)" }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 space-y-3 shadow-md">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl font-bold text-xs text-black hover:opacity-90 flex items-center justify-center gap-2" style={{ backgroundColor: "var(--theme-accent)" }}>
                <ExternalLink className="h-4 w-4" />
                <span>Open Live Project</span>
              </a>
            )}
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl font-semibold text-xs bg-zinc-950/80 border border-zinc-800 text-zinc-200 hover:text-white flex items-center justify-center gap-2">
                <GithubIcon className="h-4 w-4" />
                <span>Browse Source</span>
              </a>
            )}
            <Link href={`/${handle}/contact?subject=${encodeURIComponent(`Project: ${project.title}`)}`} className="w-full py-3 rounded-xl font-semibold text-xs text-zinc-300 hover:text-white flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" />
              <span>Contact {portfolio.name}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
