import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalEventDetail } from "../terminal/terminal-event-detail";
import { SwissEventDetail } from "../swiss/swiss-event-detail";
import { AuroraEventDetail } from "../aurora/aurora-event-detail";
import { BentoEventDetail } from "../bento/bento-event-detail";
import { FancyEventDetail } from "../fancy/fancy-event-detail";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";

export default function EventDetailPageDispatcher({
  portfolio,
  event,
  handle,
}: {
  portfolio: PortfolioUser;
  event: NonNullable<PortfolioUser["events"][number]>;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalEventDetail portfolio={portfolio} event={event} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissEventDetail portfolio={portfolio} event={event} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraEventDetail portfolio={portfolio} event={event} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoEventDetail portfolio={portfolio} event={event} handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyEventDetail portfolio={portfolio} event={event} handle={handle} />;
  }

  // Standard/Simple template fallback
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8 w-full">
      <Link
        href={`/${handle}/events`}
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to all events</span>
      </Link>

      <header className="space-y-4 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 capitalize text-xs">
            {event.eventType}
          </Badge>
          <span className="text-xs text-zinc-400 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {event.date}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
          {event.title}
        </h1>

        {event.location && (
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <MapPin className="h-3.5 w-3.5 text-zinc-500" />
            <span>{event.location}</span>
          </div>
        )}
      </header>

      {/* Description */}
      {event.description && (
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-zinc-300 uppercase tracking-wider">Session Abstract</h2>
          <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
            {event.description}
          </div>
        </section>
      )}

      {/* CTA Box */}
      <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-zinc-100 text-base">Attending this event?</h3>
          <p className="text-xs text-zinc-400">Register on the official site or get in touch beforehand.</p>
        </div>

        {event.eventUrl ? (
          <a
            href={event.eventUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-black transition-all hover:opacity-90 shrink-0 flex items-center gap-1.5 shadow-sm"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            <span>Official Event Page</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        ) : (
          <Link
            href={`/${handle}/contact?subject=${encodeURIComponent(`Event inquiry: ${event.title}`)}`}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-black transition-all hover:opacity-90 shrink-0 shadow-sm"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            Get in Touch
          </Link>
        )}
      </div>
    </div>
  );
}
