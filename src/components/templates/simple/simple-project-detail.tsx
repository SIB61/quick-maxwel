import { PortfolioUser } from "@/lib/portfolio-data";
import { GithubIcon } from "@/components/icons";
import { PROJECT_STATUS_LABELS } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, ExternalLink, Mail } from "lucide-react";
import Link from "next/link";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function SimpleProjectDetail({
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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-sans text-zinc-100">
      <div>
        <Link
          href={`/${handle}/projects`}
          className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Projects</span>
        </Link>
      </div>

      <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 shadow-lg overflow-hidden">
        {project.coverImageUrl && (
          <img src={project.coverImageUrl} alt="" className="w-full aspect-[21/9] object-cover bg-zinc-950" />
        )}
        <div className="p-8 sm:p-10 space-y-8">
          <header className="space-y-4 border-b border-zinc-800 pb-8">
            <p className="text-xs font-mono uppercase tracking-wider text-zinc-400">{meta.join(" · ")}</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">{project.title}</h1>
            <p className="text-base text-zinc-300 leading-relaxed max-w-2xl">{project.summary}</p>
            {project.techStack && project.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-xs"
                    style={{ borderColor: "var(--theme-accent)", color: "var(--theme-accent)" }}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
            {(project.liveUrl || project.repoUrl) && (
              <div className="flex flex-wrap gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-xs font-bold text-black inline-flex items-center gap-1.5 hover:opacity-90"
                    style={{ backgroundColor: "var(--theme-accent)" }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>View Live</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-xs font-semibold border border-zinc-700 text-zinc-200 hover:bg-zinc-800 inline-flex items-center gap-1.5"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
              </div>
            )}
          </header>

          {project.highlights && project.highlights.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Key Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs sm:text-sm text-zinc-200"
                  >
                    <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" style={{ color: "var(--theme-accent)" }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.description && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Case Study</h2>
              <RichContentDisplay content={project.description} className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans" />
            </div>
          )}

          <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-xs text-zinc-400">Building something similar? Get in touch with {portfolio.name}.</div>
            <Link
              href={`/${handle}/contact?subject=${encodeURIComponent(`Project: ${project.title}`)}`}
              className="px-5 py-2.5 rounded-xl font-bold text-sm text-black inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <Mail className="h-4 w-4" />
              <span>Start a Conversation</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
