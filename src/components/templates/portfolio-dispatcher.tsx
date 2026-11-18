import { PortfolioUser } from "@/lib/portfolio-data";
import SimpleProfessionalTemplate from "./simple-professional";
import FancyCreativeTemplate from "./fancy-creative";
import BentoGridTemplate from "./bento-grid";
import DeveloperTerminalTemplate from "./developer-terminal";
import MinimalSwissTemplate from "./minimal-swiss";
import AuroraStudioTemplate from "./aurora-studio";

export default function PortfolioDispatcher({ portfolio }: { portfolio: PortfolioUser }) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  switch (templateId) {
    case "fancy_creative":
      return <FancyCreativeTemplate portfolio={portfolio} />;
    case "bento_grid":
      return <BentoGridTemplate portfolio={portfolio} />;
    case "developer_terminal":
      return <DeveloperTerminalTemplate portfolio={portfolio} />;
    case "minimal_swiss":
      return <MinimalSwissTemplate portfolio={portfolio} />;
    case "aurora_studio":
      return <AuroraStudioTemplate portfolio={portfolio} />;
    case "simple_professional":
    default:
      return <SimpleProfessionalTemplate portfolio={portfolio} />;
  }
}
