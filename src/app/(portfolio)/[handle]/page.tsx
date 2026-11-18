import { getPortfolioData } from "@/lib/portfolio-data";
import PortfolioDispatcher from "@/components/templates/portfolio-dispatcher";

export const dynamic = "force-dynamic";

export default async function PortfolioLandingPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return <PortfolioDispatcher portfolio={portfolio} />;
}
