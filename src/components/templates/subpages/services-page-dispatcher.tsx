import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalServices } from "../terminal/terminal-services";
import { SwissServices } from "../swiss/swiss-services";
import { AuroraServices } from "../aurora/aurora-services";
import { BentoServices } from "../bento/bento-services";
import { FancyServices } from "../fancy/fancy-services";
import { SimpleServices } from "../simple/simple-services";

export default function ServicesPageDispatcher({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalServices portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissServices portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraServices portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoServices portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyServices portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "simple_professional") {
    return <SimpleServices portfolio={portfolio} handle={handle} />;
  }

  return <SimpleServices portfolio={portfolio} handle={handle} />;
}
