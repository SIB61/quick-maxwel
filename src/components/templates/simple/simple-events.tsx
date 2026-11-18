import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, MapPin, Mic } from "lucide-react";
import Link from "next/link";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function SimpleEvents({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-sans text-zinc-100">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Resume Overview</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <Mic className="h-7 w-7" style={{ color: "var(--theme-accent)" }} />
          <span>Events, Keynotes &amp; Speaking</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
          Technical keynotes, conference talks, podcast discussions, and architecture workshops by {portfolio.name}.
        </p>
      </div>

      {/* Structured Events Chronology */}
      <div className="space-y-4">
        {portfolio.events.map((event) => (
          <Card
            key={event.id}
            className="bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all p-6 sm:p-7 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6 group"
          >
            <div className="space-y-3 max-w-xl">
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

              <h2 className="font-bold text-xl text-white group-hover:text-[var(--theme-accent)] transition-colors">
                {event.title}
              </h2>

              {event.description && (
                <RichContentDisplay
                  content={event.description}
                  className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-2"
                />
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
              <Link
                href={`/${handle}/events/${event.slug}`}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-750 text-zinc-200 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Session Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
