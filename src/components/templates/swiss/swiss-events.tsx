import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";

export function SwissEvents({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 font-sans text-zinc-100">
      {/* Swiss Index Header */}
      <div className="space-y-4 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs font-mono tracking-widest uppercase text-zinc-500 hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>RETURN TO OVERVIEW</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">
            ENGAGEMENTS &amp; SESSIONS
          </h1>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {portfolio.events.length} CONFERENCES &amp; KEYNOTES
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          Public keynotes, conference workshops, distributed systems symposia, and architectural lectures.
        </p>
      </div>

      {/* Timetable Format */}
      <div className="divide-y divide-zinc-800">
        {portfolio.events.map((event, idx) => {
          const num = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={event.id}
              className="py-8 sm:py-10 space-y-4 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-4 sm:gap-6 flex-1">
                  <span
                    className="font-mono text-xl sm:text-2xl font-bold shrink-0"
                    style={{ color: "var(--theme-accent)" }}
                  >
                    {`TIMETABLE // ${num}`}
                  </span>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
                      <span>{event.eventType}</span>
                      <span>//</span>
                      <span>{event.date}</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white group-hover:opacity-80 transition-opacity">
                      <Link href={`/${handle}/events/${event.slug}`}>
                        {event.title}
                      </Link>
                    </h2>

                    {event.location && (
                      <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-400">
                        <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                        <span>{event.location}</span>
                      </div>
                    )}

                    {event.description && (
                      <p className="text-sm text-zinc-400 font-light leading-relaxed max-w-3xl pt-1 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0 pt-2 sm:pt-0">
                  <Link
                    href={`/${handle}/events/${event.slug}`}
                    className="text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>SESSION DESCRIPTOR</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>

                  {event.eventUrl && (
                    <a
                      href={event.eventUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-zinc-700 px-3 py-1 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:border-white hover:text-white transition-all"
                    >
                      REGISTER
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
