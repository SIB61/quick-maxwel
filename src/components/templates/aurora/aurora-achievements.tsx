import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Award, Sparkles } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function AuroraAchievements({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      {/* Ambient Aurora Flare */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(circle, var(--theme-accent) 0%, #ec4899 50%, transparent 80%)`,
        }}
      />

      {/* Header Panel */}
      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-4 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
          }}
        />

        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Studio Overview</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-white/10 text-xs text-zinc-300">
              <Sparkles className="h-3 w-3" style={{ color: "var(--theme-accent)" }} />
              <span>Studio Accolades</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Honors &amp; Recognitions
            </h1>
          </div>

          <span className="text-xs font-mono text-zinc-400 bg-zinc-950/40 px-3 py-1.5 rounded-full border border-white/5">
            {portfolio.achievements.length} Accolades
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl leading-relaxed">
          Industry distinctions, algorithmic innovations, peer honors, and verified technical credentials.
        </p>
      </div>

      {/* Accolades Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {portfolio.achievements.map((item) => (
          <div
            key={item.id}
            className="p-8 rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all space-y-6 flex flex-col justify-between group relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
              }}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span className="font-semibold text-zinc-300 uppercase tracking-wider text-[11px]">
                  {item.issuer}
                </span>
                <span className="font-mono text-zinc-500">{item.issueDate}</span>
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
                {item.title}
              </h2>

              {item.description && (
                <RichContentDisplay
                  content={item.description}
                  className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed"
                />
              )}
            </div>

            {item.credentialUrl && (
              <div className="pt-4 border-t border-white/5">
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold hover:underline inline-flex items-center gap-1.5 transition-colors"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <span>Inspect Verification Record</span>
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
