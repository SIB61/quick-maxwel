import { getPortfolioData } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Calendar, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Overview</span>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-rose-400" />
          Speaking & Events
        </h1>
        <p className="text-sm text-zinc-400">
          Keynotes, hands-on technical workshops, and conference appearances by {portfolio.name}.
        </p>
      </div>

      <div className="space-y-4">
        {portfolio.events.map((evt) => (
          <Link key={evt.id} href={`/${handle}/events/${evt.slug}`}>
            <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-rose-500/30 text-rose-400 text-xs">
                      {evt.eventType}
                    </Badge>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {evt.date}
                    </span>
                    {evt.location && (
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        • <MapPin className="h-3 w-3" />
                        {evt.location}
                      </span>
                    )}
                  </div>
                  <h2 className="font-bold text-lg text-zinc-100 hover:text-emerald-400 transition-colors">
                    {evt.title}
                  </h2>
                  {evt.description && (
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  )}
                </div>

                <div className="flex items-center text-xs text-emerald-400 font-medium gap-1 shrink-0">
                  <span>View event</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
