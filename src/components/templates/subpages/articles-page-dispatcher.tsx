import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalArticlesList } from "../terminal/terminal-articles";
import { SwissArticlesList } from "../swiss/swiss-articles";
import { AuroraArticlesList } from "../aurora/aurora-articles";
import { BentoArticlesList } from "../bento/bento-articles";
import { FancyArticlesList } from "../fancy/fancy-articles";
import { SimpleArticlesList } from "../simple/simple-articles";

export default function ArticlesPageDispatcher({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalArticlesList portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissArticlesList portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraArticlesList portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoArticlesList portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyArticlesList portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "simple_professional") {
    return <SimpleArticlesList portfolio={portfolio} handle={handle} />;
  }

  return <SimpleArticlesList portfolio={portfolio} handle={handle} />;
}
