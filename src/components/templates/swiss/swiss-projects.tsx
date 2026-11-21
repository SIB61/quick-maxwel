import { PortfolioUser } from "@/lib/portfolio-data";
import { PROJECT_STATUS_LABELS } from "@/db/schema";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function SwissProjects({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans text-zinc-100">
      <div className="space-y-4 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs font-mono tracking-widest uppercase text-zinc-500 hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>RETURN TO OVERVIEW</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">SELECTED WORKS</h1>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {portfolio.projects.length} INDEXED PROJECTS
          </span>
        </div>
      </div>

      <div className="divide-y divide-zinc-800 border-y border-zinc-800">
        {portfolio.projects.map((project, idx) => (
          <Link
            key={project.id}
            href={`/${handle}/projects/${project.slug}`}
            className="grid grid-cols-12 gap-4 py-8 group hover:bg-zinc-900/40 transition-colors px-2"
          >
            <span className="col-span-2 sm:col-span-1 text-xs font-mono font-bold pt-1.5" style={{ color: "var(--theme-accent)" }}>
              {String(idx + 1).padStart(2, "0")}
            </span>
            <div className="col-span-10 sm:col-span-8 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white group-hover:opacity-80 transition-opacity flex items-center gap-2">
                <span>{project.title}</span>
                <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-xl">{project.summary}</p>
              {project.techStack && project.techStack.length > 0 && (
                <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                  {project.techStack.join(" / ")}
                </p>
              )}
            </div>
            <div className="col-span-12 sm:col-span-3 sm:text-right text-xs font-mono uppercase tracking-widest text-zinc-500 space-y-1 pl-[16.6%] sm:pl-0">
              {project.timeline && <div className="text-white">{project.timeline}</div>}
              {project.role && <div>{project.role}</div>}
              <div>{PROJECT_STATUS_LABELS[project.status] ?? project.status}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
