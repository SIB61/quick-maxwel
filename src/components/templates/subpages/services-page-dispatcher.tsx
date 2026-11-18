import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalServices } from "../terminal/terminal-services";
import { SwissServices } from "../swiss/swiss-services";
import { AuroraServices } from "../aurora/aurora-services";
import { BentoServices } from "../bento/bento-services";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

export default function ServicesPageDispatcher({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalServices portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissServices portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraServices portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoServices portfolio={portfolio} handle={handle} />;
  }

  // Standard/Simple template fallback
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8 w-full">
      <div className="space-y-2">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Overview</span>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-2">
          <Sparkles className="h-6 w-6" style={{ color: "var(--theme-accent)" }} />
          Services &amp; Offerings
        </h1>
        <p className="text-sm text-zinc-400">
          Advisory, consulting packages, and technical execution offered by {portfolio.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolio.services.map((service) => (
          <Card
            key={service.id}
            className="bg-zinc-900/50 border-zinc-800 p-6 space-y-4 hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="border-zinc-700 text-zinc-300 capitalize text-xs">
                  {service.pricingType}
                </Badge>
                {service.price && (
                  <span className="font-mono text-sm font-bold text-zinc-200">
                    {service.price}
                  </span>
                )}
              </div>

              <h2 className="font-bold text-xl text-zinc-100">
                <Link href={`/${handle}/services/${service.slug}`} className="hover:text-emerald-400 transition-colors">
                  {service.title}
                </Link>
              </h2>

              <p className="text-xs text-zinc-400 leading-relaxed">
                {service.shortDescription}
              </p>

              {service.deliverables && service.deliverables.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Included:
                  </span>
                  {service.deliverables.slice(0, 3).map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--theme-accent)" }} />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-zinc-800/60">
              <Link
                href={`/${handle}/services/${service.slug}`}
                className="text-xs font-medium hover:underline flex items-center gap-1"
                style={{ color: "var(--theme-accent)" }}
              >
                <span>View Full Details</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

              <Link
                href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
                className="text-xs font-bold text-black px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                Book Service
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
