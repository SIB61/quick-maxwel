import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, MapPin, Sparkles } from "lucide-react";

export function FancyEventDetail({
  portfolio,
  event,
  handle,
}: {
  portfolio: PortfolioUser;
  event: NonNullable<PortfolioUser["events"][number]>;
  handle: string;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 relative text-zinc-100">
      {/* Background Flare */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)" }}
      />

      {/* Return to Events */}
      <div className="relative z-10">
        <Link
          href={`/${handle}/events`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Events</span>
        </Link>
      </div>

      {/* Detail Container */}
      <div className="rounded-3xl p-8 sm:p-12 bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl relative z-10 space-y-8">
        <header className="space-y-4 border-b border-zinc-800 pb-6">
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

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {event.title}
          </h1>

          {event.location && (
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <MapPin className="h-4 w-4" style={{ color: "var(--theme-accent)" }} />
              <span>Venue: {event.location}</span>
            </div>
          )}
        </header>

        {event.description && (
          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Session Abstract &amp; Details
            </h2>
            <p className="text-base sm:text-lg text-zinc-200 font-light leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        )}

        {/* Action Registration */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-bold text-white text-base">Attend This Event</div>
            <p className="text-xs text-zinc-400">Access the official conference portal.</p>
          </div>

          {event.eventUrl ? (
            <a
              href={event.eventUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full font-bold text-xs text-black transition-all hover:opacity-90 shadow-lg flex items-center gap-2"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <span>Access Event Page</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : (
            <Link
              href={`/${handle}/contact?subject=${encodeURIComponent(`Keynote Inquiry: ${event.title}`)}`}
              className="px-6 py-3.5 rounded-full font-bold text-xs text-black transition-all hover:opacity-90 shadow-lg flex items-center gap-2"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <span>Inquire About Event</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
