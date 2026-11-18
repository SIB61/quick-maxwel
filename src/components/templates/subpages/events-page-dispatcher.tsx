import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalEvents } from "../terminal/terminal-events";
import { SwissEvents } from "../swiss/swiss-events";
import { AuroraEvents } from "../aurora/aurora-events";
import { BentoEvents } from "../bento/bento-events";
import { FancyEvents } from "../fancy/fancy-events";
import { SimpleEvents } from "../simple/simple-events";

export default function EventsPageDispatcher({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalEvents portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissEvents portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraEvents portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoEvents portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyEvents portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "simple_professional") {
    return <SimpleEvents portfolio={portfolio} handle={handle} />;
  }

  return <SimpleEvents portfolio={portfolio} handle={handle} />;
}
