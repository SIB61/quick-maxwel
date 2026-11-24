import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export function BentoServices({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-zinc-100">
      {/* Top Header Bento Tile */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <Link
            href={`/${handle}`}
            className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Bento Overview</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center text-black font-bold"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <Sparkles className="h-4 w-4" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Services &amp; Packages
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-300">
            {portfolio.services.length} Active Services
          </span>
        </div>
      </div>

      {/* Bento Services Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolio.services.map((service) => (
          <div
            key={service.id}
            className="rounded-3xl p-7 sm:p-8 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-all shadow-xl flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {service.pricingType}
                </span>

                {service.price && (
                  <span
                    className="px-3 py-1 rounded-xl text-xs font-bold font-mono border"
                    style={{
                      borderColor: "var(--theme-accent)",
                      color: "var(--theme-accent)",
                      backgroundColor: "var(--badge-backdrop)",
                    }}
                  >
                    {service.price}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-white group-hover:underline leading-snug">
                <Link href={`/${handle}/services/${service.slug}`}>
                  {service.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {service.shortDescription}
              </p>

              {service.deliverables && service.deliverables.length > 0 && (
                <div className="space-y-2 pt-3 border-t border-zinc-800/60">
                  <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    Deliverables:
                  </span>
                  <div className="space-y-1.5">
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--theme-accent)" }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
              <Link
                href={`/${handle}/services/${service.slug}`}
                className="text-xs font-bold hover:underline flex items-center gap-1"
                style={{ color: "var(--theme-accent)" }}
              >
                <span>View Full Specs</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <Link
                href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black transition-all hover:opacity-90 shadow-sm"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                Book Service
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
