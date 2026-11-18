import { getPortfolioData } from "@/lib/portfolio-data";
import ServiceDetailPageDispatcher from "@/components/templates/subpages/service-detail-dispatcher";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ handle: string; slug: string }>;
}) {
  const { handle, slug } = await params;
  const portfolio = await getPortfolioData(handle);

  const service = portfolio.services.find((s) => s.slug === slug);
  if (!service) {
    notFound();
  }

  return <ServiceDetailPageDispatcher portfolio={portfolio} service={service} handle={handle} />;
}
