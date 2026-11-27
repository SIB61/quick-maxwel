import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalEducation } from "../terminal/terminal-education";
import { SwissEducation } from "../swiss/swiss-education";
import { AuroraEducation } from "../aurora/aurora-education";
import { BentoEducation } from "../bento/bento-education";
import { FancyEducation } from "../fancy/fancy-education";
import { SimpleEducation } from "../simple/simple-education";

export default function EducationPageDispatcher({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";

  if (templateId === "developer_terminal") {
    return <TerminalEducation portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "minimal_swiss") {
    return <SwissEducation portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "aurora_studio") {
    return <AuroraEducation portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "bento_grid") {
    return <BentoEducation portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "fancy_creative") {
    return <FancyEducation portfolio={portfolio} handle={handle} />;
  }
  if (templateId === "simple_professional") {
    return <SimpleEducation portfolio={portfolio} handle={handle} />;
  }

  return <SimpleEducation portfolio={portfolio} handle={handle} />;
}
