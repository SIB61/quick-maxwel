import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export function FancyServices({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 relative text-zinc-100">
      {/* Background Flare */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)" }}
      />

      {/* Header Panel */}
      <div className="p-8 sm:p-10 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl space-y-4 relative overflow-hidden">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Creative Overview</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950/60 border border-zinc-800 text-xs font-semibold">
              <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: "var(--theme-accent)" }} />
              <span className="text-zinc-300">Engineering Offerings</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Services &amp; Advisory
            </h1>
          </div>

          <span className="text-xs font-mono text-zinc-400 bg-zinc-950/60 px-3.5 py-1.5 rounded-full border border-zinc-800">
            {portfolio.services.length} Packages
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-300 font-light max-w-2xl leading-relaxed">
          High-touch technical consulting, systems architecture reviews, and engineering leadership.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {portfolio.services.map((service) => (
          <div
            key={service.id}
            className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-600/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all space-y-6 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  {service.pricingType}
                </span>

                {service.price && (
                  <span
                    className="px-3.5 py-1 rounded-full text-xs font-bold border"
                    style={{
                      borderColor: "var(--theme-accent)",
                      color: "var(--theme-accent)",
                      backgroundColor: "rgba(0,0,0,0.4)",
                    }}
                  >
                    {service.price}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[var(--theme-accent)] transition-colors">
                <Link href={`/${handle}/services/${service.slug}`}>
                  {service.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                {service.shortDescription}
              </p>

              {service.deliverables && service.deliverables.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-zinc-800/60">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    Included Deliverables:
                  </span>
                  <div className="space-y-1.5">
                    {service.deliverables.slice(0, 3).map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-zinc-300 font-light">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: "var(--theme-accent)" }} />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-zinc-800/60 flex items-center justify-between">
              <Link
                href={`/${handle}/services/${service.slug}`}
                className="text-xs font-semibold hover:underline flex items-center gap-1 transition-colors"
                style={{ color: "var(--theme-accent)" }}
              >
                <span>Full Specification</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <Link
                href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
                className="px-4 py-2 rounded-full text-xs font-bold text-black transition-all hover:opacity-90 shadow-md"
                style={{ backgroundColor: "var(--theme-accent)" }}
              >
                Inquire Service
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
