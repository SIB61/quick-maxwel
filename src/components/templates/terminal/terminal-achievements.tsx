import { PortfolioUser } from "@/lib/portfolio-data";
import Link from "next/link";
import { ArrowLeft, Award, CheckCircle2, ExternalLink } from "lucide-react";

export function TerminalAchievements({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-mono text-xs sm:text-sm">
      {/* Breadcrumb command */}
      <div className="flex items-center gap-2 text-zinc-400">
        <Link href={`/${handle}`} className="hover:text-zinc-100 flex items-center gap-1">
          <ArrowLeft className="h-3 w-3" />
          <span>cd ..</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-200">./list-credentials.sh</span>
      </div>

      {/* Terminal Window Box */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
        <div className="h-9 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-zinc-400 text-xs">sh: ./verify-credentials --all</span>
          </div>
          <span className="text-zinc-500 text-[11px]">{portfolio.achievements.length} records verified</span>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          <div className="text-zinc-400 border-b border-zinc-800/80 pb-2 flex items-center gap-2">
            <span style={{ color: "var(--theme-accent)" }}>user@{handle}:~$</span>
            <span className="text-zinc-200">./list-credentials.sh --signature-check</span>
          </div>

          <div className="space-y-3">
            {portfolio.achievements.map((item, idx) => {
              const checksum = "sha256:" + (item.id.replace(/-/g, "") + "903a4b").slice(0, 16);

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border border-zinc-800/80 bg-zinc-900/40 space-y-2 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        [VERIFIED 200 OK]
                      </span>
                      <h2 className="font-bold text-zinc-100 text-sm">{item.title}</h2>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span>{item.issueDate}</span>
                      {item.credentialUrl && (
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          <span>inspect</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-zinc-400 flex items-center gap-2 flex-wrap">
                    <span className="text-zinc-300 font-medium">Issuer: {item.issuer}</span>
                    <span>•</span>
                    <span className="text-zinc-500 text-[11px]">{checksum}</span>
                  </div>

                  {item.description && (
                    <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 text-zinc-500 text-[11px] flex items-center justify-between">
            <span>Integrity test: ALL CHECKS PASSED</span>
            <span className="text-emerald-400 font-bold">[EXIT 0]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
