import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalExperience } from "../terminal/terminal-experience";
import { SwissExperience } from "../swiss/swiss-experience";
import { AuroraExperience } from "../aurora/aurora-experience";
import { BentoExperience } from "../bento/bento-experience";
import { FancyExperience } from "../fancy/fancy-experience";
import { SimpleExperience } from "../simple/simple-experience";

export default function ExperiencePageDispatcher({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalExperience portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissExperience portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraExperience portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoExperience portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyExperience portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "simple_professional") {
    return <SimpleExperience portfolio={portfolio} handle={handle} />;
  }

  return <SimpleExperience portfolio={portfolio} handle={handle} />;
}
