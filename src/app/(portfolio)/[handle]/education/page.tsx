import type { Metadata } from "next";
import { portfolioMeta } from "@/lib/seo";
import { getPortfolioData } from "@/lib/portfolio-data";
import EducationPageDispatcher from "@/components/templates/subpages/education-page-dispatcher";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const p = await getPortfolioData(handle);
  const items = p.education
    .slice(0, 3)
    .map((e) => `${e.degree}${e.fieldOfStudy ? ` in ${e.fieldOfStudy}` : ""} at ${e.institution}`)
    .join(", ");
  return portfolioMeta(p, {
    title: "Education",
    path: "/education",
    description: items ? `${p.name}'s education: ${items}.` : `${p.name}'s education and qualifications.`,
  });
}

export default async function EducationPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const portfolio = await getPortfolioData(handle);

  return <EducationPageDispatcher portfolio={portfolio} handle={handle} />;
}
