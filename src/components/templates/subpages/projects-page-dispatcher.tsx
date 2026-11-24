import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalProjects } from "../terminal/terminal-projects";
import { SwissProjects } from "../swiss/swiss-projects";
import { AuroraProjects } from "../aurora/aurora-projects";
import { BentoProjects } from "../bento/bento-projects";
import { FancyProjects } from "../fancy/fancy-projects";
import { SimpleProjects } from "../simple/simple-projects";

const PROJECT_PAGES = {
  developer_terminal: TerminalProjects,
  minimal_swiss: SwissProjects,
  aurora_studio: AuroraProjects,
  bento_grid: BentoProjects,
  fancy_creative: FancyProjects,
  simple_professional: SimpleProjects,
} as const;

export default function ProjectsPageDispatcher({
  portfolio,
  handle,
}: {
  portfolio: PortfolioUser;
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";
  const Page = PROJECT_PAGES[templateId as keyof typeof PROJECT_PAGES] ?? SimpleProjects;
  return <Page portfolio={portfolio} handle={handle} />;
}
