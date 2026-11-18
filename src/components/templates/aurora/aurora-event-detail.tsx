import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, MapPin, Sparkles } from "lucide-react";

export function AuroraEventDetail({
  portfolio,
  event,
  handle,
}: {
  portfolio: PortfolioUser;
  event: NonNullable<PortfolioUser["events"][number]>;
  handle: string;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      {/* Background Aurora Flare */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(circle, var(--theme-accent) 0%, #6366f1 50%, transparent 80%)`,
        }}
      />

      {/* Return to Events */}
      <div className="relative z-10">
        <Link
          href={`/${handle}/events`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-full bg-zinc-900/40 border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Appearances Schedule</span>
        </Link>
      </div>

      {/* Frosted Detail Container */}
      <div className="rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden relative z-10">
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
          }}
        />

        <div className="p-8 sm:p-12 space-y-8">
          <div className="space-y-4 border-b border-white/10 pb-6">
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
                <span>{event.location}</span>
              </div>
            )}
          </div>

          {event.description && (
            <div className="space-y-3">
              <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Session Abstract &amp; Key Takeaways
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          )}

          {/* Registration Colophon */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-white text-base">Attend This Masterclass</div>
              <p className="text-xs text-zinc-400">Direct external conference registration.</p>
            </div>

            {event.eventUrl ? (
              <a
                href={event.eventUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full font-bold text-xs text-black transition-all hover:scale-105 shadow-lg flex items-center gap-2"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                <span>Access Registration Portal</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <Link
                href={`/${handle}/contact?subject=${encodeURIComponent(`Keynote Inquiry: ${event.title}`)}`}
                className="px-6 py-3.5 rounded-full font-bold text-xs text-black transition-all hover:scale-105 shadow-lg flex items-center gap-2"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                <span>Inquire About Event</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
