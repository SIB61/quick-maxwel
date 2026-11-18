import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalAchievements } from "../terminal/terminal-achievements";
import { SwissAchievements } from "../swiss/swiss-achievements";
import { AuroraAchievements } from "../aurora/aurora-achievements";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Award, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AchievementsPageDispatcher({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalAchievements portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissAchievements portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraAchievements portfolio={portfolio} handle={handle} />;
  }

  // Standard/Simple template fallback
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-8 w-full">
      <div className="space-y-2">
        <Link
          href={`/${handle}`}
          className="text-xs text-zinc-400 hover:text-zinc-100 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Overview</span>
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 flex items-center gap-2">
          <Award className="h-6 w-6" style={{ color: "var(--theme-accent)" }} />
          Achievements &amp; Honors
        </h1>
        <p className="text-sm text-zinc-400">
          Recognitions, industry awards, patents, and technical accomplishments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolio.achievements.map((item) => (
          <Card
            key={item.id}
            className="bg-zinc-900/50 border-zinc-800 p-5 space-y-3 hover:border-zinc-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                  {item.issuer}
                </Badge>
                <span className="text-zinc-500">{item.issueDate}</span>
              </div>
              <h2 className="font-bold text-base text-zinc-100">{item.title}</h2>
              {item.description && (
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>

            {item.credentialUrl && (
              <div className="pt-2">
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs flex items-center gap-1 font-medium hover:underline"
                  style={{ color: "var(--theme-accent)" }}
                >
                  <span>View Credential</span>
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
