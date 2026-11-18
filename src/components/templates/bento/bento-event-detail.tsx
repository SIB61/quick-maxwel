import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, MapPin, Radio } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function BentoEventDetail({
  portfolio,
  event,
  handle,
}: {
  portfolio: PortfolioUser;
  event: NonNullable<PortfolioUser["events"][number]>;
  handle: string;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-zinc-100">
      {/* Return to Events */}
      <div>
        <Link
          href={`/${handle}/events`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Events Grid</span>
        </Link>
      </div>

      {/* Bento Layout Grid for Event */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Event Session Card (Spans 2 cols) */}
        <div className="lg:col-span-2 rounded-3xl p-8 sm:p-10 bg-zinc-900/60 border border-zinc-800/80 shadow-2xl space-y-8">
          <header className="space-y-4 border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-3">
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

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
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
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                Session Abstract &amp; Agenda
              </h2>
              <RichContentDisplay
                content={event.description}
                className="text-base text-zinc-200 leading-relaxed font-light"
              />
            </div>
          )}
        </div>

        {/* Side Bento Tiles (1 col) */}
        <div className="space-y-4">
          {/* Action / Registration Tile */}
          <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 space-y-4 shadow-md">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Registration
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Register for this keynote or symposium directly through the external event portal.
            </p>

            {event.eventUrl ? (
              <a
                href={event.eventUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl font-bold text-xs text-black transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-sm"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                <span>Access Registration</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : (
              <Link
                href={`/${handle}/contact?subject=${encodeURIComponent(`Keynote Inquiry: ${event.title}`)}`}
                className="w-full py-3 rounded-xl font-bold text-xs text-black transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-sm"
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
