import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function SwissEventDetail({
  portfolio,
  event,
  handle,
}: {
  portfolio: PortfolioUser;
  event: NonNullable<PortfolioUser["events"][number]>;
  handle: string;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans text-zinc-100">
      {/* Return Navigation */}
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between text-xs font-mono tracking-widest uppercase text-zinc-500">
        <Link
          href={`/${handle}/events`}
          className="hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>INDEX / ENGAGEMENTS</span>
        </Link>
        <span>DESCRIPTOR // {event.slug}</span>
      </div>

      {/* Header */}
      <header className="space-y-6">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <span className="font-bold text-white border border-zinc-800 px-2 py-0.5">
            {event.eventType}
          </span>
          <span>//</span>
          <span>{event.date}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
          {event.title}
        </h1>

        {event.location && (
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-zinc-400">
            <MapPin className="h-4 w-4 text-zinc-500" />
            <span>VENUE: {event.location}</span>
          </div>
        )}
      </header>

      {/* Abstract */}
      {event.description && (
        <section className="border-t border-b border-zinc-800 py-10 space-y-4">
          <div className="text-xs font-mono tracking-widest uppercase text-zinc-500">
            SESSION ABSTRACT &amp; SYLLABUS
          </div>
          <RichContentDisplay
            content={event.description}
            className="text-base sm:text-lg text-zinc-200 font-light leading-relaxed"
          />
        </section>
      )}

      {/* Action Colophon */}
      <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-sm font-bold text-white uppercase tracking-wider">
            CONFERENCE REGISTRATION
          </div>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            OFFICIAL EXTERNAL HOST DIRECTORY
          </p>
        </div>

        {event.eventUrl ? (
          <a
            href={event.eventUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-white px-8 py-3.5 text-sm font-mono uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all font-bold inline-flex items-center gap-2"
          >
            <span>ACCESS REGISTRATION</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <Link
            href={`/${handle}/contact?subject=${encodeURIComponent(`Keynote Inquiry: ${event.title}`)}`}
            className="border border-white px-8 py-3.5 text-sm font-mono uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all font-bold inline-flex items-center gap-2"
          >
            <span>INQUIRE ABOUT SESSION</span>
          </Link>
        )}
      </div>
    </div>
  );
}
