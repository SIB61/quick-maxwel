import { getPortfolioData } from "@/lib/portfolio-data";
import AchievementsPageDispatcher from "@/components/templates/subpages/achievements-page-dispatcher";

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return <AchievementsPageDispatcher portfolio={portfolio} handle={handle} />;
}
