import { getPortfolioData } from "@/lib/portfolio-data";
import EventDetailPageDispatcher from "@/components/templates/subpages/event-detail-dispatcher";
import { notFound } from "next/navigation";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ handle: string; slug: string }>;
}) {
  const { handle, slug } = await params;
  const portfolio = await getPortfolioData(handle);

  const event = portfolio.events.find((e) => e.slug === slug);
  if (!event) {
    notFound();
  }

  return <EventDetailPageDispatcher portfolio={portfolio} event={event} handle={handle} />;
}
