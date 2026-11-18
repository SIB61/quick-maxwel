import { getPortfolioData } from "@/lib/portfolio-data";
import EventsPageDispatcher from "@/components/templates/subpages/events-page-dispatcher";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return <EventsPageDispatcher portfolio={portfolio} handle={handle} />;
}
