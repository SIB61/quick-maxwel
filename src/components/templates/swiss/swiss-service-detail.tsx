import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function SwissServiceDetail({
  portfolio,
  service,
  handle,
}: {
  portfolio: PortfolioUser;
  service: NonNullable<PortfolioUser["services"][number]>;
  handle: string;
}) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans text-zinc-100">
      {/* Return Navigation */}
      <div className="border-b border-zinc-800 pb-4 flex items-center justify-between text-xs font-mono tracking-widest uppercase text-zinc-500">
        <Link
          href={`/${handle}/services`}
          className="hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>INDEX / DISCIPLINES</span>
        </Link>
        <span>SPECIFICATION // {service.slug}</span>
      </div>

      {/* Headline & Price */}
      <header className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-zinc-800 pb-6">
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            {service.title}
          </h1>

          {service.price && (
            <div
              className="text-lg font-mono font-bold uppercase tracking-wider border border-white px-4 py-2 shrink-0"
              style={{ color: "var(--theme-accent)" }}
            >
              {service.price}
            </div>
          )}
        </div>

        <p className="text-lg sm:text-xl text-zinc-300 font-light leading-relaxed">
          {service.shortDescription}
        </p>
      </header>

      {/* Deliverables Matrix */}
      {service.deliverables && service.deliverables.length > 0 && (
        <section className="border border-zinc-800 p-8 space-y-6">
          <div className="text-xs font-mono tracking-widest uppercase text-zinc-500 border-b border-zinc-800 pb-3">
            DELIVERABLES MATRIX // SCOPE DEFINITION
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {service.deliverables.map((item, idx) => (
              <div key={item} className="flex items-start gap-3 text-sm text-zinc-300 font-light">
                <span className="font-mono text-zinc-500 text-xs shrink-0 pt-0.5">
                  [{String(idx + 1).padStart(2, "0")}]
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Scope and Methodology */}
      {service.fullDescription && (
        <section className="space-y-4">
          <div className="text-xs font-mono tracking-widest uppercase text-zinc-500">
            METHODOLOGY &amp; EXECUTION ARCHITECTURE
          </div>
          <p className="text-base text-zinc-300 font-light leading-relaxed whitespace-pre-wrap">
            {service.fullDescription}
          </p>
        </section>
      )}

      {/* Action Dispatch */}
      <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-sm font-bold text-white uppercase tracking-wider">
            INITIATE ENGAGEMENT DISPATCH
          </div>
          <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            DIRECT TRANSMISSION TO {portfolio.name.toUpperCase()}
          </p>
        </div>

        <Link
          href={`/${handle}/contact?subject=${encodeURIComponent(`Engagement: ${service.title}`)}`}
          className="border border-white px-8 py-3.5 text-sm font-mono uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-all font-bold inline-flex items-center gap-2"
        >
          <span>TRANSMIT PROPOSAL</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
