import { PortfolioUser } from "@/lib/portfolio-data";
import { parseHiddenSections } from "@/lib/sections";
import SimpleProfessionalTemplate from "./simple-professional";
import FancyCreativeTemplate from "./fancy-creative";
import BentoGridTemplate from "./bento-grid";
import DeveloperTerminalTemplate from "./developer-terminal";
import MinimalSwissTemplate from "./minimal-swiss";
import AuroraStudioTemplate from "./aurora-studio";

/**
 * Home page only: hidden sections get no data, so templates render nothing for them
 * (and nothing leaks into the page source). Sub-pages like /projects are unaffected.
 */
function withoutHiddenSections(portfolio: PortfolioUser): PortfolioUser {
  const hidden = parseHiddenSections(portfolio.settings?.hiddenSections);
  if (hidden.length === 0) return portfolio;
  return {
    ...portfolio,
    experiences: hidden.includes("experience") ? [] : portfolio.experiences,
    education: hidden.includes("education") ? [] : portfolio.education,
    projects: hidden.includes("projects") ? [] : portfolio.projects,
    articles: hidden.includes("articles") ? [] : portfolio.articles,
    services: hidden.includes("services") ? [] : portfolio.services,
    achievements: hidden.includes("achievements") ? [] : portfolio.achievements,
    events: hidden.includes("achievements") ? [] : portfolio.events,
  };
}

export default function PortfolioDispatcher({ portfolio: fullPortfolio }: { portfolio: PortfolioUser }) {
  const portfolio = withoutHiddenSections(fullPortfolio);
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
