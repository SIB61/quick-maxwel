import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

export function SimpleServices({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
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
          <Sparkles className="h-7 w-7" style={{ color: "var(--theme-accent)" }} />
          <span>Professional Services &amp; Advisory</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
          Available engagements, engineering advisory, distributed systems design, and technical consulting packages offered by {portfolio.name}.
        </p>
      </div>

      {/* Structured Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolio.services.map((service) => (
          <Card
            key={service.id}
            className="bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all p-6 sm:p-7 flex flex-col justify-between space-y-6 rounded-2xl shadow-md group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {service.pricingType}
                </span>

                {service.price && (
                  <Badge
                    variant="outline"
                    className="font-mono text-xs px-2.5 py-0.5"
                    style={{ borderColor: "var(--theme-accent)", color: "var(--theme-accent)" }}
                  >
                    {service.price}
                  </Badge>
                )}
              </div>

              <div>
                <h2 className="font-bold text-xl text-white group-hover:text-[var(--theme-accent)] transition-colors">
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-2">
                  {service.shortDescription}
                </p>
              </div>

              {service.deliverables && service.deliverables.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-zinc-800/60">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                    Core Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2
                          className="h-3.5 w-3.5 mt-0.5 shrink-0"
                          style={{ color: "var(--theme-accent)" }}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between gap-2 text-xs">
              <Link
                href={`/${handle}/services/${service.slug}`}
                className="font-medium text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>View Details</span>
                <ArrowRight className="h-3 w-3" />
              </Link>

              <Link
                href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
                className="font-semibold px-3 py-1.5 rounded-lg text-black transition-opacity hover:opacity-90"
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
