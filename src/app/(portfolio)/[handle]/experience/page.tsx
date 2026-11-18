import { getPortfolioData } from "@/lib/portfolio-data";
import ExperiencePageDispatcher from "@/components/templates/subpages/experience-page-dispatcher";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return <ExperiencePageDispatcher portfolio={portfolio} handle={handle} />;
}
