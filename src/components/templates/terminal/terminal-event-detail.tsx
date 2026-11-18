import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, MapPin, Terminal as TerminalIcon } from "lucide-react";

export function TerminalEventDetail({
  portfolio,
  event,
  handle,
}: {
  portfolio: PortfolioUser;
  event: NonNullable<PortfolioUser["events"][number]>;
  handle: string;
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 font-mono text-xs sm:text-sm px-4 py-8">
      {/* Return to events list */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={`/${handle}/events`} className="hover:text-zinc-100 flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>cd .. (back to calendar)</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-200">journalctl -u {event.slug}.service</span>
      </div>

      {/* Terminal Window Box */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        <div className="h-9 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-400 text-xs">sh: journalctl -u {event.slug} -f</span>
          </div>
          <span className="text-zinc-500 text-[11px]">EVENT DESCRIPTOR</span>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3 border-b border-zinc-800/80 pb-6">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-bold uppercase border border-zinc-700">
                {event.eventType}
              </span>
              <span className="text-zinc-500 text-xs">// {event.date}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
              {event.title}
            </h1>

            {event.location && (
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                <span>Venue: {event.location}</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
              /* SESSION_ABSTRACT */
            </span>
            <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </div>

          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-500">
              Host stream / conference portal
            </div>

            {event.eventUrl ? (
              <a
                href={event.eventUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl font-bold text-black transition-all hover:opacity-90 flex items-center gap-2"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                <span>Access Registration Portal</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : (
              <Link
                href={`/${handle}/contact?subject=${encodeURIComponent(`Event inquiry: ${event.title}`)}`}
                className="px-6 py-3 rounded-xl font-bold text-black transition-all hover:opacity-90 flex items-center gap-2"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                <span>Inquire About Keynote</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
