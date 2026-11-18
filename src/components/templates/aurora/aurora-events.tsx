import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, MapPin, Sparkles } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function AuroraEvents({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      {/* Ambient Aurora Flare */}
      <div
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(circle, var(--theme-accent) 0%, #6366f1 50%, transparent 80%)`,
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
              <span>Studio Appearances</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Speaking &amp; Masterclasses
            </h1>
          </div>

          <span className="text-xs font-mono text-zinc-400 bg-zinc-950/40 px-3 py-1.5 rounded-full border border-white/5">
            {portfolio.events.length} Upcoming &amp; Keynotes
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl leading-relaxed">
          Keynotes, system architecture symposia, conference workshops, and invited technical panels.
        </p>
      </div>

      {/* Frosted Schedule Tiles */}
      <div className="space-y-6 relative z-10">
        {portfolio.events.map((event) => (
          <div
            key={event.id}
            className="p-8 rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all space-y-6 group relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
              }}
            />

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
                <div className="flex items-center gap-1.5 text-xs text-zinc-300 px-3 py-1 rounded-full bg-zinc-950/60 border border-white/5">
                  <MapPin className="h-3 w-3 text-zinc-500" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>

            <h2 className="text-2xl font-bold text-white tracking-tight leading-snug hover:opacity-90 transition-opacity">
              <Link href={`/${handle}/events/${event.slug}`}>
                {event.title}
              </Link>
            </h2>

            {event.description && (
              <RichContentDisplay
                content={event.description}
                className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-4xl"
              />
            )}

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
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
                  className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-1.5"
                >
                  <span>Register for Event</span>
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
