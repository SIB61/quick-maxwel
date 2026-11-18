import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalNavbar } from "./terminal-nav";
import { SwissNavbar } from "./swiss-nav";
import { AuroraNavbar } from "./aurora-nav";
import { BentoNavbar } from "./bento-nav";
import { FancyNavbar } from "./fancy-nav";
import { SimpleNavbar } from "./simple-nav";

export default function TemplateNavbar({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  switch (templateId) {
    case "developer_terminal":
      return <TerminalNavbar portfolio={portfolio} handle={handle} />;
    case "minimal_swiss":
      return <SwissNavbar portfolio={portfolio} handle={handle} />;
    case "aurora_studio":
      return <AuroraNavbar portfolio={portfolio} handle={handle} />;
    case "bento_grid":
      return <BentoNavbar portfolio={portfolio} handle={handle} />;
    case "fancy_creative":
      return <FancyNavbar portfolio={portfolio} handle={handle} />;
    case "simple_professional":
    default:
      return <SimpleNavbar portfolio={portfolio} handle={handle} />;
  }
}
