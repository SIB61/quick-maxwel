import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Award } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function BentoAchievements({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-zinc-100">
      {/* Top Header Bento Tile */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Link
            href={`/${handle}`}
            className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Bento Overview</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center text-black font-bold"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <Award className="h-4 w-4" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Achievements &amp; Honors
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300">
            {portfolio.achievements.length} Verified Awards
          </span>
        </div>
      </div>

      {/* Bento Tiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolio.achievements.map((item) => (
          <div
            key={item.id}
            className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-md flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300 uppercase text-[11px]">
                  {item.issuer}
                </span>
                <span className="font-mono text-zinc-500">{item.issueDate}</span>
              </div>

              <h2 className="font-bold text-lg sm:text-xl text-white group-hover:underline leading-snug">
                {item.title}
              </h2>

              {item.description && (
                <RichContentDisplay
                  content={item.description}
                  className="text-xs text-zinc-300 leading-relaxed"
                />
              )}
            </div>

            {item.credentialUrl && (
              <div className="pt-3 border-t border-zinc-800/60">
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold hover:underline inline-flex items-center gap-1.5 transition-colors"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <span>Verify Credential</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
