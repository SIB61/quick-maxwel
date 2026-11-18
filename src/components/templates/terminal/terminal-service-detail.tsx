import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Sparkles, Terminal as TerminalIcon } from "lucide-react";

export function TerminalServiceDetail({
  portfolio,
  service,
  handle,
}: {
  portfolio: PortfolioUser;
  service: NonNullable<PortfolioUser["services"][number]>;
  handle: string;
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 font-mono text-xs sm:text-sm px-4 py-8">
      {/* Return to service list */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={`/${handle}/services`} className="hover:text-zinc-100 flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>cd .. (back to catalog)</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-200">./specs/{service.slug}.json</span>
      </div>

      {/* Terminal Window Box */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        <div className="h-9 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-400 text-xs">sh: cat ~/services/{service.slug}.json</span>
          </div>
          <span className="text-zinc-500 text-[11px]">SPECIFICATION</span>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
            <div className="space-y-1">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                // SERVICE_PACKAGE
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 tracking-tight">
                {service.title}
              </h1>
            </div>

            {service.price && (
              <div
                className="px-4 py-2 rounded-xl text-sm font-bold border w-fit"
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

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                /* EXECUTIVE_SUMMARY */
              </span>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                {service.fullDescription || service.shortDescription}
              </p>
            </div>

            {service.deliverables && service.deliverables.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">
                  /* DELIVERABLES_CHECKLIST */
                </span>
                <div className="space-y-2">
                  {service.deliverables.map((item, idx) => (
                    <div key={item} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60">
                      <span className="text-emerald-400 font-bold shrink-0">[{idx + 1}]</span>
                      <span className="text-zinc-200 text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTA */}
          <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-500">
              Execute inquiry protocol to book this engagement.
            </div>

            <Link
              href={`/${handle}/contact?subject=${encodeURIComponent(`Inquiry: ${service.title}`)}`}
              className="px-6 py-3 rounded-xl font-bold text-black transition-all hover:opacity-90 flex items-center gap-2"
              style={{ backgroundColor: "var(--theme-accent)" }}
            >
              <TerminalIcon className="h-4 w-4" />
              <span>./book-session.sh --tier={service.slug}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
