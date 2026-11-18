import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, MapPin, Radio } from "lucide-react";

export function BentoEvents({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
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
              <Radio className="h-4 w-4" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Events &amp; Speaking
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300">
            {portfolio.events.length} Scheduled Sessions
          </span>
        </div>
      </div>

      {/* Bento Events Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolio.events.map((event) => (
          <div
            key={event.id}
            className="rounded-3xl p-7 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-xl flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span
                  className="px-3 py-1 rounded-xl text-xs font-bold border"
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

              <h2 className="text-2xl font-bold text-white group-hover:underline leading-snug">
                <Link href={`/${handle}/events/${event.slug}`}>
                  {event.title}
                </Link>
              </h2>

              {event.location && (
                <div className="flex items-center gap-1.5 text-xs text-zinc-300">
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                  <span>{event.location}</span>
                </div>
              )}

              {event.description && (
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                  {event.description}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
              <Link
                href={`/${handle}/events/${event.slug}`}
                className="text-xs font-bold hover:underline flex items-center gap-1"
                style={{ color: "var(--theme-accent)" }}
              >
                <span>Session Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {event.eventUrl && (
                <a
                  href={event.eventUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-750 transition-colors flex items-center gap-1.5"
                >
                  <span>Register</span>
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
