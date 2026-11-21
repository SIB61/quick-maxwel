import { PortfolioUser } from "@/lib/portfolio-data";
import { PROJECT_STATUS_LABELS } from "@/db/schema";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function SwissProjectDetail({
  portfolio,
  project,
  handle,
}: {
  portfolio: PortfolioUser;
  project: PortfolioUser["projects"][number];
  handle: string;
}) {
  const facts = [
    { label: "ROLE", value: project.role },
    { label: "TIMELINE", value: project.timeline },
    { label: "STATUS", value: PROJECT_STATUS_LABELS[project.status] ?? project.status },
    { label: "STACK", value: project.techStack?.join(", ") },
  ].filter((f) => f.value);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans text-zinc-100">
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between text-xs font-mono tracking-widest uppercase text-zinc-500">
        <Link href={`/${handle}/projects`} className="hover:text-white inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="h-3 w-3" />
          <span>INDEX / WORKS</span>
        </Link>
        <span>PROJECT // {project.slug}</span>
      </div>

      <header className="space-y-6">
        <h1 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-white border-b border-zinc-800 pb-6">
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">{project.summary}</p>
      </header>

      {facts.length > 0 && (
        <dl className="grid grid-cols-2 sm:grid-cols-4 border border-zinc-800 divide-x divide-zinc-800">
          {facts.map((f) => (
            <div key={f.label} className="p-4 space-y-1.5">
              <dt className="text-[10px] font-mono tracking-widest text-zinc-500">{f.label}</dt>
              <dd className="text-sm text-white font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {project.coverImageUrl && (
        <img src={project.coverImageUrl} alt="" className="w-full aspect-[21/9] object-cover border border-zinc-800 grayscale hover:grayscale-0 transition-all" />
      )}

      {project.highlights && project.highlights.length > 0 && (
        <section className="border border-zinc-800 p-8 space-y-6">
          <div className="text-xs font-mono tracking-widest uppercase text-zinc-500 border-b border-zinc-800 pb-3">
            OUTCOMES // KEY RESULTS
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {project.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm text-zinc-300 font-light">
                <span className="font-mono text-zinc-500 text-xs shrink-0 pt-0.5">[{String(idx + 1).padStart(2, "0")}]</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.description && (
        <section className="space-y-4">
          <div className="text-xs font-mono tracking-widest uppercase text-zinc-500">PROCESS &amp; EXECUTION</div>
          <RichContentDisplay content={project.description} className="text-base text-zinc-300 font-light leading-relaxed" />
        </section>
      )}

      <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-wider">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="border border-white px-5 py-2.5 text-white hover:bg-white hover:text-black transition-all font-bold inline-flex items-center gap-1.5">
              <span>LIVE</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="border border-zinc-700 px-5 py-2.5 text-zinc-300 hover:border-white hover:text-white transition-all font-bold inline-flex items-center gap-1.5">
              <span>SOURCE</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        <Link
          href={`/${handle}/contact?subject=${encodeURIComponent(`Project: ${project.title}`)}`}
          className="border border-white px-8 py-3.5 text-sm font-mono uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all font-bold inline-flex items-center gap-2"
        >
          <span>CONTACT {portfolio.name.split(" ")[0].toUpperCase()}</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
