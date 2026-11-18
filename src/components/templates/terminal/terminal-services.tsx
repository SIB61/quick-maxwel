import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Terminal as TerminalIcon, Sparkles } from "lucide-react";

export function TerminalServices({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 font-mono text-xs sm:text-sm px-4 py-8">
      {/* Breadcrumb command */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={`/${handle}`} className="hover:text-zinc-100 flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>cd ..</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-200">cat services.json | jq .</span>
      </div>

      {/* Terminal Window Box */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        <div className="h-9 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-400 text-xs">sh: cat ~/services/catalog.json</span>
          </div>
          <span className="text-zinc-500 text-[11px]">{portfolio.services.length} services available</span>
        </div>

        <div className="p-4 sm:p-6 space-y-6">
          <div className="text-zinc-400 border-b border-zinc-800/80 pb-2 flex items-center gap-2">
            <span style={{ color: "var(--theme-accent)" }}>user@{handle}:~$</span>
            <span className="text-zinc-200">cat services.json | jq .[]</span>
          </div>

          <div className="space-y-4">
            {portfolio.services.map((service) => (
              <div
                key={service.id}
                className="p-5 rounded-lg border border-zinc-800/80 bg-zinc-900/30 space-y-3 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-zinc-500 text-[11px] font-bold">
                      SERVICE_ID: &quot;{service.slug}&quot;
                    </span>
                    <h2 className="text-zinc-100 font-bold text-base hover:text-emerald-400 transition-colors">
                      <Link href={`/${handle}/services/${service.slug}`}>
                        {service.title}
                      </Link>
                    </h2>
                  </div>

                  {service.price && (
                    <span
                      className="px-3 py-1 rounded text-xs font-bold border w-fit"
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

                <p className="text-zinc-400 text-xs leading-relaxed">
                  {service.shortDescription}
                </p>

                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="pt-1 space-y-1.5 border-t border-zinc-800/60">
                    <span className="text-zinc-500 text-[11px] font-bold uppercase tracking-wider">
                      // DELIVERABLES_MANIFEST
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {service.deliverables.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-zinc-300 text-xs">
                          <span style={{ color: "var(--theme-accent)" }}>+</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between text-xs">
                  <Link
                    href={`/${handle}/services/${service.slug}`}
                    className="text-zinc-400 hover:text-white flex items-center gap-1 group"
                  >
                    <span>./inspect-spec.sh --id={service.slug}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                  <Link
                    href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
                    className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-colors"
                  >
                    curl -X POST /book
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 text-zinc-500 text-[11px] flex items-center justify-between">
            <span>JSON schema validated: RFC 8259</span>
            <span className="text-emerald-400 font-bold">[200 OK]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
