import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalEvents } from "../terminal/terminal-events";
import { SwissEvents } from "../swiss/swiss-events";
import { AuroraEvents } from "../aurora/aurora-events";
import { BentoEvents } from "../bento/bento-events";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";

export default function EventsPageDispatcher({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalEvents portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissEvents portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraEvents portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoEvents portfolio={portfolio} handle={handle} />;
  }

  // Standard/Simple template fallback
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8 w-full">
      <div className="space-y-2">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Overview</span>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-2">
          <Calendar className="h-6 w-6" style={{ color: "var(--theme-accent)" }} />
          Speaking &amp; Public Events
        </h1>
        <p className="text-sm text-zinc-400">
          Keynotes, conference workshops, webinars, and panel discussions featuring {portfolio.name}.
        </p>
      </div>

      <div className="space-y-4">
        {portfolio.events.map((event) => (
          <Card
            key={event.id}
            className="bg-zinc-900/50 border-zinc-800 p-6 space-y-3 hover:border-zinc-700 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 capitalize text-xs">
                  {event.eventType}
                </Badge>
                <h2 className="font-bold text-lg text-zinc-100 hover:text-emerald-400 transition-colors">
                  <Link href={`/${handle}/events/${event.slug}`}>
                    {event.title}
                  </Link>
                </h2>
              </div>

              <span className="text-xs text-zinc-400 shrink-0 font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {event.date}
              </span>
            </div>

            {event.location && (
              <div className="text-xs text-zinc-400 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                <span>{event.location}</span>
              </div>
            )}

            {event.description && (
              <p className="text-xs text-zinc-400 leading-relaxed">
                {event.description}
              </p>
            )}

            <div className="pt-2 flex items-center justify-between text-xs border-t border-zinc-800/60">
              <Link
                href={`/${handle}/events/${event.slug}`}
                className="font-medium hover:underline flex items-center gap-1"
                style={{ color: "var(--theme-accent)" }}
              >
                <span>View Event Details</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

              {event.eventUrl && (
                <a
                  href={event.eventUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white flex items-center gap-1"
                >
                  <span>Event Link</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
