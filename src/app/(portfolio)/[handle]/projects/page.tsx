import { getPortfolioData } from "@/lib/portfolio-data";
import ProjectsPageDispatcher from "@/components/templates/subpages/projects-page-dispatcher";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return <ProjectsPageDispatcher portfolio={portfolio} handle={handle} />;
}
