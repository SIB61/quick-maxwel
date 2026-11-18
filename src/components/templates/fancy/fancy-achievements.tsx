import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Award, Sparkles } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function FancyAchievements({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      {/* Background Flare */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)" }}
      />

      {/* Header Panel */}
      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl space-y-4 relative overflow-hidden">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Creative Overview</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-zinc-800 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: "var(--theme-accent)" }} />
              <span className="text-zinc-300">Verified Accolades</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Achievements &amp; Honors
            </h1>
          </div>

          <span className="text-xs font-mono text-zinc-400 bg-zinc-950/60 px-3.5 py-1.5 rounded-full border border-zinc-800">
            {portfolio.achievements.length} Honors
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl leading-relaxed">
          Industry recognitions, technology distinctions, certified credentials, and leadership awards.
        </p>
      </div>

      {/* Accolades Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {portfolio.achievements.map((item) => (
          <div
            key={item.id}
            className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-600/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all space-y-6 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300 uppercase tracking-wider text-[11px]">
                  {item.issuer}
                </span>
                <span className="font-mono text-zinc-500">{item.issueDate}</span>
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[var(--theme-accent)] transition-colors">
                {item.title}
              </h2>

              {item.description && (
                <RichContentDisplay
                  content={item.description}
                  className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed"
                />
              )}
            </div>

            {item.credentialUrl && (
              <div className="pt-4 border-t border-zinc-800/60">
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold hover:underline inline-flex items-center gap-1.5 transition-colors"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <span>View Official Verification</span>
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
