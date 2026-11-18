import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, MapPin, Sparkles } from "lucide-react";

export function FancyEvents({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
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
              <span className="text-zinc-300">Public Speaking</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Events &amp; Keynotes
            </h1>
          </div>

          <span className="text-xs font-mono text-zinc-400 bg-zinc-950/60 px-3.5 py-1.5 rounded-full border border-zinc-800">
            {portfolio.events.length} Appearances
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl leading-relaxed">
          Conference keynotes, distributed systems panels, and public workshops.
        </p>
      </div>

      {/* Events List */}
      <div className="space-y-6 relative z-10">
        {portfolio.events.map((event) => (
          <div
            key={event.id}
            className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-600/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all space-y-6 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="px-3.5 py-1 rounded-full text-xs font-bold border"
                  style={{
                    borderColor: "var(--theme-accent)",
                    color: "var(--theme-accent)",
                    backgroundColor: "rgba(0,0,0,0.4)",
                  }}
                >
                  {event.eventType}
                </span>

                <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                  <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{event.date}</span>
                </div>
              </div>

              {event.location && (
                <div className="flex items-center gap-1.5 text-xs text-zinc-300 px-3 py-1 rounded-full bg-zinc-950/60 border border-zinc-800">
                  <MapPin className="h-3 w-3 text-zinc-500" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[var(--theme-accent)] transition-colors">
              <Link href={`/${handle}/events/${event.slug}`}>
                {event.title}
              </Link>
            </h2>

            {event.description && (
              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-4xl">
                {event.description}
              </p>
            )}

            <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
              <Link
                href={`/${handle}/events/${event.slug}`}
                className="text-xs font-semibold hover:underline flex items-center gap-1 transition-colors"
                style={{ color: "var(--theme-accent)" }}
              >
                <span>Session Abstract</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {event.eventUrl && (
                <a
                  href={event.eventUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-200 bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700/60 transition-all flex items-center gap-1.5"
                >
                  <span>Registration Portal</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
