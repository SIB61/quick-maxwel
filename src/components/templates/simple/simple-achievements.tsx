import { PortfolioUser } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Award, ExternalLink } from "lucide-react";
import Link from "next/link";

export function SimpleAchievements({ portfolio, handle }: { portfolio: PortfolioUser; handle: string }) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 font-sans text-zinc-100">
      {/* Header */}
      <div className="space-y-3 border-b border-zinc-800 pb-8">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 inline-flex items-center gap-1.5 transition-colors font-medium"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Resume Overview</span>
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <Award className="h-7 w-7" style={{ color: "var(--theme-accent)" }} />
          <span>Honors, Awards &amp; Certifications</span>
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
          Verified industry accolades, technical patents, peer recognitions, and professional credentials awarded to {portfolio.name}.
        </p>
      </div>

      {/* Two-Column Structured Accolades Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {portfolio.achievements.map((item) => (
          <Card
            key={item.id}
            className="bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all p-6 flex flex-col justify-between space-y-4 shadow-md rounded-2xl"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs gap-2">
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 font-medium text-[11px]">
                  {item.issuer}
                </Badge>
                <span className="font-mono text-zinc-500 text-xs">{item.issueDate}</span>
              </div>

              <h2 className="font-bold text-lg text-white leading-snug">
                {item.title}
              </h2>

              {item.description && (
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            {item.credentialUrl && (
              <div className="pt-3 border-t border-zinc-800/60">
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold flex items-center gap-1.5 hover:underline"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <span>Verify Credential Certificate</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
