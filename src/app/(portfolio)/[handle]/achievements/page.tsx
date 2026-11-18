import { getPortfolioData } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Award, ExternalLink } from "lucide-react";
import Link from "next/link";

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="space-y-2">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Overview</span>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-2">
          <Award className="h-6 w-6 text-amber-400" />
          Honors & Achievements
        </h1>
        <p className="text-sm text-zinc-400">
          Certifications, industry recognition, and open source accolades earned by {portfolio.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolio.achievements.map((ach) => (
          <Card key={ach.id} className="bg-zinc-900/50 border-zinc-800 p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h2 className="font-bold text-base text-zinc-100">{ach.title}</h2>
                <div className="text-xs text-amber-400 font-medium">{ach.issuer}</div>
              </div>
              {ach.issueDate && (
                <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs shrink-0">
                  {ach.issueDate}
                </Badge>
              )}
            </div>

            {ach.description && (
              <p className="text-xs text-zinc-300 leading-relaxed">
                {ach.description}
              </p>
            )}

            {ach.credentialUrl && (
              <div className="pt-2">
                <a
                  href={ach.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Verify Credential</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
