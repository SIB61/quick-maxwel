import { getPortfolioData } from "@/lib/portfolio-data";
import ProjectDetailPageDispatcher from "@/components/templates/subpages/project-detail-dispatcher";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ handle: string; slug: string }>;
}) {
  const { handle, slug } = await params;
  const portfolio = await getPortfolioData(handle);

  const project = portfolio.projects.find((p) => p.slug === slug);
  if (!project) {
    notFound();
  }

  return <ProjectDetailPageDispatcher portfolio={portfolio} project={project} handle={handle} />;
}
