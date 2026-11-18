import { getPortfolioData } from "@/lib/portfolio-data";
import ServicesPageDispatcher from "@/components/templates/subpages/services-page-dispatcher";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return <ServicesPageDispatcher portfolio={portfolio} handle={handle} />;
}
