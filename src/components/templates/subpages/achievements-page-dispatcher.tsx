import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalAchievements } from "../terminal/terminal-achievements";
import { SwissAchievements } from "../swiss/swiss-achievements";
import { AuroraAchievements } from "../aurora/aurora-achievements";
import { BentoAchievements } from "../bento/bento-achievements";
import { FancyAchievements } from "../fancy/fancy-achievements";
import { SimpleAchievements } from "../simple/simple-achievements";

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
  if (templateId === "bento_grid") {
    return <BentoAchievements portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyAchievements portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "simple_professional") {
    return <SimpleAchievements portfolio={portfolio} handle={handle} />;
  }

  return <SimpleAchievements portfolio={portfolio} handle={handle} />;
}
