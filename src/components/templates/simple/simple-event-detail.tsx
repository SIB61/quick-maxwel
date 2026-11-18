import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, ExternalLink, MapPin, Mic } from "lucide-react";
import Link from "next/link";

export function SimpleEventDetail({
  portfolio,
  event,
  handle,
}: {
  portfolio: PortfolioUser;
  event: NonNullable<PortfolioUser["events"][number]>;
  handle: string;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10 font-sans text-zinc-100">
      {/* Back button */}
      <div>
        <Link
          href={`/${handle}/events`}
          className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Events</span>
        </Link>
      </div>

      {/* Main Event Card */}
      <div className="p-8 sm:p-10 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 shadow-lg space-y-8">
        <header className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 text-xs">
              {event.eventType}
            </Badge>
            <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
              <Calendar className="h-3.5 w-3.5 text-zinc-500" />
              {event.date}
            </span>
            {event.location && (
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                {event.location}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {event.title}
          </h1>
        </header>

        {/* Abstract / Description */}
        {event.description && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Session Abstract &amp; Details
            </h2>
            <div className="text-sm sm:text-base text-zinc-200 leading-relaxed whitespace-pre-wrap">
              {event.description}
            </div>
          </div>
        )}

        {/* Action Link / External Website */}
        {event.eventUrl && (
          <div className="pt-4 border-t border-zinc-800/60">
            <a
              href={event.eventUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-black hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <span>Visit Event Registration / Website</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

        {/* Speaker Profile Footer */}
        <div className="pt-8 border-t border-zinc-800 flex items-center gap-4">
          {portfolio.avatarUrl && (
            <img
              src={portfolio.avatarUrl}
              alt={portfolio.name}
              className="h-12 w-12 rounded-full object-cover border border-zinc-700"
            />
          )}
          <div>
            <div className="text-sm font-bold text-white">{portfolio.name}</div>
            <div className="text-xs text-zinc-400">{portfolio.headline}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
