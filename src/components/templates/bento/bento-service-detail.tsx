import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, Sparkles } from "lucide-react";

export function BentoServiceDetail({
  portfolio,
  service,
  handle,
}: {
  portfolio: PortfolioUser;
  service: NonNullable<PortfolioUser["services"][number]>;
  handle: string;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-zinc-100">
      {/* Return to Services */}
      <div>
        <Link
          href={`/${handle}/services`}
          className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1.5 transition-colors font-medium px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Services Grid</span>
        </Link>
      </div>

      {/* Bento Layout Grid for Service */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Service Spec Card (Spans 2 cols) */}
        <div className="lg:col-span-2 rounded-3xl p-8 sm:p-10 bg-zinc-900/60 border border-zinc-800/80 shadow-2xl space-y-8">
          <header className="space-y-4 border-b border-zinc-800 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {service.title}
              </h1>

              {service.price && (
                <div
                  className="px-4 py-2 rounded-xl text-sm font-bold font-mono border shrink-0"
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

            <p className="text-base text-zinc-300 leading-relaxed">
              {service.shortDescription}
            </p>
          </header>

          {/* Scope & Methodology */}
          {service.fullDescription && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider">
                Scope &amp; Methodology
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-wrap font-light">
                {service.fullDescription}
              </p>
            </div>
          )}
        </div>

        {/* Side Bento Tiles (1 col) */}
        <div className="space-y-4">
          {/* Deliverables Tile */}
          {service.deliverables && service.deliverables.length > 0 && (
            <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 space-y-4 shadow-md">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Included Deliverables
              </span>
              <div className="space-y-2">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-xs text-zinc-200">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "var(--theme-accent)" }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Book Tile */}
          <div className="rounded-3xl p-6 bg-zinc-900/60 border border-zinc-800/80 space-y-4 shadow-md">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Engagement Booking
            </span>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Ready to begin this consultation? Connect directly with {portfolio.name} to confirm requirements.
            </p>
            <Link
              href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
              className="w-full py-3 rounded-xl font-bold text-xs text-black transition-all hover:opacity-90 flex items-center justify-center gap-2 shadow-sm"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <Mail className="h-4 w-4" />
              <span>Inquire This Service</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
