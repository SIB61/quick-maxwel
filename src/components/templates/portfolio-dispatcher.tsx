import { PortfolioUser } from "@/lib/portfolio-data";
import SimpleProfessionalTemplate from "./simple-professional";
import FancyCreativeTemplate from "./fancy-creative";
import BentoGridTemplate from "./bento-grid";

export default function PortfolioDispatcher({ portfolio }: { portfolio: PortfolioUser }) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  switch (templateId) {
    case "fancy_creative":
      return <FancyCreativeTemplate portfolio={portfolio} />;
    case "bento_grid":
      return <BentoGridTemplate portfolio={portfolio} />;
    case "simple_professional":
    default:
      return <SimpleProfessionalTemplate portfolio={portfolio} />;
  }
}
