import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { RichContentDisplay } from "@/components/ui/rich-content-display";

export function FancyServiceDetail({
  portfolio,
  service,
  handle,
}: {
  portfolio: PortfolioUser;
  service: NonNullable<PortfolioUser["services"][number]>;
  handle: string;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 relative text-zinc-100">
      {/* Background Flare */}
      <div
        className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, var(--theme-accent) 0%, transparent 70%)" }}
      />

      {/* Return to Services */}
      <div className="relative z-10">
        <Link
          href={`/${handle}/services`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Services</span>
        </Link>
      </div>

      {/* Detail Container */}
      <div className="rounded-3xl p-8 sm:p-12 bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl shadow-2xl relative z-10 space-y-8">
        <header className="space-y-4 border-b border-zinc-800 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              {service.title}
            </h1>

            {service.price && (
              <div
                className="px-5 py-2.5 rounded-full text-sm font-bold border shrink-0"
                style={{
                  borderColor: "var(--theme-accent)",
                  color: "var(--theme-accent)",
                  backgroundColor: "var(--badge-backdrop)",
                }}
              >
                {service.price}
              </div>
            )}
          </div>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            {service.shortDescription}
          </p>
        </header>

        {/* Deliverables */}
        {service.deliverables && service.deliverables.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800 space-y-4">
            <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Included Deliverables &amp; Outcomes:
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
              Methodology &amp; Scope
            </h2>
            <RichContentDisplay
              content={service.fullDescription}
              className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed"
            />
          </div>
        )}

        {/* Action CTA */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-bold text-white text-base">Book Engagement</div>
            <p className="text-xs text-zinc-400">Direct consultation inquiry to {portfolio.name}.</p>
          </div>

          <Link
            href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
            className="px-6 py-3.5 rounded-full font-bold text-xs text-black transition-all hover:opacity-90 shadow-lg flex items-center gap-2"
            style={{ backgroundColor: "var(--theme-accent)" }}
          >
            <Mail className="h-4 w-4" />
            <span>Inquire This Package</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
