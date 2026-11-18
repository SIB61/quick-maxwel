import { getPortfolioData } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ handle: string; slug: string }>;
}) {
  const { handle, slug } = await params;
  const portfolio = await getPortfolioData(handle);

  const event = portfolio.events.find((e) => e.slug === slug);
  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Link
        href={`/${handle}/events`}
        className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to all events</span>
      </Link>

      <header className="space-y-4 pb-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-rose-500/30 text-rose-400 text-xs">
            {event.eventType}
          </Badge>
          <span className="text-xs text-zinc-400 flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {event.date}
          </span>
          {event.location && (
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              • <MapPin className="h-3.5 w-3.5" />
              {event.location}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">
          {event.title}
        </h1>

        {event.eventUrl && (
          <div className="pt-1">
            <a
              href={event.eventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline inline-flex items-center gap-1.5 font-semibold"
              style={{ color: "var(--theme-accent)" }}
            >
              <span>Visit Event Website / Registration</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </header>

      {/* Description */}
      {event.description && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-100">About the Session</h2>
          <div className="text-zinc-300 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
            {event.description}
          </div>
        </section>
      )}
    </div>
  );
}
