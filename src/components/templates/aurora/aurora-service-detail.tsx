import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, Sparkles } from "lucide-react";

export function AuroraServiceDetail({
  portfolio,
  service,
  handle,
}: {
  portfolio: PortfolioUser;
  service: NonNullable<PortfolioUser["services"][number]>;
  handle: string;
}) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 relative text-zinc-100">
      {/* Background Aurora Flare */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(circle, var(--theme-accent) 0%, #6366f1 50%, transparent 80%)`,
        }}
      />

      {/* Return to Services */}
      <div className="relative z-10">
        <Link
          href={`/${handle}/services`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-full bg-zinc-900/40 border border-white/10 backdrop-blur-md"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Capabilities Catalog</span>
        </Link>
      </div>

      {/* Frosted Detail Container */}
      <div className="rounded-3xl bg-zinc-900/30 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden relative z-10">
        <div
          className="h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, var(--theme-accent), transparent)`,
          }}
        />

        <div className="p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                Studio Capability Specification
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {service.title}
              </h1>
            </div>

            {service.price && (
              <div
                className="px-5 py-2.5 rounded-full text-sm font-bold border shrink-0"
                style={{
                  borderColor: "var(--theme-accent)",
                  color: "var(--theme-accent)",
                  backgroundColor: "rgba(0,0,0,0.5)",
                }}
              >
                {service.price}
              </div>
            )}
          </div>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            {service.shortDescription}
          </p>

          {/* Deliverables Checklist */}
          {service.deliverables && service.deliverables.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/40 border border-white/5 space-y-4">
              <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                Scope &amp; Included Deliverables:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-zinc-200 font-light">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--theme-accent)" }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Scope */}
          {service.fullDescription && (
            <div className="space-y-3 pt-2">
              <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                Engagement Scope &amp; Methodology
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed whitespace-pre-wrap">
                {service.fullDescription}
              </p>
            </div>
          )}

          {/* Action CTA Box */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="font-bold text-white text-base">Book This Capability</div>
              <p className="text-xs text-zinc-400">Direct booking inquiry to {portfolio.name}.</p>
            </div>

            <Link
              href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
              className="px-6 py-3.5 rounded-full font-bold text-xs text-black transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <Mail className="h-4 w-4" />
              <span>Inquire This Package</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
