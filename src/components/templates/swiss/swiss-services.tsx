import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";

export function SwissServices({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans text-zinc-100">
      {/* Swiss Index Header */}
      <div className="space-y-4 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs font-mono tracking-widest uppercase text-zinc-500 hover:text-white inline-flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>RETURN TO OVERVIEW</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter">
            DISCIPLINES &amp; OFFERINGS
          </h1>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            {portfolio.services.length} ACTIVE SPECIFICATIONS
          </span>
        </div>

        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-2xl leading-relaxed">
          Technical advisory, systems architecture audits, microservice infrastructure engineering, and staff leadership.
        </p>
      </div>

      {/* Architectural Specification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolio.services.map((service, idx) => {
          const specNum = String(idx + 1).padStart(2, "0");

          return (
            <div
              key={service.id}
              className="border border-zinc-800 p-6 sm:p-8 space-y-6 hover:border-zinc-700 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest">
                  <span className="font-bold" style={{ color: "var(--theme-accent)" }}>
                    {`SPEC // ${specNum}`}
                  </span>
                  {service.price && (
                    <span className="font-bold text-white border border-zinc-700 px-2 py-0.5">
                      {service.price}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold uppercase tracking-tight text-white hover:opacity-80 transition-opacity">
                  <Link href={`/${handle}/services/${service.slug}`}>
                    {service.title}
                  </Link>
                </h2>

                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {service.shortDescription}
                </p>

                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-zinc-800/80">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                      DELIVERABLES MANIFEST
                    </span>
                    <div className="space-y-1.5">
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-zinc-300 font-light">
                          <span style={{ color: "var(--theme-accent)" }} className="font-mono">
                            +
                          </span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono uppercase tracking-wider">
                <Link
                  href={`/${handle}/services/${service.slug}`}
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>FULL SPEC</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
                  className="border border-white px-3.5 py-1.5 text-white hover:bg-white hover:text-zinc-950 transition-all font-bold"
                >
                  ENGAGE
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
