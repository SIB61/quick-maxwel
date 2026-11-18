import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function SwissAchievements({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 font-sans text-zinc-100">
      {/* Swiss Index Header */}
      <div className="space-y-4 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs font-mono tracking-widest uppercase text-zinc-500 hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>RETURN TO OVERVIEW</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">
            HONORS &amp; CREDENTIALS
          </h1>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {portfolio.achievements.length} RECOGNITIONS
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          Industry honors, patents, institutional certifications, and architectural leadership citations.
        </p>
      </div>

      {/* Two-column Typographic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolio.achievements.map((item, idx) => {
          const num = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={item.id}
              className="border border-zinc-800 p-6 sm:p-8 space-y-4 hover:border-zinc-700 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest">
                  <span className="font-bold" style={{ color: "var(--theme-accent)" }}>
                    {`ACC // ${num}`}
                  </span>
                  <span className="text-zinc-500">{item.issueDate}</span>
                </div>

                <div className="text-xs font-mono tracking-wider uppercase text-zinc-400">
                  {item.issuer}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white">
                  {item.title}
                </h2>

                {item.description && (
                  <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              {item.credentialUrl && (
                <div className="pt-4 border-t border-zinc-800/80">
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono tracking-wider uppercase text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>INSPECT VERIFICATION</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
