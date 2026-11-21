import { PortfolioUser } from "@/lib/portfolio-data";
import { TerminalProjectDetail } from "../terminal/terminal-project-detail";
import { SwissProjectDetail } from "../swiss/swiss-project-detail";
import { AuroraProjectDetail } from "../aurora/aurora-project-detail";
import { BentoProjectDetail } from "../bento/bento-project-detail";
import { FancyProjectDetail } from "../fancy/fancy-project-detail";
import { SimpleProjectDetail } from "../simple/simple-project-detail";

const PROJECT_DETAIL_PAGES = {
  developer_terminal: TerminalProjectDetail,
  minimal_swiss: SwissProjectDetail,
  aurora_studio: AuroraProjectDetail,
  bento_grid: BentoProjectDetail,
  fancy_creative: FancyProjectDetail,
  simple_professional: SimpleProjectDetail,
} as const;

export default function ProjectDetailPageDispatcher({
  portfolio,
  project,
  handle,
}: {
  portfolio: PortfolioUser;
  project: PortfolioUser["projects"][number];
  handle: string;
}) {
  const templateId = portfolio.settings?.templateId || "simple_professional";
  const Page = PROJECT_DETAIL_PAGES[templateId as keyof typeof PROJECT_DETAIL_PAGES] ?? SimpleProjectDetail;
  return <Page portfolio={portfolio} project={project} handle={handle} />;
}
