import { PortfolioUser } from "@/lib/portfolio-data";
import { GithubIcon } from "@/components/icons";
import { PROJECT_STATUS_LABELS } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, ExternalLink, FolderKanban } from "lucide-react";
import Link from "next/link";

export function SimpleProjects({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-sans text-zinc-100">
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Resume Overview</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <FolderKanban className="h-7 w-7" style={{ color: "var(--theme-accent)" }} />
          <span>Selected Projects</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
          Products, open-source work, and engineering builds by {portfolio.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolio.projects.map((project) => (
          <Card
            key={project.id}
            className="bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all p-0 gap-0 flex flex-col justify-between rounded-2xl shadow-md group overflow-hidden"
          >
            {project.coverImageUrl && (
              <Link href={`/${handle}/projects/${project.slug}`} className="block aspect-[16/9] bg-zinc-950 overflow-hidden">
                <img src={project.coverImageUrl} alt="" className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform" />
              </Link>
            )}
            <div className="p-6 sm:p-7 space-y-4 flex-1">
              <div className="flex items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                <span>{PROJECT_STATUS_LABELS[project.status] ?? project.status}</span>
                {project.timeline && <span>{project.timeline}</span>}
              </div>
              <div>
                <h2 className="font-bold text-xl text-white group-hover:text-[var(--theme-accent)] transition-colors">
                  <Link href={`/${handle}/projects/${project.slug}`}>{project.title}</Link>
                </h2>
                {project.role && <p className="text-xs text-zinc-500 mt-1">{project.role}</p>}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2">{project.summary}</p>
              </div>
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-[11px] border-zinc-700 text-zinc-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="px-6 sm:px-7 py-4 border-t border-zinc-800/60 flex items-center justify-between gap-2 text-xs">
              <Link
                href={`/${handle}/projects/${project.slug}`}
                className="font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Case Study</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <div className="flex items-center gap-3">
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white flex items-center gap-1">
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold px-3 py-1.5 rounded-lg text-black transition-opacity hover:opacity-90 flex items-center gap-1"
                    style={{ backgroundColor: "var(--theme-accent)" }}
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
