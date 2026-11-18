import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalFooter } from "./terminal-nav";
import { SwissFooter } from "./swiss-nav";
import { AuroraFooter } from "./aurora-nav";
import { BentoFooter } from "./bento-nav";
import { FancyFooter } from "./fancy-nav";
import { SimpleFooter } from "./simple-nav";

export default function TemplateFooter({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  switch (templateId) {
    case "developer_terminal":
      return <TerminalFooter portfolio={portfolio} handle={handle} />;
    case "minimal_swiss":
      return <SwissFooter portfolio={portfolio} handle={handle} />;
    case "aurora_studio":
      return <AuroraFooter portfolio={portfolio} handle={handle} />;
    case "bento_grid":
      return <BentoFooter portfolio={portfolio} handle={handle} />;
    case "fancy_creative":
      return <FancyFooter portfolio={portfolio} handle={handle} />;
    case "simple_professional":
    default:
      return <SimpleFooter portfolio={portfolio} handle={handle} />;
  }
}
