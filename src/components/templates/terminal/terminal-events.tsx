import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Calendar, ExternalLink, MapPin } from "lucide-react";

export function TerminalEvents({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 font-mono text-xs sm:text-sm px-4 py-8">
      {/* Breadcrumb command */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={`/${handle}`} className="hover:text-zinc-100 flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>cd ..</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-200">crontab -l (speaking &amp; events)</span>
      </div>

      {/* Terminal Window Box */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        <div className="h-9 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-400 text-xs">daemon: crontab -l (calendar scheduler)</span>
          </div>
          <span className="text-zinc-500 text-[11px]">{portfolio.events.length} cron jobs scheduled</span>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="text-zinc-400 border-b border-zinc-800/80 pb-2 flex items-center gap-2">
            <span style={{ color: "var(--theme-accent)" }}>user@{handle}:~$</span>
            <span className="text-zinc-200">systemctl list-timers --type=event</span>
          </div>

          <div className="space-y-3">
            {portfolio.events.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-lg border border-zinc-800/80 bg-zinc-900/30 space-y-2 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-emerald-400 font-bold text-[11px] shrink-0">
                      [CRON]
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] uppercase font-bold border border-zinc-700">
                      {event.eventType}
                    </span>
                    <h2 className="font-bold text-zinc-100 text-sm hover:text-emerald-400 transition-colors">
                      <Link href={`/${handle}/events/${event.slug}`}>
                        {event.title}
                      </Link>
                    </h2>
                  </div>

                  <span className="text-zinc-500 text-xs shrink-0 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {event.date}
                  </span>
                </div>

                {event.location && (
                  <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                    <MapPin className="h-3 w-3 text-zinc-500" />
                    <span>{event.location}</span>
                  </div>
                )}

                {event.description && (
                  <p className="text-xs text-zinc-400 leading-relaxed pt-1 line-clamp-2">
                    # {event.description}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between text-xs">
                  <Link
                    href={`/${handle}/events/${event.slug}`}
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>view session logs</span>
                    <span>→</span>
                  </Link>

                  {event.eventUrl && (
                    <a
                      href={event.eventUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1 text-[11px]"
                    >
                      <span>curl registration</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 text-zinc-500 text-[11px] flex items-center justify-between">
            <span>Daemon status: ACTIVE / RUNNING</span>
            <span className="text-emerald-400 font-bold">[ONLINE]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
